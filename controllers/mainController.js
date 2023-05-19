// home page
exports.getIndex = (req, res) =>{
    res.render('index')
}

exports.getLogin = (req, res) => {
    res.render('login')
}

exports.getAdmin = (req, res) => {
    res.render('admin')
}
// thankyou page
exports.getThankYou = (req, res) => {
    res.render('thankyou')
  }

// contact us page
exports.getContact = (req, res) =>{
    res.render('contact')
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

