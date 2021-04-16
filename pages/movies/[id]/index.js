import Link from "next/link"
import { useRouter } from "next/router"
import { getMovieById, deleteMovie } from "../../../actions"

const MovieDetail = (props) => {
    const router = useRouter()
    const { id } = router.query
    const { movie } = props

    const handleDeleteMovie = (id) => {
        deleteMovie(id).then(() => {
            router.push('/')
        })
    }


    return (
        <div className="container">
            <div className="jumbotron mt-5 pb-3">
                <h1 className="display-4">{movie.name}</h1>

                <hr className="my-4" />
                <p>{movie.description}</p>
                <p>genre:<b> {movie.genre}</b></p>
                <p className="text-muted"> Rating: {movie.rating}</p>

                <button onClick={() => handleDeleteMovie(movie.id)} className="btn btn-danger btn-lg mt-3 mb-0" role="button">Delete</button>
                <Link href="/movies/[id]/edit-movie" as={`/movies/${id}/edit-movie`}>
                    <button className="ml-2 btn btn-info btn-lg mt-3 mb-0" role="button">Edit</button>
                </Link>
            </div>

            <div className="row">
                <h3>Full Description</h3>
                <p className="text-justify">{movie.longDesc}</p>
            </div>

        </div>
    )
}

MovieDetail.getInitialProps = async ({ query }) => {
    const { id } = query
    const movie = await getMovieById(id)
    return { movie }
}

export default MovieDetail