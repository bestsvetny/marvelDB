import { useState } from 'react'

import RandomChar from '../randomChar/RandomChar'
import CharacterList from '../characterList/CharacterList'
import CharacterInfo from '../characterInfo/CharacterInfo'
import SearchForm from '../searchForm/SearchForm'
import ErrorBoundary from '../errorBoundary/ErrorBounadary'

import backgroundImage from '../../resources/img/bg-asset.png'

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

	const onCharSelected = (id) => {
		setChar(id)
	}

    return (
        <>
            <RandomChar />
            <div className="wrapper">
                <CharacterList onCharSelected={onCharSelected}/>
            <aside className="aside">
                <ErrorBoundary>
                    <CharacterInfo charId={selectedChar}/>
                </ErrorBoundary>
                    <SearchForm/>
            </aside>
                <img src={backgroundImage} alt="marvel" className="app__bg"/>
            </div>
        </>
    )
}

export default MainPage