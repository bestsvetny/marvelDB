import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div style={{marginTop: '50px'}}>
            <ErrorMessage />
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px'}}>Page not found...</p>
            <Link 
            style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px'}}
            to="/">Homepage</Link>
        </div>
    )
}


export default Page404