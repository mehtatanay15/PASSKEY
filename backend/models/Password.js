const mongoose = require('mongoose')
const { Schema } = mongoose;

const passwordSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    tag:{
        type: String
    }
})

module.exports = mongoose.model('passwords',passwordSchema)