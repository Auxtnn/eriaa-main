// const admin = require('../models/admin');


// SHOW ADMIN DASHBOARD
const getAdmin = (req, res) => {
  if (req.session.user && req.session.user.isAdmin) {
    res.render('admin');
  } else {
    res.redirect('/login');
  }
};

// const getAdmin = (req, res) =>{
//     res.render('admin')
// }

const getLogin = (req, res) =>{
    res.render('login')
}

module.exports = {
    getAdmin,
    getLogin,
}