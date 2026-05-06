# Resend Email Service Setup

## Overview
This project uses [Resend](https://resend.com) for transactional email delivery (contact form confirmations and admin notifications).

## Setup Steps

### 1. Create Resend Account
- Go to https://resend.com
- Sign up for free account
- Verify your email address

### 2. Get API Key
- Navigate to API Keys in dashboard
- Create new API key
- Copy the key value

### 3. Configure in .env
```
RESEND_API_KEY=your_api_key_here
RESEND_FROM_EMAIL=noreply@velsaim.io
```

### 4. Verify Sender Domain (Production)
For production, you'll need to verify your domain:
1. Go to Domains in Resend dashboard
2. Add your domain (e.g., velsaim.io)
3. Add DNS records (DKIM, SPF, DMARC)
4. Wait for verification (usually 1-2 hours)

### 5. Test Email Sending
```bash
# With API key set, submit contact form
# Check Resend dashboard for delivery status
```

## Email Templates
Located in `src/lib/email/templates.ts`:
- `getContactConfirmationEmail()` - Sent to user submitting form
- `getContactNotificationEmail()` - Sent to admin

## Troubleshooting

### Emails Not Sending
- Check `RESEND_API_KEY` is set correctly
- Check `RESEND_FROM_EMAIL` is valid
- Check Resend dashboard for errors/blocked emails
- Verify rate limiting is not blocking requests

### Development Mode
Without a valid `RESEND_API_KEY`, emails are logged to console instead:
```
Email service disabled. Would send to: user@example.com
```

### Production Limits
Free Resend plan: 100 emails/day
Upgrade for higher limits

## Resources
- [Resend Documentation](https://resend.com/docs)
- [Email Verification](https://resend.com/docs/dashboard/domains)
- [API Reference](https://resend.com/docs/api-reference)
