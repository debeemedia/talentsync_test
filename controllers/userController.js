require('dotenv').config()
const UserModel = require("../models/userModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function createUser (req, res) {
    try {
        const {username, password} = req.body

        if (!username) {
            return res.status(400).json({success: false, message: 'Please provide username'})
        }
        if (!password) {
            return res.status(400).json({success: false, message: 'Please provide password'})
        }

        const user = new UserModel({username, password})
        const existingUser = await UserModel.findOne({username})
        if (existingUser) {
            return res.status(400).json({success: false, message: 'Username already exists'})
        }

        await user.save()
        res.status(201).json({success: true, message: 'Registration successful'})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function login (req, res) {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).json({success: false, message: 'Please provide credentials'})
        }

        const user = await UserModel.findOne({username})
        if (!user) {
            return res.status(404).json({success:false, message: 'User not found'})
        }

        bcryptjs.compare(password, user.password, (err, result) => {
            if (result === true) {
                const token = jwt.sign({id: user._id, username: user.username}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
                res.status(200).json({success: true, message: token})
            } else {
                res.status(401).json({success: false, message: 'Incorrect credentials'})
            }
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

module.exports = {
    createUser,
    login
}