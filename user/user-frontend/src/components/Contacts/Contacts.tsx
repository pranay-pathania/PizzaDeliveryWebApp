// import react library 
import React from 'react'

// importing react icons
import { AiFillFacebook, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { SiReddit } from 'react-icons/si'

// stylesheet
import './Contacts.css'


// Contacts Functional Components
const Contacts: React.FC = () => {

    /* RENDER */
    return <footer>
        <h1>Contact Us!</h1>
        <div className="button-container">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                <button title="Facebook"><AiFillFacebook className="footer-btn-logo" /></button>
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                <button title="Twitter"><AiOutlineTwitter className="footer-btn-logo" /></button>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <button title="Instagram"><AiOutlineInstagram className="footer-btn-logo" /></button>
            </a>
            <a href="https://www.reddit.com/" target="_blank" rel="noreferrer">
                <button title="Reddit"><SiReddit className="footer-btn-logo" /></button>
            </a>
        </div>
    </footer>
}

export default Contacts
