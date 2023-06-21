const Subscriber = require('../models/subscribeModel');
const nodemailer = require('nodemailer');

exports.postSubscribe = async (req, res) => {
  const { email } = req.body;
  const subscribe = new Subscriber({ email });
  await subscribe.save();

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
    subject: 'Welcome to our newsletter',
    html: `
      <html>
        <body>
          <h3>Dear Customer,</h3>
          <p>Thank you for subscribing to our newsletter. You will now receive our latest news and updates straight to your inbox</p>
          <br>
          <p>Best regards,</p>
          <p>eRiaa</p>
          <br>
          <br/><br/>
          <div style="text-align: center;">
            <img src="https://i.ibb.co/j5sy6ST/L1.jpg" alt="L1" border="0">
          </div>
          <p>If you no longer wish to receive our newsletter, click <a href="https://eriaa.com/unsubscribe?email=${email}">here to unsubscribe</a>.</p>
        </body>
      </html>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  const adminMailOptions = {
    from: {
      name: 'eriaa',
    },
    to: 'eriaaenquiries@gmail.com',
    subject: 'New Newsletter Subscription',
    html: `
      <html>
        <body>
          <h3>New Newsletter Subscription:</h3>
          <ul>
            <li><strong>Email: </strong>${email}</li>
          </ul>
        </body>
      </html>
    `
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent to admin: ' + info.response);
    }
  });

  res.redirect('/');
};
