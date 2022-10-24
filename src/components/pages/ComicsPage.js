import ComicsBanner from '../comicsBanner/ComicsBanner'
import { Outlet } from 'react-router-dom'

const ComicsPage = () => {
    return(
        <>
            <ComicsBanner />
            <Outlet/>
        </>
    )
}

export default ComicsPage