const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name: String,
    phone_number: String,
    email: String,
    address: String,
    order: {
        date: String,
        cart: [{
            item_name: String,
            quantity: Number,
            total_cost: Number
        }],
        total_cost: Number,
        payment_method: String
    },
    completed: Boolean,
    cancelled: Boolean
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order