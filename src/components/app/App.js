import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Spinner from '../spinner/Spinner'

import AppHeader from '../appHeader/AppHeader'

const SinglePage = lazy(() => import('../pages/SinglePage'))
const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))

const ComicsPage = lazy(() => import('../pages/ComicsPage'))

const App = () => {

	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner/>}>
						<Routes>
							<Route path="marveldb" element={<MainPage /> }/>
							<Route path="/" element={<MainPage /> }/>
							<Route path="comics" element={<ComicsPage/>}/>
							<Route path="comics/:itemId" element={<SinglePage dataType='comic'/>}/>
							<Route path="character/:itemId" element={<SinglePage dataType='char'/>}/>
							<Route path="*" element={<Page404 />}/>
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>

	)
	
}

export default App;


