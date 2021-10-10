// importing react library
import React from 'react'

// importing icons
import { AiFillStar } from 'react-icons/ai'

// stylesheet
import './ReviewCard.css'

// props interface
interface Props {
    title: string,
    name: string,
    stars: number,
    review: string,
    position: string
}


// ReviewCard Functional Component 
const ReviewCard: React.FC<Props> = (props: Props) => {

    // destructuring props
    const { title, name, stars, review, position } = props

    /* RENDER */
    return <article className={`review-card ${position}`}>
        <h1>{title}</h1>
        <span>{name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rating: {stars} <AiFillStar className="star-icon" /></span>
        <div className="underline"></div>
        <p>{review}</p>
    </article>
}

export default ReviewCard
