const PostModel = require("../models/postModel")
const UserModel = require("../models/userModel")

async function createPost (req, res) {
    try {
        const user_id = req.user.id
        const {title, content, author} = req.body
        if (!title || !content || !author) {
            return res.status(400).json({success: false, message: 'Please provide required fields'})
        }
        const post = new PostModel({title, content, author, user_id})
        await post.save()
        await UserModel.findByIdAndUpdate(user_id, {$push: {post_ids: post._id}})
        res.status(201).json({success: true, message: 'Post created successfully'})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function getPosts (req, res) {
    try {
        const posts = await PostModel.find()
        if (posts.length < 1) {
            return res.status(404).json({success: false, message: 'No posts found'})
        }
        res.status(200).json({success: true, message: posts})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function getPostsByUser (req, res) {
    try {
        const user_id = req.params.user_id
        if (!user_id) {
            return res.status(400).json({success: false, message: 'Please provide user_id'})
        }

        const user = await UserModel.findById(user_id).populate('post_ids').select('-__v')
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }

        const userPosts = user.post_ids
        if (userPosts.length < 1) {
            return res.status(404).json({success: false, message: 'No posts found'})
        }

        res.status(200).json({success: true, message: userPosts})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function getPostById (req, res) {
    try {
        const post_id = req.params.post_id
        if (!post_id) {
            return res.status(400).json({success: false, message: 'Please provide post_id'})
        }
        const post = await PostModel.findById(post_id)
        if (!post) {
            return res.status(404).json({success: false, message: 'Post not found'})
        }
        res.status(200).json({success: true, message: post})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function updatePost (req, res) {
    try {
        const post_id = req.params.post_id
        await PostModel.findByIdAndUpdate(post_id, req.body, {new: true})
        res.status(200).json({success: true, message: 'Post updated successfully'})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function deletePost (req, res) {
    try {
        const user_id = req.user.id
        const post_id = req.params.post_id
        const post = await PostModel.findByIdAndDelete(post_id)
        await UserModel.findByIdAndUpdate(user_id, {$pull: {post_ids: post._id}})

        res.status(200).json({success: true, message: 'Post deleted successfully'})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

module.exports = {
    createPost,
    getPosts,
    getPostsByUser,
    getPostById,
    updatePost,
    deletePost
}