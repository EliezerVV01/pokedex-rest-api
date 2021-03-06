const nodemailer = require('nodemailer');
const CONFIG = require('./../../config/config');

class Email {
  static async sendEmail(emailToRecieve, _subject, _html) {
    const transporter = nodemailer.createTransport({
      service: CONFIG.email_service,
      auth: {
        user: CONFIG.email_user,
        pass: CONFIG.email_pass,
      },
    });

    const mailOptions = {
      from: CONFIG.email_user, // sender address
      to: emailToRecieve, // list of receivers
      subject: _subject, // Subject line
      html: _html, // plain text body
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        const error = new Error('Ups! Something went wrong trynig to send the validation email! Please Sign Up again');
        error.code = 500;
        throw error; 
      }
    });
  }
}

module.exports = Email;
