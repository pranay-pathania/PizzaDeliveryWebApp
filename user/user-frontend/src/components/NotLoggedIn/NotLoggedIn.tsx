// importing from libraries
import React from 'react'
import { Link } from 'react-router-dom'

// stylesheet
import './NotLoggedIn.css'

// NotLoggedIn Functional Component
const NotLoggedIn: React.FC = () => {

    /* RENDER */

    return <main className="not-logged-in">
        <div className="not-logged-in-bg"></div>
        <div className="nli-text">

            <h1>Hey! You shouldn't be here, yet.</h1>
            <p style={{ marginBottom: '20px' }}>You need to be someone we know so we can give you a cart to shop with. How can we know who you are? By logging in, duh!</p>

            <Link to='/login' className="cart-redirect"><button>Click Here to login</button></Link>

            <p>or</p>

            <Link to='/' className="cart-redirect"><button>Go back to home</button></Link>

        </div>
    </main>
}

export default NotLoggedIn
