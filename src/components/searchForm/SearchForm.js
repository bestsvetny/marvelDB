import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Formik,
    Form,
    Field,
    ErrorMessage
} from 'formik';

import * as Yup from 'yup'

import useMarvelService from '../../services/MarvelService';

import './searchForm.scss'
import '../../style/buttons.scss'

function SearchForm() {
    const [char, setChar] = useState({})
    
    const {loading, getCharacterByName, clearError} = useMarvelService()

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded);
    }

    const success = char.length > 0 ? <Success char={char[0]}/> : null
    const failure = char.length < 1 ? <Failure/> : null

    return (
        <div className="search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={values => updateChar(values.charName)}
            >
                <Form>
                    <p className="search-form__title">Or find a character by name</p>
                    <div className="search-form__wrap">
                        <Field 
                            id="charName"
                            name="charName"
                            type="text"
                            placeholder='Enter name'
                        ></Field>
                        <button 
                            className="button button_main" 
                            type="submit"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <ErrorMessage className="error" name="charName" component="div" />
                </Form>
            </Formik>
                {success}
                {failure}
        </div>
    )
}

function Success({char}) {
    const {name, id} = char
    return (
        <div className="search-form__wrap">
            <p className="search-form__success">There is! Visit {name} page?</p>
            <Link
                to={`/character/${id}`}
                className="button button_grey">
                <div className="inner">to page</div>
            </Link>
        </div>
    )
}

function Failure() {
    return (
        <div className="search-form__wrap">
            <p className="search-form__danger">The character was not found. Check the name and try again</p>
        </div>
    )
}

export default SearchForm;