const express = require('express')
const { authenticate } = require('../middleware/authentication')
const { createPost, getPosts, getPostsByUser, getPostById, updatePost, deletePost } = require('../controllers/postController')
const { authorizeUser } = require('../middleware/authorization')
const postRouter = express.Router()

postRouter.post('/create', authenticate, createPost)
postRouter.get('/', getPosts)
postRouter.get('/user/:user_id', getPostsByUser)
postRouter.get('/:post_id', getPostById)
postRouter.put('/edit/:post_id', authenticate, authorizeUser, updatePost)
postRouter.delete('/delete/:post_id', authenticate, authorizeUser, deletePost)

module.exports = postRouter
