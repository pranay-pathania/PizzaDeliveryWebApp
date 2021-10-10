const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    name: String,
    place: {
        city: String,
        country: String
    },
    rating: Number,
    title_of_review: String,
    review_content: String
})

const Review = mongoose.model('review', reviewSchema)

module.exports = Review