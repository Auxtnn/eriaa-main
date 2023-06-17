let reservationSubmitted = false;
// let contactSubmitted = false;



// home page
exports.getIndex = (req, res) =>{
    res.render('index')
}

  // thankyou page for contact
exports.getThankYouContact = (req, res) => {
    res.render('thankYouContact')
  }

// about us page
exports.getAbout = (req, res) =>{
    res.render('about')
}

// get blog page in main website
exports.getBlog = (req, res) =>{
    res.render('blog')
}

// cart page
exports.getCart = (req, res) =>{
    res.render('cart')
}

// get menu page in main website
exports.getMenu = (req, res) =>{
    res.render('menu')
}

