const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 3000;

// Set up middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dummy data for the email
const emailData = {
  clientName: 'Sir or Madam', // Replace with dynamic data
  projectCost: '4,500',  // Replace with dynamic cost
  yourName: 'Kgotatso Nelson Mohlala',
  yourContact: '082 962 0311',
  yourEmail: 'nelsonmohlala617@gmail.com',
  yourCompanyName: 'Morudi Tech',
};

// Render the email template
app.get('/send-email', (req, res) => {
  ejs.renderFile(path.join(__dirname, 'views', 'email-template.ejs'), emailData, (err, str) => {
    if (err) {
      console.error("Error rendering email template:", err);
      res.send("Error generating email content");
      return;
    }

    // Add a console log to check if the email content is being generated properly
    console.log("Rendered HTML content: ", str);

    // Set up the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider (e.g., Gmail, Outlook)
      auth: {
        user: 'moruditech@gmail.com',  // Your email here
        pass: 'yrhhwzzzvfwvobri'  // Your app password here (no spaces)
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'moruditech@gmail.com',
      to: ' thatchhavenguesthouse@gmail.com',  // Replace with recipient's email address
      subject: 'Enhance Your Business with a Modern Website – Boost Bookings and Visibility!',
      html: str,  // The rendered HTML content from the EJS template
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);  // Log the error for debugging
        res.send('Error sending email');
        return;
      }
      console.log('Email sent: ' + info.response);  // Log the successful response
      res.send('Email sent successfully!');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
