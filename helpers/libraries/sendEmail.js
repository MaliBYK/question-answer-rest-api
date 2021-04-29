const dotenv = require("dotenv");
dotenv.config({ path: "./config/env/config.env" });
const nodemailer = require("nodemailer");
const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT } = process.env;

const sendEmail = async mailOptions => {
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  let info = await transporter.sendMail(mailOptions);
  console.log(`Message has sent to ${info.messageId}`);
};

module.exports = sendEmail;
