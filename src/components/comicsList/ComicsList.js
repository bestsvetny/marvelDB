import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comicsList.scss'
import '../../style/buttons.scss'

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(200)
    const [isComicsEnded, setIsComicsEnded] = useState(false)

    const {loading, error, getAllComics} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false
        if (newComicsList.length < 8) ended = true

        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setOffset(offset => offset + 8)
        setNewItemLoading(false)
        setIsComicsEnded(ended)
    }

    function renderCards(comicsList) {
        return (
            (comicsList.map((item, i) => {
                const {title, price, thumb} = item

                return (
                    <li 
                    className="comics-list__item"
                    key={i} 
                    tabIndex='0'>
                        <Link to={`/comics/${item.id}`} className='comics-list__link'>
                            <img src={thumb} alt="X-men" className="comics-list__image" />
                            <p className="comics-list__title">{title}</p>
                            <p className="comics-list__price">{price}</p>
                        </Link>
                    </li>
                )
            }))
        )
    }

    const spinner = loading && !newItemLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = renderCards(comicsList)

    return (
        <div className="comics-list">
                {spinner}
                {errorMessage}
            <ul className="comics-list__grid">
                {content}
            </ul>
            <button 
                className="comics-list__load-more-btn button button_main button_long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={isComicsEnded ? {'display' : 'none'} : {'display' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;