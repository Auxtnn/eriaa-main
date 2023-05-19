const Subscriber = require('../models/subscribeModel')
const nodemailer = require('nodemailer')


// Handle the form submission
exports.postSubscribe  =  ( async (req, res) => {
    const { email } = req.body;
    const subscribe = new Subscriber ({ email });
    await subscribe.save();
  
  const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: 'iykeemerald@gmail.com',
      pass: 'sligybgqysztwzzz'
   }
  });

  const mailOptions = {
   from: {
      name: 'eriaa',
},
   to: email,
   subject: 'Welcome to our newsletter',
   text: 'Thank you for subscribing to our newsletter. You will now receive our latest news and updates straight to your inbox'
  };

  transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
      console.log(error);
   } else {
      console.log('Email sent: + info.response');
   }
  })
 
    // Render the thank you message
    res.redirect('/')
  });