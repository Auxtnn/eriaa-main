const reservation = require('../models/reservationModel');
const nodemailer = require('nodemailer');
const moment = require('moment');
let reservationSubmitted = false;


exports.getBooking = (req, res) => {
  res.render('reservation');
};

// thankyou page for reservation
exports.getThankYouReservation = (req, res) => {
  reservationSubmitted ? res.render('thankYouReservation') : res.redirect('/reservation');
}

exports.postBooking = async (req, res) => {
  const { name, email, phone, date, time, guests } = req.body;
  const booking = new reservation({ name, email, phone, date, time, guests });
  await booking.save();

const timeFormatted = moment(time, 'HH:mm').format('h:mm A');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  const mailOptions = {
    from: {
      name: 'eriaa',
    },
    to: email,
    subject: 'Reservation Confirmation',
    html: `
      <html>
        <body style="background-color: #222; color:#fff;">
          <h3 style="color:#fff; padding-top: 20px; padding-left: 30px;">Dear ${name},</h3>
          <p style="color:#fff; padding-left: 20px">Thank you for your reservation. Here are the details you provided:</p>
          <ul>
          <li>Name: ${name}</li> 
          <li>Email: ${email}</li>
          <li>phone: ${phone}</li>
          <li>Date: ${date}</li>
          <li>Time: ${timeFormatted}</li>
          <li>Guests: ${guests}</li>
          </ul>
          <p style="color:#fff; padding-left: 20px">We look forward to seeing you soon!</p>
          <p style="color:#fff; padding-left: 20px">Best regards,</p>
          <p style="color:#fff; padding-left: 20px">éRiaa.</p>
          <br>
          <div style="text-align: center;">
          <img src="https://i.ibb.co/tDbctxM/logo-pnggg.png" alt="logo-pnggg" border="0">
          </div>
        </body>
      </html>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent to customer: ' + info.response);
    }
  });

  const adminMailOptions = {
    from: {
      name: 'eriaa',
    },
    to: 'eriaaenquiries@gmail.com',
    subject: `New Reservation from ${name}`,
    html: `
    <html>
      <body style="background-color: #222; color:#fff;">
        <h3 style="color:#fff; padding: 30px">New Contact Form Submission:</h3>
        <ul>
          <li><strong>Name: </strong>${name}</li> 
          <li><strong>Email: </strong>${email}</li>
          <li><strong>phone: </strong>:${phone}</li>
          <li><strong>Date: </strong>${date}</li>
          <li><strong>Time: </strong>${timeFormatted}</li>
          <li><strong>Guests: </strong>${guests}</li>
        </ul>
        <br/><br/>
        <div style="text-align: center;">
          <img src="https://i.ibb.co/tDbctxM/logo-pnggg.png" alt="logo-pnggg" border="0">
        </div>
      </body>
    </html>
  `
   
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent to admin: ' + info.response);
      if (reservationSubmitted = true) {
        res.redirect('/reservation/thank-you')
      } else {
        res.redirect('/reservation')
      }
     
    }
   
  });
    
};
