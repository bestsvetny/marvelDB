import { useState } from 'react'

import RandomChar from '../randomChar/RandomChar'
import CharacterList from '../characterList/CharacterList'
import CharacterInfo from '../characterInfo/CharacterInfo'
import ErrorBoundary from '../errorBoundary/ErrorBounadary'

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
                <ErrorBoundary>
                    <CharacterInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default MainPage