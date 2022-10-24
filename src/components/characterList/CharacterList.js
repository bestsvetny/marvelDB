import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'

import './characterCard.scss'
import './characterList.scss'

const CharacterList = (props) => {
    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(190)
    const [isCharEnded, setIsCharEnded] = useState(false) 

    const {getAllCharacters, loading, error} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded) //Выполняется когда компонент отрисован
    }


    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) ended = true;

        setCharList(charList => [...charList, ...newCharList])
        setOffset(offset => offset + 9)
        setNewItemLoading(false)
        setIsCharEnded(ended)
    }
    
    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('character-card_active'))
        itemRefs.current[id].classList.add('character-card_active')
        itemRefs.current[id].focus()
    }

    function renderCards(arr) {
        return (
            (arr.map((item, i) => {
                const {id, name, thumb, isImgFound} = item;
                const imgStyle = isImgFound ? {'objectFit' : 'cover'} : {'objectFit' : 'fill'};

                    return (
                        <li className="character-card"
                            tabIndex='0'
                            ref={element => itemRefs.current[i] = element}
                            key={id}
                            onClick={() => {
                                props.onCharSelected(id)
                                focusOnItem(i)
                            }}
                            onKeyDown={(event) => {if (event.key === 'Enter') {
                                props.onCharSelected(id)
                                focusOnItem(i)
                                }}}>
                            <img src={thumb} alt="Character" className="character-card__image" style={imgStyle}/>
                            <p className="character-card__name">{name.length > 28 ? `${name.slice(0, name.indexOf(' ', 27))}...` : name}</p>
                        </li>
                    )

            }))
        )
    }

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = renderCards(charList);

    return (
        <div className="character-list">
            {spinner}
            {errorMessage}
            <ul className="character-list__grid">
            {content}
            </ul>
            <button 
                className="character-list__load-more-btn button button_main button_long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={isCharEnded ? {'display' : 'none'} : {'display' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharacterList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharacterList;