import Modal from './modal'
import MovieCreateForm from './movieCreateForm'
import { createMovie } from '../actions/index'
import { useRouter } from 'next/router'

const SideMenu = (props) => {
    const { categories } = props
    let modal = null
    const router = useRouter()

    const handleCreateMovie = (movie) => {
        createMovie(movie).then((movies) => {
            console.log(JSON.stringify(movies))
            modal.closeModal()
            router.push('/')
        })
    }

    return (
        <div>
            <h1 className="my-4">Movie App</h1>
            <div className="list-group">
                {
                    categories.map(c =>
                        <a
                            onClick={() => props.changeCategory(c.name)}
                            key={c.id}
                            href="#"
                            className={`list-group-item ${props.activeCategory === c.name ? 'active' : ''}`}>{c.name}
                        </a>)
                }
            </div>
            <div className="mt-3">
                <Modal ref={element => modal = element} hasSubmit={false}>
                    <MovieCreateForm handleFormSubmit={handleCreateMovie} />
                </Modal>
            </div>
        </div>

    )
}

export default SideMenu