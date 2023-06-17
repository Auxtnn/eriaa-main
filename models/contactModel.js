const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required:  [true, "Please enter your name"]
    },
    email: {
        type: String,
        required:  [true, "Please enter email address"]
    },
    phone: {
        type: Number,
        required:  [true, "Please enter your phone"]
    },
    subject: {
        type: String,
        required:  [true, "Please enter subject"]
    },
    message: {
        type: String,
        required:  [true, "Please enter your messsage"]
    },
    createdAt: {
        type: Date,
    },
})

module.exports = mongoose.model('Contact', contactSchema)