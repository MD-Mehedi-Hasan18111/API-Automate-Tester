const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

const sendErrorEmail = async (subject, message) => {
  const mailOptions = {
    from: `"API Monitor" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    cc: process.env.EMAIL_CC,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Error email sent to ${process.env.EMAIL_TO}`);
  } catch (err) {
    console.error("❌ Failed to send error email:", err.message);
  }
};

module.exports = sendErrorEmail;
