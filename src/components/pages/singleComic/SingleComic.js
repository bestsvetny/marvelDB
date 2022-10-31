import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './singleComic.scss'

const SingleComic = ({data}) => {
    const {title, thumb, desc, pageCount, lang, price, isImgFound} = data
    const imgStyle = isImgFound ? {'objectFit' : 'cover'} : {'objectFit' : 'fill'};

    return (
    <>  
        <Helmet>
            <meta
                name="description"
                content={`${title} comics book`}/>
            <title>{title}</title>
        </Helmet>
        <div className="comic">
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
        </div>
    </>
    )
}

export default SingleComic;