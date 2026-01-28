# Quick Reference: Cloudflare Deployment

## Install & Setup (One-time)
```bash
npm install                          # Install Wrangler
wrangler login                       # Authenticate with Cloudflare
wrangler secret put MAILGUN_API_TOKEN --env production  # Set API key
```

## Deploy
```bash
npm run deploy
```

## Local Development
```bash
npm run dev
# Visit http://localhost:8788
```

## View Logs
```bash
wrangler pages deployment list
wrangler logs                        # View function logs
```

## Update Configuration
Edit `wrangler.toml`:
```toml
[env.production]
routes = [
  { pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }
]
vars = { 
  MAILGUN_DOMAIN = "mg.yourdomain.com",
  RECIPIENT_EMAIL = "nami.michstate@gmail.com"
}
```

## Environment Variables
```bash
# List secrets
wrangler secret list

# Update secret
wrangler secret put MAILGUN_API_TOKEN --env production

# View variables
cat wrangler.toml
```

## Troubleshooting
```bash
# Check authentication
wrangler whoami

# Deploy with verbose output
wrangler pages deploy --verbose

# Test locally
npm run dev
# Check browser console for errors
```

## Documentation
- 📖 [EMAIL_SETUP.md](./EMAIL_SETUP.md) - Email configuration
- 📖 [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) - Full deployment guide
- 📖 [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) - What changed

## Useful Links
- [Cloudflare Dashboard](https://dash.cloudflare.com)
- [Mailgun Dashboard](https://app.mailgun.com)
- [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
