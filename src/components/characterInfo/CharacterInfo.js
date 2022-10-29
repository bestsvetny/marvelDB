import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/skeleton'

import '../../style/buttons.scss'
import './characterInfo.scss'

const CharacterInfo = (props) => {
    
    const [char, setChar] = useState(null)

    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar()
    },[])

    useEffect(( ) => {
        updateChar()
    },[props.charId])

    const updateChar = () => {
        clearError()

        const {charId} = props;
        if (!charId) {
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }
    
    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="character-info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}

        </div>
    )
       
}

const View = ({char}) => {
    const {name, thumb, desc, homepage, wiki, comics, isImgFound} = char
    const imgStyle = isImgFound ? {'objectFit' : 'cover'} : {'objectFit' : 'fill'};
    return (
        <>
            <div className="character-info__header">
                    <img src={thumb} alt={name} className="character-info__image" style={imgStyle}/>
                    <div className="character-info__block">
                        <p className="character-info__name">
                            {name.length > 28 ? `${name.slice(0, name.indexOf(' ', 27))}...` : name}
                        </p>
                        <div className="character-info__buttons">
                            <a href={homepage} className="button button_main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button_grey">
                                <div className="inner">wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    
                <p className="character-info__desc">
                    {desc}
                </p>
    
                <div className="character-info__comics">
                    <h3 className="character-info__comics-title">
                        Comics:
                    </h3>
                    <ul className="character-info__comics-list">
                        {comics.length > 0 ? null : <p>No comics for this character</p>}
                        {
                            comics.map((item, i) => {
                                if (i < 10) {
                                    return (
                                        <Link key={i} to={`/comics/${item.comicId}`} className='character-info__comics-link'>
                                            <li  className="character-info__comics-list-item">{item.name}</li>
                                        </Link>
                                    )
                                }
                                else return null
                            })
                        }
                    </ul>
                </div>
        </>
    )
}

CharacterInfo.propTypes = {
    charId: PropTypes.number
}

export default CharacterInfo;