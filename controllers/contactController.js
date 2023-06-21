const contact = require('../models/contactModel');
const nodemailer = require('nodemailer');

// contact us page
exports.getContact = (req, res) => {
  res.render('contact');
};

// Handle the form submission
exports.postContact = async (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  const Contact_customer = new contact({ name, phone, email, subject, message });
  await Contact_customer.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  const mailOptions = {
    from: {
      name: 'éRiaa',
    },
    to: email,
    subject: subject,
    html: `
      <html>
        <body style="background-color: #222; color:#fff;">
          <h3 style="color:#fff; padding: 30px;">Dear ${name},</h3>
          <p style="color:#fff; padding-left: 20px">Thank you for contacting us. You will receive feedback soon</p>
          <br>
          <p style="color:#fff;  padding-left: 20px;">Best regards,</p>
          <p style="color:#fff;  padding-left: 20px;">éRiaa.</p>
          <br>
          
          <br/><br/>
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
      console.log('Email sent: ' + info.response);
      // contactSubmitted = true;
      // res.redirect('/contact-us/thank-you');
    }
  });

  const adminMailOptions = {
    from: {
      name: 'éRiaa',
    },
    to: 'eriaaenquiries',
    subject: 'New Contact Form Submission',
    html: `
      <html>
        <body style="background-color: #222; color:#fff;">
          <h3 style="color:#fff; padding: 30px">New Contact Form Submission:</h3>
          <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
            <li>Subject: ${subject}</li>
            <li>Message: ${message}</li>
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

      // reservationSubmitted = true;
    }
  });
    res.redirect('/contact-us/thank-you')
};
