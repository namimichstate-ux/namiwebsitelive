const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nami.michstate@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            }
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        const { firstName, lastName, email, message } = JSON.parse(event.body);

        // Validate input
        if (!firstName || !lastName || !email || !message) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: 'All fields are required.' })
            };
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

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Email sent successfully!' })
        };
    } catch (error) {
        console.error('Email error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Failed to send email. Please try again later.' })
        };
    }
};
