const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    post_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const hashPassword = await bcryptjs.hash(this.password, 10)
            this.password = hashPassword
        }
        next()
    } catch (error) {
        console.log(error.message)
        return next(error)
    }
})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel