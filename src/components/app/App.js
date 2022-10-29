import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Spinner from '../spinner/Spinner'

import ComicsList from'../comicsList/ComicsList'
import AppHeader from '../appHeader/AppHeader'

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const SingleComicPage = lazy(() => import('../pages/singleComicPage/SingleComicPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))

const App = () => {

	return (
		<Router>
			<p style={{position: 'fixed', top: '0px'}}>react^18.2 react-router^6.4</p>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner/>}>
						<Routes>
							<Route path="marveldb" element={<MainPage /> }/>
							<Route path="/" element={<MainPage /> }/>
							<Route path="comics" element={<ComicsPage />}>
								<Route index element={<ComicsList />}/>
								<Route path=":comicId" element={<SingleComicPage/>}/>
							</Route>	
							<Route path="*" element={<Page404 />}/>
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>

	)
	
}

export default App;


