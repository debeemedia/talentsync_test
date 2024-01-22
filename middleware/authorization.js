const PostModel = require("../models/postModel")

async function authorizeUser (req, res, next) {
    try {
        const user_id = req.user.id
        if (!user_id) {
            return res.status(400).json({success: false, message: 'Please provide user_id'})
        }
        const post_id = req.params.post_id
        if (!post_id) {
            return res.status(400).json({success: false, message: 'Please provide post_id'})
        }
        const post = await PostModel.findById(post_id)
        if (!post) {
            return res.status(404).json({success: false, message: 'Post not found'})
        }
        if (post.user_id == user_id) {
            next()
        } else {
            res.status(403).json({success: false, message: 'Access Denied. You are not the creator of this post'})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

module.exports = {authorizeUser}