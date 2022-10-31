import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/setContent'

import '../../style/buttons.scss'
import './randomChar.scss'

const RandomChar = () => {

    const [char, setChar] = useState({})//1!

    const {process, setProcess, clearError, getCharacter} = useMarvelService(); //Создаем эксезмпляр сервисного компонента

    useEffect(() => {
        updateCharacter()
    },[])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateCharacter = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //генерируем рандомный id персонажа
        getCharacter(id) //Запрашиваем персонажа
            .then(onCharLoaded) //Получаем промис с персонажем и меняем стейт
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="random-char">
            <div className="random-char__char-block">
            {setContent(process, View, char)}
            </div>
            <div className="random-char__generate">
                <p className='random-char__generate-text'>Random character for today! <br/>Do you want to get to know him better?</p>
                <p className='random-char__generate-text'>Or choose another one</p>
                <button className="button button_main"
                        onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
            </div>
        </div>
    )
}

function View({data}) {
    const {name, thumb, desc, homepage, wiki, isImgFound} = data;

    const imgStyle = isImgFound ? {'objectFit' : 'cover'} : {'objectFit' : 'fill'};


    return (
        <>
            <img src={thumb} alt="Character thumbnale" className="random-char__thumb" style={imgStyle} />
            <div className="random-char__info">
                <p className="random-char__name">{name}</p>
                <p className="random-char__desc">{desc}</p>
                <div className="random-char__links">
                    <a href={homepage} className="button button_main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button_grey">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default RandomChar;