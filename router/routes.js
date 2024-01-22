const express = require('express')
const userRouter = require('./userRouter.')
const postRouter = require('./postRouter')
const router = express.Router()

router.get('/', (req, res) => res.send('Api good to go'))
router.use('/users', userRouter)
router.use('/posts', postRouter)

module.exports = router