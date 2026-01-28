# Migration Summary: Netlify → Cloudflare Pages

## Overview
Your NAMI MSU website has been successfully migrated from Netlify to Cloudflare Pages with Cloudflare Workers for serverless functions.

## What Changed

### ✅ Added Files
- **wrangler.toml** - Cloudflare Pages configuration
- **src/functions/send-email.js** - Cloudflare Workers email handler
- **CLOUDFLARE_DEPLOY.md** - Deployment instructions
- **.gitignore** - Git ignore rules (including secrets protection)

### ✅ Modified Files
- **package.json** 
  - Removed: `express`, `body-parser`, `cors`, `nodemailer`, `dotenv` dependencies
  - Added: `wrangler` dev dependency
  - Updated scripts: `deploy` and `dev` now use Cloudflare tooling
  - Updated description to mention Cloudflare Pages

- **EMAIL_SETUP.md**
  - Migrated from Gmail App Passwords to Mailgun service
  - Updated with Cloudflare Pages deployment instructions
  - Added secret management instructions
  - Includes troubleshooting for Cloudflare environment

### ❌ Removed Files
- **netlify.toml** - No longer needed for Cloudflare

### 📁 Files You Can Remove (Optional)
- **server.js** - Node.js express server (replaced by Cloudflare Workers)
- **send-email.js** - Old Netlify function (replaced by `src/functions/send-email.js`)
- **netlify/functions/** - Entire Netlify functions directory

## Key Changes

### Email Service
- **Before**: Gmail with Nodemailer via Netlify Functions
- **After**: Mailgun API via Cloudflare Workers
- **Benefits**: Better serverless support, faster, more reliable

### Deployment Method
- **Before**: Netlify CLI (`netlify deploy`)
- **After**: Wrangler CLI (`wrangler pages deploy`)

### Configuration
- **Before**: `netlify.toml` with build commands
- **After**: `wrangler.toml` with routes and environment variables

### Frontend Changes
- **No changes needed!** Your HTML, CSS, and JavaScript remain the same
- The `/send-email` endpoint works identically from the form's perspective

## Next Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup Mailgun:**
   - Create free account at https://mailgun.com
   - Add your domain as a Mailgun domain
   - Copy your API key

3. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

4. **Set secrets:**
   ```bash
   wrangler secret put MAILGUN_API_TOKEN --env production
   ```

5. **Deploy:**
   ```bash
   npm run deploy
   ```

6. **Link your domain** in Cloudflare dashboard

## Environment Variables

### Development (.env.local)
```
MAILGUN_API_TOKEN=your-key
MAILGUN_DOMAIN=mg.yourdomain.com
RECIPIENT_EMAIL=nami.michstate@gmail.com
```

### Production (Cloudflare Dashboard)
- Public variables in Pages → Settings → Environment variables
- Secrets set via `wrangler secret put`

## Testing
```bash
# Local development
npm run dev

# Access at http://localhost:8788
# Test the contact form
```

## Performance Improvements
- ✅ Runs on Cloudflare's global edge network (lower latency)
- ✅ Automatic HTTPS everywhere
- ✅ Built-in DDoS protection
- ✅ No cold starts with Mailgun
- ✅ Better geographic distribution

## Support Files
- **EMAIL_SETUP.md** - Detailed email configuration
- **CLOUDFLARE_DEPLOY.md** - Full deployment guide

## Questions?
Refer to:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Mailgun Docs](https://documentation.mailgun.com/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
