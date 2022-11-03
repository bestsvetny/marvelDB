import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";
import SingleComic from '../pages/singleComic/SingleComic'
import SingleChar from './singleChar/SingleChar';

const SinglePage = ({dataType}) => {
        const {itemId} = useParams();
        const [data, setData] = useState(null);
        const {process, setProcess, getComic, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [itemId])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComic(itemId).then(onDataLoaded)
                        .then(() => setProcess('confirmed'))
                    break;
                case 'char':
                    getCharacter(itemId).then(onDataLoaded)
                        .then(() => setProcess('confirmed'))
                    break
                default: 
                    break
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        let content

        switch (dataType) {
            case 'comic':
                content = setContent(process, SingleComic, data);
                break;
            case 'char':
                content = setContent(process, SingleChar, data);
                break
            default: 
                break
        }
    
        return (
            <>
                <AppBanner/>
                <div style={{marginTop: '50px'}}>
                    {content}
                </div>
            </>
        )
}

export default SinglePage;