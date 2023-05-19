const reservation  = require('../models/reservationModel')
const nodemailer = require('nodemailer')

exports.getBooking = (req, res) =>{
  res.render('booking')
}

// Handle the form submission
exports.postBooking  =  ( async (req, res) => {
    const { name, email, phone, date, time, guests } = req.body;
    const booking = new reservation ({ name, email, phone, date, time, guests });
    await booking.save();
  
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
   to: req.body.email,
   subject: 'Reservation Confirmation',
   html:  `
   <html>
     <body>
       <h3>Dear Customer,</h3>
       <p>Thank you for your reservation. Here are the details you provided:</p>
       <ul>
         <li>Name: ${name}</li>
         <li>Date: ${date}</li>
         <li>Time: ${time}</li>
         <li>Guests: ${guests}</li>
       </ul>
       <p>We look forward to seeing you!</p>
       <br>
       <p>Best regards,</p>
       <p>eRiaa</p>
       <br>
       <div style="text-align: center;">
       <img src="../public/images/banner/logo pnggg.png" alt="Logo" style="display: block; margin: 0 auto;" width="100">
       </div>
     </body>
   </html>
 `
   
  };

  transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
      console.log(error);
   } else {
      console.log('Email sent: + info.response');
   }
  })
 
    // Render the thank you message
    
    res.render('thankYou')
  });