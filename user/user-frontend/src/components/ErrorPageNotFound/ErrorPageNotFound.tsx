// importing from libraries
import React from 'react'
import { Link } from 'react-router-dom'

//importing images
import MagnifyingGlass from '../../images/PageNotFound.png'

// stylesheet
import './ErrorPageNotFound.css'

// ErrorPageNotFound Functional Component
const ErrorPageNotFound: React.FC = () => {

    /* RENDER */
    return <div className="error">
        <img src={MagnifyingGlass} alt="Page not found" />
        <h1>Error! Page Not Found.</h1>
        <Link to="/" className="error-back-to-home">Back to Home</Link>
    </div>
}

export default ErrorPageNotFound
