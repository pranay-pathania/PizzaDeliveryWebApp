// import react library
import React from 'react'

// import components
import IntroductionCard from '../IntroductionCard/IntroductionCard'
import InformationCard from '../InformationCard/InformationCard'
import Offer from '../Offer/Offer'
import Contacts from '../Contacts/Contacts'

//images imports
import Fresh from '../../images/fresh-ingredients.jpg'
import Traditional from '../../images/traditional-cooking.jpg'
import AwardWinning from '../../images/winning-taste.jpg'

// importing utilities
import { frontPageCardInformation, frontPageInfoCard } from '../../utils'

// stylesheet
import './FrontPage.css'

// image srcs array
// created so that i can map ove it and the information array using the same value of indices
const imageSources = [
    Fresh,
    Traditional,
    AwardWinning
]


// FrontPage Functional Component
const FrontPage: React.FC = () => {

    /* RENDER */

    return <>
        {/* introduction card */}
        <IntroductionCard {...frontPageInfoCard} />

        {/* three information cards */}
        <div className="frontpageinfo">
            <h1>About Us</h1>
            <div className="info-cards">
                {frontPageCardInformation.map((item, index) => {
                    return <InformationCard {...item} src={imageSources[index]} key={index} />
                })}
            </div>
        </div>

        {/* offers card */}
        <Offer />

        {/* contacts card */}
        <Contacts />
    </>
}

export default FrontPage
