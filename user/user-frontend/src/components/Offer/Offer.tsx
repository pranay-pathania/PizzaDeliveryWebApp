// import react library
import React from 'react'

// import text information from utils
import { offerText } from '../../utils'

// stylesheet
import './Offer.css'

// Offer Functional Component
const Offer: React.FC = () => {

    //destructuring offerText
    const { title, content, condition } = offerText


    /* RENDER */
    return <div className="offer-text">
        <h1>{title}</h1>
        <p>{content}</p>
        <span>{condition}</span>
    </div>
}

export default Offer
