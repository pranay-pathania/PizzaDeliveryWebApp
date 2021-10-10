// import react library
import React from 'react'

// stylesheet
import './IntroductionCard.css'

// props interface
interface Props {
    heading: string,
    content: string
}


// IntroductionCard Functional Component
const IntroductionCard: React.FC<Props> = (props: Props) => {

    // destructuring props
    const { heading, content } = props


    /* RENDER */

    return <div className="intro-card-container">
        <main className="front-page-card"></main>
        <div className="intro-text">
            <h1>{heading}</h1>
            <p>{content}</p>
        </div>
    </div>
}

export default IntroductionCard
