const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const Customer = mongoose.model('customer', customerSchema)

module.exports = Customer