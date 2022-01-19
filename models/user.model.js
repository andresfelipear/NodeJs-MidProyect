const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true   
    },
    posts: {
        postId: { 
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'Posts'
        },
    }
})

module.exports = mongoose.model('User', userSchema)
