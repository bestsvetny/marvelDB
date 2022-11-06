import './skeleton.scss'

function Skeleton() {
    return (
        <>
            <p className="skeleton__title">Please select a character to see information</p>
            <div className="skeleton__shapes pulse">
                <div className="skeleton__circle"></div>
                <div className="skeleton__text"></div>
                <div className="skeleton__rectangle"></div>
                <div className="skeleton__rectangle"></div>
                <div className="skeleton__rectangle"></div>
            </div>
        </>
    )
}

export default Skeleton;