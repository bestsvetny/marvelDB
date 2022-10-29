import './searchForm.scss'
import '../../style/buttons.scss'

function SearchForm() {
    return (
        <div className='search-form'>
            <p className="search-form__title">Or find a character by name</p>
            <input placeholder='Enter name' type="text"></input>
            <button  className="button button_main">
                <div className="inner">find</div>
            </button>
        </div>
    )
}

export default SearchForm;