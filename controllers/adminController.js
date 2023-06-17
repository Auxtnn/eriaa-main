require('dotenv').config();
const bcrypt = require('bcrypt');

exports.getAdmin = (req, res) => {
  res.render('admin');
};

exports.getAdminLogin = (req, res) => {
  res.render('login');
};

exports.postAdminLogin = (req, res) => {
  const { email, password } = req.body;

  // retrieve the stored admin email and password from .env file
  const storedEmail = process.env.ADMIN_EMAIL;
  const storedPassword = process.env.ADMIN_PASSWORD;

  // check if provided email and password match the stored admin credentials
  if (email === storedEmail && bcrypt.compareSync(password, storedPassword)) {
    req.session.isAdminLoggedIn = true; // set a session variable to indicate admin login
    // login successful
    res.redirect('/admin/dashboard'); // redirect to admin dashboard
  } else {
    // login failed
    res.redirect('/admin/login'); // redirect back to login page or display an error message
  }
};

  exports.getAdminLogout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/admin/login'); // redirect to the admin login page
    });
  };
  

  exports.ensureAdminLoggedIn = (req, res, next) => {
    if (req.session.isAdminLoggedIn) {
      next(); // User is logged in, proceed to the next middleware or route handler
    } else {
      if (req.originalUrl === '/admin/dashboard') {
        res.redirect('/admin/login'); // Redirect to login page if accessing the dashboard directly
      } else {
        res.redirect(req.originalUrl); // Redirect to the original requested URL for other admin routes
      }
    }
  };
  
