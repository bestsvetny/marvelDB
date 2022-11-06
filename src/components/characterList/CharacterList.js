import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './characterCard.scss'
import './characterList.scss'

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state')
    }
}


const CharacterList = (props) => {
    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(190)
    const [isCharEnded, setIsCharEnded] = useState(false) 

    const {getAllCharacters, process, setProcess} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
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
        const items = arr.map((item, i) => {
            const {id, name, thumb, isImgFound} = item;
            const imgStyle = isImgFound ? {'objectFit' : 'cover'} : {'objectFit' : 'fill'};
                return (
                    <li className="character-card"
                        tabIndex='0'
                        ref={element => itemRefs.current[i] = element}
                        onClick={() => {
                            props.onCharSelected(id)
                            focusOnItem(i)
                        }}
                        onKeyDown={(event) => {if (event.key === 'Enter') {
                            props.onCharSelected(id)
                            focusOnItem(i)
                            }}}>
                        <img src={thumb} alt={name} className="character-card__image" style={imgStyle}/>
                        <p className="character-card__name">{name.length > 28 ? `${name.slice(0, name.indexOf(' ', 27))}...` : name}</p>
                    </li>
                )

        })
        return (
            <ul className="character-list__grid">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderCards(charList), newItemLoading)
        //eslint-disable-next-line
    }, [process])

    return (
        <div className="character-list">
            {elements}
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