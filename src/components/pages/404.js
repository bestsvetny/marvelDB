import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import '../../style/buttons.scss'
import '../../style/style.scss'

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="This page is not found"/>
                <title>This page is not found</title>
            </Helmet>
            <div 
                style={{margin: '30px auto 0 auto'}}
                className="wrap-fvc">
                    <p style={{textAlign: 'center', fontWeight: 'bold', lineHeight: '118px', fontSize: '118px'}}>Oops!</p>
                    <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '25px'}}>404 - Not Found</p>
                    <button
                        onClick={() => navigate(-1)} 
                        className="button button_main"
                        style={{margin: '40px auto 0 auto'}}>
                        <p className="inner">Previous page</p>
                    </button>
                </div>
        </>
    )
}


export default Page404