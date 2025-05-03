const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to your email provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Your OTP Code',
        html: `<div style="font-family:sans-serif;font-size:16px;">
            <h2>Your OTP Code</h2>
            <p>Your OTP code is: <b style="font-size:24px;">${otp}</b></p>
            <p>This code will expire in 10 minutes.</p>
        </div>`
    };
    await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };