import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import SingleComic from '../pages/singleComic/SingleComic'
import SingleChar from './singleChar/SingleChar';

const SinglePage = ({dataType}) => {
        const {itemId} = useParams();
        const [data, setData] = useState(null);
        const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [itemId])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComic(itemId).then(onDataLoaded);
                    break;
                case 'char':
                    getCharacter(itemId).then(onDataLoaded);
                    break
                default: 
                    break
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        let content

        switch (dataType) {
            case 'comic':
                content = !(loading || error || !data) ? <SingleComic data={data}/> : null;
                break;
            case 'char':
                content = !(loading || error || !data) ? <SingleChar data={data}/> : null;
                break
            default: 
                break
        }
    
        return (
            <>
                <AppBanner/>
                <div style={{marginTop: '50px'}}>
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            </>
        )
}

export default SinglePage;