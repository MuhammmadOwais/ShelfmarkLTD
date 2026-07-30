const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: parseInt(process.env.SMTP_PORT || '465') === 465, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"Shelfmark LTD" <${process.env.SMTP_FROM || 'admin@shelfmark.com'}>`,
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email dispatched successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email dispatch failed:', error.message);
    throw error;
  }
};

module.exports = { sendEmail };
