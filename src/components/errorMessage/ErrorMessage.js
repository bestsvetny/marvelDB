import errorImage from './error.gif'

function ErrorMessage() {
    return (
        <img className="error-message" src={errorImage} alt="Error" style={{display: 'block', margin: '0 auto', maxWidth: '300px'}}></img>
    )
}

export default ErrorMessage;