/**
 * Cloudflare Worker for handling email submissions
 * This worker is deployed as a route handler on Cloudflare Pages
 */

export async function onRequest(context) {
  const { request } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ message: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    const { firstName, lastName, email, message } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !message) {
      return new Response(
        JSON.stringify({ message: 'All fields are required.' }),
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Email configuration from environment variables
    const emailApiToken = context.env.MAILGUN_API_TOKEN;
    const emailDomain = context.env.MAILGUN_DOMAIN;
    const recipientEmail = context.env.RECIPIENT_EMAIL || 'nami.michstate@gmail.com';

    if (!emailApiToken || !emailDomain) {
      return new Response(
        JSON.stringify({ message: 'Email service not configured.' }),
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Construct the email body
    const emailBody = `Notification from NAMI MSU website:

Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}`;

    // Send email using Mailgun API (recommended for Cloudflare Workers)
    const formData = new FormData();
    formData.append('from', `nami.michstate@gmail.com`);
    formData.append('to', recipientEmail);
    formData.append('subject', `New Contact Form Submission from ${firstName} ${lastName}`);
    formData.append('text', emailBody);
    formData.append('h:Reply-To', email);

    const mailgunResponse = await fetch(
      `https://api.mailgun.net/v3/${emailDomain}/messages`,
      {
        method: 'POST',
        auth: `api:${emailApiToken}`,
        body: formData,
      }
    );

    if (!mailgunResponse.ok) {
      const error = await mailgunResponse.text();
      console.error('Mailgun error:', error);
      throw new Error('Failed to send email');
    }

    return new Response(
      JSON.stringify({ message: 'Email sent successfully!' }),
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Email error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to send email. Please try again later.' }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
