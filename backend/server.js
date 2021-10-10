// importing modules
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// creating app
const app = express()

// importing custom models
const Customer = require('./models/Customer')
const Order = require('./models/Order')
const Review = require('./models/Review')


// defining port number (because localhost)
const port = 1000


// all app.use
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))






/* ROUTES */



// USER WEBSITE REQUESTS

// POST:  sign up new user
app.post('/sign-up', async (req, res) => {
    try {
        const { name, email, password } = await req.body
        const recievedUser = new Customer({
            name,
            email,
            password
        })
        await recievedUser.save()
    } catch (error) {
        console.log(error)
    }
})

// POST:  review written by the customer
app.post('/post-review', async (req, res) => {
    try {
        const recievedReview = new Review(await req.body)
        await recievedReview.save()
    } catch (error) {
        console.log(error)
    }
})

// POST:  place the order using th data provided by the customer
app.post('/place-order', async (req, res) => {
    try {
        const recievedOrder = new Order(await req.body)
        await recievedOrder.save()
    } catch (error) {
        console.log(error)
    }
})


// GET:  sends the user object as per the data filled in the form; to check whether the user exists for login purposes
app.get('/get-user', async (req, res) => {
    await Customer.findOne(req.params)
        .then(response => res.send(response))
        .catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
})




// STAFF WEBSITE REQUESTS

// GET: sends all orders by every user that have not been marked either completed or cancelled
app.get('/orders', async (req, res) => {
    await Order.find({ completed: false, cancelled: false })
        .then(response => res.send(response))
        .catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
})


// PUT: updates the value of orderObject.completed to true
app.put('/complete-order/:id', async (req, res) => {
    await Order.findOneAndUpdate({ _id: req.params.id }, { completed: true })
})

// PUT: updates the value of orderObject.cancelled to true
app.put('/cancel-order/:id', async (req, res) => {
    await Order.findOneAndUpdate({ _id: req.params.id }, { cancelled: true })
})




// start listening once connected to database
mongoose.connect('mongodb://localhost:27017/PizzaDB')
    .then(() => {
        app.listen(port, () => {
            console.log(`Running at http://localhost:${port}/`)
        })
    }, err => {
        console.log(`Big fat error: ${err}`)
    })



