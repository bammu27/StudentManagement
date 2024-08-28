const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,// Your email address
        pass: process.env.EMAIL_PASSWORD,  // Your email password (Consider using environment variables for security)
    },
  });

transporter.verify().then(console.log).catch(console.error);
module.exports = transporter;

