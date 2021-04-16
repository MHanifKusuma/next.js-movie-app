import React, { useState, useEffect } from 'react'
import SideMenu from '../components/side-menu'
import Carrousel from '../components/carrousel'
import MovieList from '../components/movie-list'
import { getCategories, getMovies } from '../actions/index'


class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      filter: 'all'
    }
  }

  static async getInitialProps() {
    const movies = await getMovies()
    const images = movies.map((movie) => {
      return {
        id: `image-${movie.id}`,
        url: movie.cover,
        title: movie.name
      }
    })

    const categories = await getCategories()
    return {
      movies, images, categories
    }
  }

  changeCategory = (category) => {
    this.setState({ filter: category })
  }

  filterMovies = (movies) => {

    const { filter } = this.state
    console.log(`filtering ${filter}`)

    if (filter === 'all') {
      return movies
    }

    // return movies.filter((movie) => {
    //   return movie.genre && movie.genre.includes(filter)
    // })
    console.log(movies[1].genre)
    let filteredMovie = movies.filter((movie) => { return movie.genre.includes(filter) && movie.genre })
    console.log(filteredMovie)

    return filteredMovie
  }


  render() {
    const { movies, images, categories } = this.props
    const { filter } = this.state
    // console.log(JSON.stringify(images))

    return (
      <div className="">
        {/* <div className="home-page"> */}

        <div className="row">
          <div className="col-lg-3">
            <SideMenu
              categories={categories}
              changeCategory={this.changeCategory}
              activeCategory={filter} />
          </div>

          <div className="col-lg-9">
            <Carrousel images={images} />

            <div className="row">

              <h2> {`${filter} Movies`} </h2>
              {/* {errorMessage &&
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                } */}
              <MovieList movies={this.filterMovies(movies) || []} />
            </div>
          </div>
        </div>
        {/* </div> */}


        {/* <style jsx>{`
        .home-page {
          padding-top: 100px;
        }
        `}</style> */}
      </div>
    )
  }

}

export default Home
