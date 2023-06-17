const mongoose = require('mongoose');
const domPurify = require('dompurify');
//dompurify is a plugin that is used to sanitize the html
const {JSDOM} = require('jsdom');
//JSDOM is a plugin that is used to parse the html
const htmlPurify= domPurify(new JSDOM().window);
//htmlPurify is a plugin that is used to sanitize the html
const sanitizeHtml = require('sanitize-html');

function stripHtml(htmlString) {
    // Use sanitize-html library to remove HTML tags from the string
    return sanitizeHtml(htmlString, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }


//stripHtml is a function that strips html tags from a string

const foodSchema = new mongoose.Schema({
    name: {
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
    },

    timeCreated: {
        //timeCreated is a virtual field
        type: Date,
        default: () => Date.now(),
    },
    

}, { timestamps: true });

foodSchema.pre('validate', function (next) {
    // Check if there is a description
    if (this.content) {
      // Sanitize the description HTML
      this.description = sanitizeHtml(this.content);
  
      // Strip HTML tags from the sanitized description
      this.snippet = stripHtml(sanitizeHtml(this.content.substring(0, 200))).result;
    }
  
    next();
  });
  

module.exports = mongoose.model('Menu', foodSchema);
