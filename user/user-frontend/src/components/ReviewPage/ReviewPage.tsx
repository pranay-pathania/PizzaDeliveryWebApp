// importing from libraries
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// importing components
import ReviewCard from '../ReviewCard/ReviewCard'

// importing AppContext
import { AppContext } from '../../App'

// importing icons
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'

// importing utilities
import { ModalCommand, TypeOfModal } from '../../utils'
import { bestReviews } from '../../utils'
import { ReviewSubmissionInterface, initialFormReviewState, isAnyReviewFieldEmpty } from '../../utils'

// stylesheet
import './ReviewPage.css'


// ReviewPage Functional Component 
const ReviewPage: React.FC = () => {

    /* STATE VALUES */

    // index for the slider component
    const [viewIndex, setViewIndex] = useState<number>(0)

    // state value for the review form
    const [reviewInput, setReviewInput] = useState<ReviewSubmissionInterface>(initialFormReviewState)







    /* APPCONTEXT */

    // getting required values from AppContext
    const { modalAction } = useContext(AppContext)






    /* FUNCTIONS */


    // shifts the slide left                     
    const shiftLeft = (): void => {
        let lastIndex = viewIndex - 1
        if (lastIndex < 0) {
            lastIndex = bestReviews.length - 1
        }
        setViewIndex(lastIndex)
    }

    // shifts the slide right
    const shiftRight = (): void => {
        let nextIndex = viewIndex + 1
        if (nextIndex >= bestReviews.length) {
            nextIndex = 0
        }
        setViewIndex(nextIndex)
    }


    // tracks changes in the review form
    const trackReviewFormChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setReviewInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    // submit the reivew
    const submitReview = () => {
        if (isAnyReviewFieldEmpty(reviewInput)) {

            // shows modal when any field is empty
            modalAction(ModalCommand.OPEN, { text: `All fields are necessary`, type: TypeOfModal.WARNING })

        } else {

            // splits the location entered to city and country
            const placeArray = reviewInput.place.split(",")


            if (placeArray.length !== 2) {

                // if there was no comma in the location entry i.e. city and country were not stated differently
                modalAction(ModalCommand.OPEN, { text: `Please fill out place as "city-name, country-name"`, type: TypeOfModal.ALERT })

            } else {

                //create the review object as per values entered by the user
                const finalReviewObject = {
                    name: reviewInput.name,
                    title_of_review: reviewInput.title_of_review,
                    review_content: reviewInput.review_content,
                    rating: reviewInput.rating,
                    place: {
                        city: placeArray[0].trim(),
                        country: placeArray[1].trim()
                    }
                }

                try {

                    // post the review object to the backend
                    axios.post('http://localhost:1000/post-review', finalReviewObject)

                    // show modal; review submitted
                    modalAction(ModalCommand.OPEN, { text: 'Review submitted', type: TypeOfModal.ALERT })

                    // returning to the initial state
                    setReviewInput(initialFormReviewState)

                } catch (error) {

                    // upon errors; review not submitted
                    modalAction(ModalCommand.OPEN, { text: 'Could not submit', type: TypeOfModal.ALERT })

                    // not for the user; logs the error, if any
                    console.log(error)

                }


            }
        }
    }




    /* RENDER */
    return <>

        {/* slider component */}
        <main className="review-container">
            <section className="section-center">
                {
                    // mapping over the reviews
                    bestReviews.map((review, personIndex) => {
                        let position: string = 'nextSlide'
                        if (personIndex === viewIndex) {
                            position = 'activeSlide'
                        }
                        if (personIndex === viewIndex - 1 || (viewIndex === 0 && personIndex === bestReviews.length - 1)) {
                            position = 'lastSlide'
                        }
                        return <ReviewCard {...review} key={personIndex} position={position} />
                    })
                }
            </section>

            {/* buttons to switch between review slides */}
            <button className="left-shift" onClick={shiftLeft}><FaChevronLeft className="slide-change-icon" /></button>
            <button className="right-shift" onClick={shiftRight}><FaChevronRight className="slide-change-icon" /></button>
        </main>


        {/* header for the review page */}
        <header className="review-header">
            <h1>Customer Reviews</h1>
            <p>See how our customers rate our services. Here are our best reviews!</p>
        </header>



        {/* review form component */}
        <aside className="review-form">
            <h1>Tell us if we served you well!</h1>
            <p>Your feedback is important to us, so write away.</p>

            {/* review form */}
            <div className="form">

                {/* name input */}
                <input type="text" placeholder="Name" name="name" value={reviewInput.name} onChange={trackReviewFormChanges} />

                {/* location input */}
                <input type="text" placeholder="City, Country (e.g. Mumbai, India)" name="place" value={reviewInput.place} onChange={trackReviewFormChanges} />


                {/* rating radio buttons */}
                <div className="rating-stars">
                    <p>Choose a rating</p>
                    <div className="options">

                        {/* radio buttons with labels */}
                        <div className="each-option">
                            <input type="radio" name="rating" value={5} onChange={trackReviewFormChanges} />
                            <label>5<AiFillStar className="option-star" /></label>
                        </div>

                        <div className="each-option">
                            <input type="radio" name="rating" value={4} onChange={trackReviewFormChanges} />
                            <label>4<AiFillStar className="option-star" /></label>
                        </div>

                        <div className="each-option">
                            <input type="radio" name="rating" value={3} onChange={trackReviewFormChanges} />
                            <label>3<AiFillStar className="option-star" /></label>
                        </div>

                        <div className="each-option">
                            <input type="radio" name="rating" value={2} onChange={trackReviewFormChanges} />
                            <label>2<AiFillStar className="option-star" /></label>
                        </div>

                        <div className="each-option">
                            <input type="radio" name="rating" value={1} onChange={trackReviewFormChanges} />
                            <label>1<AiFillStar className="option-star" /></label>
                        </div>

                    </div>

                </div>

                {/* review title */}
                <input type="text" placeholder="Title of the review" name="title_of_review" value={reviewInput.title_of_review} onChange={trackReviewFormChanges} />

                {/* review content textarea */}
                <textarea placeholder="Write your review" name="review_content" value={reviewInput.review_content} onChange={trackReviewFormChanges} />

                {/* review submit button */}
                <Link to='/'><button className="submit-review" onClick={submitReview} title="Submit">Submit</button></Link>
            </div>
        </aside>
    </>
}

export default ReviewPage
