import {Link, NavLink} from 'react-router-dom'

import './appHeader.scss'

function AppHeader() {
	return (
		<div className="app-header">
			<h1 className="app-header__title">
				<Link to="/">
					<span>Marvel</span> information portal
				</Link>
			</h1>
			<ul className="app-header__menu">
				<li className="app-header__menu-item">
					<NavLink
						end to="/"
						className={({isActive}) => "app-header__menu-link" + (isActive ? ' app-header__menu-link_active' : '')}>Characters</NavLink>
				</li>
				<li className="app-header__menu-item">
					<NavLink 
						to="/comics" 
						className={({isActive}) => "app-header__menu-link" + (isActive ? ' app-header__menu-link_active' : '')}>Comics</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default AppHeader;