// importing from libraries
import React, { useContext, useState } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

// importing AppContext
import { AppContext } from '../../App'

//importing images 
import CompanyLogo from "../../images/CompanyLogo.png"

//import react icons
import { FaShoppingCart } from 'react-icons/fa'
import { GoThreeBars } from 'react-icons/go'
import { GrClose } from 'react-icons/gr'

// importing components
import FrontPage from '../FrontPage/FrontPage'
import OrderPage from '../OrderPage/OrderPage'
import LoginPage from '../LoginPage/LoginPage'
import ErrorPageNotFound from '../ErrorPageNotFound/ErrorPageNotFound'
import CartPage from '../CartPage/CartPage'
import ReviewPage from '../ReviewPage/ReviewPage'

//i importing utilities
import { defaultUser, ModalCommand, TypeOfModal } from '../../utils'

// stylesheet
import './Navbar.css'


// Navbar Functional Component
const Navbar: React.FC = () => {

    /* STATE VALUES */

    // state value for opening and closing sidebar
    // true if sidebar is open, false otherwise 
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)



    /* APPCONTEXT */

    // getting required values from AppContext
    const { currentUser, userHasLoggedIn, changeCurrentUser, modalAction } = useContext(AppContext)



    /* FUNCTIONS */


    // toggles the state of sidebar
    const toggleSidebar = (): void => {
        setIsSidebarOpen(prev => !prev)
    }


    // closes sidebar after a selsction has been made
    const closeSidebarAfterSelection = (): void => {
        setIsSidebarOpen(false)
    }


    // logs out user
    const logoutUser = (): void => {
        changeCurrentUser(defaultUser)
        modalAction(ModalCommand.OPEN, { text: 'Logged out successfully', type: TypeOfModal.ALERT })
        setIsSidebarOpen(false)
    }



    /* CSS PROPERTIES */

    // sidebar CSS: changes values depending on 'isSidebarOpen' 
    const sidebarStyleObject: React.CSSProperties = {
        width: `${isSidebarOpen ? "20vw" : "0px"}`,
        position: `${isSidebarOpen ? "fixed" : "absolute"}`,
        right: `${isSidebarOpen ? "0" : "-20vw"}`
    }




    /* RENDER */

    return <BrowserRouter>

        {/* navigation bar */}
        <nav>
            {/* company logo; also links to home */}
            <Link to='/' className="logo-link">
                <div className="logo">
                    <img src={CompanyLogo} alt="logo" id="logo-image" />
                    <h1>Topping Masters</h1>
                </div>
            </Link>

            {/* cart button for quick access */}
            <Link to='/cart'><button className="cart-shortcut" title="Your Cart"><FaShoppingCart /></button></Link>

            {/* sidebar opening/closing button */}
            <button className="main-menu" onClick={toggleSidebar} title="Main Menu">{!isSidebarOpen ? <GoThreeBars className="menu-icon" /> : <GrClose className="menu-icon" />}</button>
        </nav>


        {/* sidebar */}
        <section className="sidebar" style={sidebarStyleObject}>

            {/* welcome text: only for logged in users */}
            {userHasLoggedIn && <li className="user-welcome">Welcome {currentUser.name}</li>}

            {/* sidebar links */}
            <li><Link className="link" onClick={closeSidebarAfterSelection} to="/">Home</Link></li>
            <li><Link className="link" onClick={closeSidebarAfterSelection} to="/order">Order</Link></li>
            <li><Link className="link" onClick={closeSidebarAfterSelection} to="/reviews">Our Reviews</Link></li>
            <li><Link className="link" onClick={closeSidebarAfterSelection} to="/cart">Your Cart</Link></li>
            {userHasLoggedIn ? <li><Link to="/"><button className="link-btn" onClick={logoutUser}>Logout</button></Link></li> : <li><Link className="link" onClick={closeSidebarAfterSelection} to="/login">Login</Link></li>}

            {/* copyright text */}
            <p className="copyright">Property of Topping Masters <br />All rights reserved</p>
        </section>


        {/* for switching to different routes  */}
        <Switch>
            <Route path="/" exact>
                <FrontPage />
            </Route>
            <Route path="/order" exact>
                <OrderPage />
            </Route>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Route path="/reviews" exact>
                <ReviewPage />
            </Route>
            <Route path="/cart" exact>
                <CartPage />
            </Route>
            <Route path="*" >
                {/* for any link not mentioned */}
                <ErrorPageNotFound />
            </Route>
        </Switch>

    </BrowserRouter>
}

export default Navbar
