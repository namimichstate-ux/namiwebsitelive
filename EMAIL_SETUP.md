# NAMI MSU Website - Cloudflare Deployment & Email Configuration Guide

## Deploying to Cloudflare Pages

This site is now deployed on Cloudflare Pages with serverless email functions powered by Cloudflare Workers.

### Prerequisites
1. A Cloudflare account (free tier available)
2. A domain (can use Cloudflare's free nameservers)
3. Node.js and npm installed

### Step 1: Install Wrangler CLI
```bash
npm install -D wrangler
# or globally
npm install -g wrangler
```

### Step 2: Authenticate with Cloudflare
```bash
wrangler login
```

This will open a browser to authorize access to your Cloudflare account.

### Step 3: Configure Email Service (Mailgun)

**Option A: Using Mailgun (Recommended for Cloudflare Workers)**

Mailgun works best with Cloudflare Workers serverless environment:

1. Sign up for a Mailgun account at https://mailgun.com
2. Create a domain (you can use a subdomain like `mail.yourdomain.com`)
3. Get your API key from the Mailgun dashboard

### Step 4: Set Environment Variables

In your `wrangler.toml`, add the environment configuration:

```toml
[env.production]
vars = { MAILGUN_DOMAIN = "mg.yourdomain.com", RECIPIENT_EMAIL = "nami.michstate@gmail.com" }
```

**Never commit your API key to git!** Use Cloudflare's secret management:

```bash
# Set production secrets (interactive prompt)
wrangler secret put MAILGUN_API_TOKEN --env production
```

For local development, create a `.env.local` file:
```
MAILGUN_API_TOKEN=your-mailgun-api-key
MAILGUN_DOMAIN=mg.yourdomain.com
RECIPIENT_EMAIL=nami.michstate@gmail.com
```

### Step 5: Deploy to Cloudflare Pages

**First time setup:**
```bash
wrangler pages project create nami-msu-website
```

**Deploy your site:**
```bash
npm run deploy
# or
wrangler pages deploy
```

This command will:
- Deploy all static files (HTML, CSS, JS) to Cloudflare's global edge network
- Deploy the serverless email worker function
- Give you a deployment URL

### Step 6: Link Your Domain

1. Go to https://dash.cloudflare.com
2. Select your domain
3. Navigate to Pages → Your Project
4. Click "Custom Domain" and add your domain

## Testing the Email Feature

1. Open your deployed website
2. Scroll to the "Send us a Message" form
3. Fill in your details
4. Click "Send Message"
5. Check your email inbox for the message

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MAILGUN_API_TOKEN` | Yes | Your Mailgun API key (secret) |
| `MAILGUN_DOMAIN` | Yes | Your Mailgun domain (e.g., mg.yourdomain.com) |
| `RECIPIENT_EMAIL` | No | Email to receive form submissions (default: nami.michstate@gmail.com) |

## Troubleshooting

### "Failed to send email" Error
- Verify Mailgun API token is correct and set as a secret
- Check that MAILGUN_DOMAIN environment variable is set
- Ensure the domain is verified in your Mailgun account

### Email not sending from expected address
- The "from" address in the worker is set to `nami.michstate@gmail.com`
- In Mailgun, you may need to add this as an authorized sender
- Or update the worker code to use a Mailgun domain email

### Local development issues
- Make sure `.env.local` exists with your credentials
- Run `wrangler pages dev` for local testing
- Check the terminal output for detailed error messages

## Migration from Netlify

Previously, this project used Netlify Functions with Nodemailer. Cloudflare Workers provides:
- ✅ Better performance (runs on Cloudflare's global edge)
- ✅ More reliable serverless execution
- ✅ Native support for secrets management
- ✅ Simpler deployment pipeline
- ✅ No cold starts with Mailgun

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Mailgun Documentation](https://documentation.mailgun.com/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
