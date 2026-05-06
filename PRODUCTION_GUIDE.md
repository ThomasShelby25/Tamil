# Production Deployment Guide

## Pre-Deployment Checklist

### Environment Variables
- [ ] Set `ADMIN_API_KEY` to a strong, unique value (min 32 characters)
- [ ] Set `RESEND_API_KEY` with your Resend account API key
- [ ] Set `DATABASE_URL` with production PostgreSQL connection string
- [ ] Set `NODE_ENV=production`
- [ ] Set `NEXT_PUBLIC_APP_URL` to production domain

### Database
- [ ] Create PostgreSQL database in production
- [ ] Run `npx prisma db push` to apply schema
- [ ] Backup database before deployment
- [ ] Test database connection from production environment

### Security
- [ ] Use strong, unique `ADMIN_API_KEY` (not default-dev-key)
- [ ] Enable HTTPS/SSL on production domain
- [ ] Use environment-specific secrets management (AWS Secrets Manager, Azure Key Vault, etc.)
- [ ] Enable rate limiting at reverse proxy level (Nginx, CloudFlare, etc.)
- [ ] Regular security audits

### Monitoring
- [ ] Set up error logging (e.g., Sentry, DataDog)
- [ ] Monitor database performance and backups
- [ ] Track email delivery metrics via Resend dashboard
- [ ] Monitor API response times

### Performance
- [ ] Enable CDN for static assets
- [ ] Set up caching headers
- [ ] Monitor database query performance
- [ ] Set up database connection pooling (PgBouncer, etc.)

## Deployment Steps

### With Vercel (Recommended for Next.js)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### With Docker
```bash
# Build Docker image
docker build -t velsaim:latest .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e ADMIN_API_KEY="..." \
  -e RESEND_API_KEY="..." \
  velsaim:latest
```

## Rollback Strategy
- Keep previous version running on separate instance
- Use blue-green deployment pattern
- Have database backup before each deployment
- Document rollback procedures

## Maintenance
- Regular dependency updates: `npm audit fix`
- Monitor for security patches
- Regular database backups
- Review logs and error tracking
