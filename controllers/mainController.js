let reservationSubmitted = false;
// let contactSubmitted = false;



  // thankyou page for contact
exports.getThankYouContact = (req, res) => {
    res.render('thankYouContact')
  }

// about us page
exports.getAbout = (req, res) =>{
    res.render('about')
}

// cart page
exports.getCart = (req, res) =>{
    res.render('cart')
}


