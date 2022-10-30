import './appBanner.scss'

import avengers from '../../resources/img/avengers.png'
import avengersLogo from '../../resources/img/avengers-logo.png'

function AppBanner() {
    return (
        <div className="banner">
            <div className="banner__block">
                <img src={avengers} alt="Avengers" className="banner__pic" />
                <p className="banner__title">
                New comics every week!<br/>Stay tuned!
                </p>
            </div>
            <img src={avengersLogo} alt="avengersLogo" className="banner__logo" />
        </div>
    )
}

export default AppBanner;