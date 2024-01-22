require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./router/routes')

const app = express()

const PORT = process.env.PORT || 7000

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({success: false, message: err.message})
    }
    next()
})

mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection
db.once('connected', () => console.log('Database connected'))
db.on('error', error => console.log('Error connecting to database', error.message))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))