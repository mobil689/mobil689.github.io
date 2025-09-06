// api/send-email.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // We only want to handle POST requests to this endpoint
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    // Configure the email transporter using environment variables
    // We're using Gmail as an example, but you can use any email service
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, // e.g., 'smtp.gmail.com'
        port: process.env.EMAIL_PORT, // e.g., 465
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app password
        },
    });

    // Set up email data
    const mailOptions = {
        from: `"${name}" <${email}>`, // sender address
        to: process.env.RECIPIENT_EMAIL, // list of receivers (your email)
        subject: `New Message from Algorythms Contact Form`,
        text: message,
        html: `<p>You have a new message from:</p>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error sending message.' });
    }
}