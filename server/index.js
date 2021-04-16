const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const filePath = './data.json'
const fs = require('fs')
const path = require('path')
const moviesData = require(filePath)

app.prepare().then(() => {

    const server = express();
    server.use(bodyParser.json())

    server.get('/api/v1/movies', (req, res) => {
        return res.json(moviesData)
    })

    server.get('/api/v1/movies/:movie_id', (req, res) => {
        const { movie_id } = req.params

        const movie = moviesData.find((movie) => {
            return movie.id === movie_id
        })

        return res.json(movie)
    })

    server.post('/api/v1/movies', (req, res) => {
        const movie = req.body
        console.log(req.body)

        moviesData.push(movie)
        console.log(moviesData)

        const pathToFile = path.join(__dirname, filePath)
        const stringifyData = JSON.stringify(moviesData, null, 2)

        fs.writeFile(pathToFile, stringifyData, (err) => {
            if (err) {
                return res.status(422).send(err)
            }

            return res.json('Move Added Successfully')
        })
    })

    server.patch('/api/v1/movies/:movie_id', (req, res) => {
        const { movie_id } = req.params
        const movie = req.body

        const movieIndex = moviesData.findIndex((movie) => {
            return movie.id === movie_id
        })
        moviesData[movieIndex] = movie

        const pathToFile = path.join(__dirname, filePath)
        const stringifyData = JSON.stringify(moviesData, null, 2)

        fs.writeFile(pathToFile, stringifyData, (err) => {
            if (err) {
                return res.status(422).send(err)
            }

            return res.json(movie)
        })
    })

    server.delete('/api/v1/movies/:movie_id', (req, res) => {
        const { movie_id } = req.params

        const movieIndex = moviesData.findIndex((movie) => {
            return movie.id === movie_id
        })
        moviesData.splice(movieIndex, 1)

        const pathToFile = path.join(__dirname, filePath)
        const stringifyData = JSON.stringify(moviesData, null, 2)

        fs.writeFile(pathToFile, stringifyData, (err) => {
            if (err) {
                return res.status(422).send(err)
            }

            return res.json('Move Deleted Successfully')
        })
    })

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, (err) => {
        if (err) throw err
        console.log('> Ready on port ' + PORT)
    })
})