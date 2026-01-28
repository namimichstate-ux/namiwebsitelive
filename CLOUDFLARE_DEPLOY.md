# Cloudflare Deployment Guide

## Quick Start

### 1. Setup Cloudflare Account
- Sign up at https://dash.cloudflare.com
- Add your domain (or use Cloudflare's free nameservers)

### 2. Setup Mailgun
- Sign up at https://mailgun.com (free tier available)
- Create a domain in Mailgun (e.g., mg.yourdomain.com)
- Copy your API Key

### 3. Install & Deploy
```bash
# Install Wrangler CLI
npm install -D wrangler

# Login to Cloudflare
wrangler login

# Set your Mailgun API token as a secret
wrangler secret put MAILGUN_API_TOKEN --env production

# Deploy to Cloudflare Pages
npm run deploy
```

### 4. Configure wrangler.toml
Update the `[env.production]` section with your actual domain:
```toml
[env.production]
routes = [
  { pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }
]
vars = { MAILGUN_DOMAIN = "mg.yourdomain.com", RECIPIENT_EMAIL = "nami.michstate@gmail.com" }
```

## Project Structure

```
/
├── index.html              # Main homepage
├── eboard.html             # E-board page
├── style.css              # Styling
├── script.js              # Frontend JavaScript
├── package.json           # Project dependencies
├── wrangler.toml          # Cloudflare configuration
├── .gitignore            # Git ignore rules
├── EMAIL_SETUP.md        # Email configuration guide
├── CLOUDFLARE_DEPLOY.md  # This file
└── src/
    └── functions/
        └── send-email.js  # Cloudflare Workers function
```

## Environment Variables

### Production (Cloudflare Dashboard)
Set these in Cloudflare Pages → Settings → Environment variables:

**Public Variables:**
- `MAILGUN_DOMAIN`: Your Mailgun domain (e.g., mg.yourdomain.com)
- `RECIPIENT_EMAIL`: Email to receive submissions (default: nami.michstate@gmail.com)

**Secrets** (use `wrangler secret put`):
- `MAILGUN_API_TOKEN`: Your Mailgun API key

### Local Development
Create `.env.local`:
```
MAILGUN_API_TOKEN=your-api-key
MAILGUN_DOMAIN=mg.yourdomain.com
RECIPIENT_EMAIL=nami.michstate@gmail.com
```

## Testing Locally
```bash
npm run dev
```
Visit http://localhost:8788 and test the contact form.

## Troubleshooting

**"Form submission fails"**
- Check browser console for error messages
- Verify all environment variables are set
- Make sure Mailgun domain is verified

**"Email not received"**
- Check Mailgun dashboard for activity logs
- Verify RECIPIENT_EMAIL environment variable
- Ensure authorized senders are configured in Mailgun

**"Pages deployment fails"**
- Verify you're logged in: `wrangler whoami`
- Check that `wrangler.toml` routes are correct
- Review Cloudflare Pages build logs

## Removing Old Netlify Files

The following files are no longer needed:
- `netlify.toml` (already removed)
- `server.js` (replaced by Cloudflare Workers)
- `send-email.js` in root (replaced by `src/functions/send-email.js`)
- `netlify/functions/` directory (can be deleted)

You can safely delete these when ready.

## Next Steps

1. Update your DNS to use Cloudflare's nameservers
2. Point your domain to Cloudflare Pages in the dashboard
3. Enable automatic HTTPS (already included)
4. Setup email notifications for form submissions
5. Monitor performance in Cloudflare's analytics dashboard
