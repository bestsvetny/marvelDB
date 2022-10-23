import './comic.scss'

import cover from '../../resources/img/x-men-cover.png'

function Comic() {
    return (
        <div className="comic">
            <img src={cover} alt="Comic cover" className="comic__cover" />
            <div className="comic__info">
                <p className="comic__title">X-Men: Days of Future Past</p>
                <p className="comic__desc">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <p className="comic__pages">144 pages</p>
                <p className="comic__lang">Language: en-us</p>
                <p className="comic__price">9.99$</p>
            </div>
            <a href="#!" className="comic__back-btn">Back to all</a>
        </div>
    )
}

export default Comic;