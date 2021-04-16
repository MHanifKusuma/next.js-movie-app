
import Router from 'next/router'
import React from 'react'
import { getMovieById, updateMovie } from '../../../actions'
import MovieCreateForm from '../../../components/movieCreateForm'

class EditMovie extends React.Component {

    static async getInitialProps({ query }) {
        const movie = await getMovieById(query.id)
        return { movie }
    }

    handleUpdateMovie = (movie) => {
        updateMovie(movie).then(() => {
            Router.push('/movies/[id]', `/movies/${movie.id}`)
        })
    }

    render() {
        const { movie } = this.props
        return (
            <div className="container">
                <h1 className="text-center my-5">Edit Movie</h1>
                <MovieCreateForm
                    initialData={movie}
                    handleFormSubmit={this.handleUpdateMovie} />
            </div>
        )
    }
}

export default EditMovie