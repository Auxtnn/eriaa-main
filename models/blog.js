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


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
    },

    snippet: {
      type: String,
      required: true
    },
  
    image: {
      public_id: String,
      url: String
    },

    timeCreated: {
        //timeCreated is a virtual field
        type: Date,
        default: () => Date.now(),
    },

}, { timestamps: true });

blogSchema.pre('validate', function (next) {
  // Check if there is content
  if (this.content) {
    // Sanitize the content HTML
    this.content = sanitizeHtml(this.content);

    // Strip HTML tags from the sanitized content
    const strippedContent = stripHtml(this.content);

    // Truncate the content at a word boundary
    const maxLength = 200;
    if (strippedContent.length > maxLength) {
      const truncatedContent = strippedContent.substring(0, maxLength);
      const lastSpaceIndex = truncatedContent.lastIndexOf(' ');
      this.snippet = truncatedContent.substring(0, lastSpaceIndex) + '...';
    } else {
      this.snippet = strippedContent;
    }
  }

  next();
});

  

module.exports = mongoose.model('Blog', blogSchema);

