# NAMI MSU Website - Email Configuration Guide

## Setting up Gmail for sending emails

To make the email feature work, you need to set up a Gmail App Password:

### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to myaccount.google.com
2. Click "Security" in the left sidebar
3. Scroll down to "2-Step Verification" and enable it

### Step 2: Generate App Password
1. Go back to myaccount.google.com
2. Click "Security" 
3. Scroll down to "App passwords" (this appears after 2FA is enabled)
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password

### Step 3: Set Environment Variable
1. Create a `.env` file in this directory with:
   ```
   EMAIL_PASSWORD=your-16-character-app-password
   ```

2. Or set it via command line before running the server:
   ```
   $env:EMAIL_PASSWORD="your-16-character-app-password"
   ```

### Step 4: Run the Server
```
npm start
```

The server will run on http://localhost:8080

## Testing the Email Feature
1. Open your website
2. Scroll to the "Send us a Message" form
3. Fill in your details
4. Click "Send Message"
5. Check nami.michstate@gmail.com inbox for the message

## Troubleshooting
- If you get an "Invalid login" error, check your App Password is correct
- Make sure 2-Factor Authentication is enabled on the Gmail account
- Don't use your regular Gmail password - use the App Password instead
