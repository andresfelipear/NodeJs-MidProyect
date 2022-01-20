const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes:{
        type: Number,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    comments:[{
        comment:{
            type:String,
            required:false
        },
        date:{
            type:Date,
            required:false
        }
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Posts', productSchema)
