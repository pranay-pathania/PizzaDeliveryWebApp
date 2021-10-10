// importing modules
const express = require('express')
const cors = require('cors')
const path = require('path')

// creating app
const app = express()


// port number
const port = 2127

// basic app.use
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// serving the static files (react app)
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


// listening on the defined port
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}/`)
})