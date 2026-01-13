const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nami.michstate@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

// Email endpoint
app.post('/send-email', async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        // Validate input
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Construct the email body
        const emailBody = `Notification from NAMI MSU website:

Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}`;

        // Send email
        await transporter.sendMail({
            from: 'nami.michstate@gmail.com',
            to: 'nami.michstate@gmail.com',
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            text: emailBody,
            replyTo: email
        });

        res.json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
});

// Fallback route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Email service ready to send messages to nami.michstate@gmail.com');
});
