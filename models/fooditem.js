const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
   
    image: {
        type: String,
        required: true
    }
    
  
}, { timestamps: true });


module.exports = mongoose.model('Menu', foodSchema);
