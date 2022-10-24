import { lazy } from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useMarvelService from '../../../services/MarvelService'

import Spinner from '../../spinner/Spinner'
import './singleComicPage.scss'

const Page404 = lazy(() => import('../404'))

const SingleComicPage = () => {
    const [comic, setComic] = useState(null)
    const {loading, error, clearError, getComic} = useMarvelService()

    const {comicId} = useParams()

    useEffect(() => {
        updateComic()
    }, [])

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError()

        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const errorMessage = error ? <Page404/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
        <div className="comic">
            {errorMessage}
            {spinner}
            {content}

        </div>
        </>
    )
}

const View = ({comic}) => {
    const {title, thumb, desc, pageCount, lang, price, isImgFound} = comic
    const imgStyle = isImgFound ? {'objectFit' : 'cover'} : {'objectFit' : 'fill'};

    return (
        <>
            <img 
            src={thumb} 
            alt="Comic cover" 
            className="comic__cover"
            style={imgStyle} />
            <div className="comic__info">
                <p className="comic__title">{title}</p>
                <p className="comic__desc">{desc}</p>
                <p className="comic__pages">{pageCount} pages</p>
                <p className="comic__lang">Language: {lang}</p>
                <p className="comic__price">{price}</p>
            </div>
            <Link to="/comics" className="comic__back-btn">Back to all</Link>
        </>
    )
}

export default SingleComicPage;