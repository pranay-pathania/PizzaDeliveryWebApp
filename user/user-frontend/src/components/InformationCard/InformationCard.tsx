// import react library
import React from 'react'

// stylesheet
import './InformationCard.css'


// props interface
interface Props {
    src: string,
    title: string,
    content: string
}

// InfromationCard Funtional Component
const InformationCard: React.FC<Props> = (props: Props) => {

    // destructuring props
    const { src, title, content } = props


    /* RENDER */
    return <section className="info-card">
        <img src={src} alt={title} />
        <h1>{title}</h1>
        <p>{content}</p>
    </section>
}

export default InformationCard
