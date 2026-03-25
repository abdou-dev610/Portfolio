# 📦 Deployment Guide

Guide for deploying your portfolio contact backend to production.

## 🌍 Deployment Platforms

### 1. **Render** (Recommended - Free tier available)

#### Step 1: Prepare Repository
```bash
git add .
git commit -m "Add backend API"
git push
```

#### Step 2: Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub
- Create new Web Service

#### Step 3: Configure Service
- Name: `portfolio-contact-api`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Region: Choose closest to users

#### Step 4: Add Environment Variables
In Render dashboard, add:
```
MONGODB_URI=your_uri
EMAIL_USER=your_email
EMAIL_PASS=your_password
ADMIN_EMAIL=admin@example.com
NODE_ENV=production
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
FRONTEND_URL=https://your-frontend.vercel.app
```

#### Step 5: Deploy
- Render auto-deploys on git push
- Your API URL: `https://portfolio-contact-api.onrender.com`

---

### 2. **Heroku** (Classic option)

#### Prerequisites
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- GitHub/Heroku account

#### Deployment Steps

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-portfolio-api

# Add MongoDB Atlas URI
heroku config:set MONGODB_URI="your_mongodb_uri"

# Add email config
heroku config:set EMAIL_USER="your-email@gmail.com"
heroku config:set EMAIL_PASS="your-app-password"
heroku config:set ADMIN_EMAIL="admin@example.com"

# Add Twilio config
heroku config:set TWILIO_ACCOUNT_SID="your_sid"
heroku config:set TWILIO_AUTH_TOKEN="your_token"
heroku config:set TWILIO_PHONE_NUMBER="your_number"

# Set environment
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

Your API URL: `https://your-portfolio-api.herokuapp.com`

---

### 3. **Railway** (Fast & Modern)

#### Step 1: Connect GitHub
- Go to [railway.app](https://railway.app)
- Click "Deploy from GitHub"
- Select your repository

#### Step 2: Configure
- Railway auto-detects Node.js app
- Add environment variables in dashboard

#### Step 3: Deploy
- Auto-deploys on push
- Check deployment logs

---

### 4. **DigitalOcean App Platform**

#### Step 1: Create App
1. Go to DigitalOcean
2. Create → App Platform
3. Connect GitHub repo
4. Select `backend` folder

#### Step 2: Configure
- Build: `npm install`
- Run: `npm start`
- Add environment variables

#### Step 3: Deploy
- Review and deploy
- Get API URL from dashboard

---

### 5. **Vercel** (For serverless)

**Note:** Vercel works best for serverless. For continuous API, use Render/Heroku instead.

#### Alternative: Vercel Edge Functions
Would require refactoring to serverless architecture.

---

## 🗄️ MongoDB Atlas Setup

### Create Free Cluster
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up
3. Create organization
4. Create project (free tier)
5. Deploy cluster (M0 free)

### Get Connection String
1. Click "Connect"
2. Add current IP to whitelist
3. Choose "Connect your application"
4. Copy MongoDB URI
5. Replace `<username>` and `<password>`
6. Add database name: `/portfolio-contact`

### Final URI Format
```
mongodb+srv://username:password@cluster0.mongodb.net/portfolio-contact?retryWrites=true&w=majority
```

---

## 📧 Production Email Setup

### Gmail App Password
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → 2-Step Verification (enable if needed)
3. Security → App passwords
4. Select Mail & Windows
5. Copy 16-character password

### Nodemailer Alternative: SendGrid
```javascript
// Modify config/email.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, html) => {
  return sgMail.send({
    to,
    from: process.env.EMAIL_FROM,
    subject,
    html,
  });
};
```

**Add to .env:**
```
SENDGRID_API_KEY=your_api_key
EMAIL_FROM=noreply@yoursite.com
```

---

## 📱 Twilio Production Setup

### Account Verification
1. Verify phone number
2. Verify email
3. Enable production capabilities

### Production Phone Numbers
- Free tier: Twilio number (limited rates)
- Paid: Get dedicated number for better reputation

### SMS Rates
- Typically $0.0075 per SMS in US
- Sign up for auto-recharge to avoid failures

### WhatsApp Business
- Requires business verification
- Better for marketing, optional for alerts

---

## 🔐 Production Security Checklist

### Environment Variables
- [ ] All secrets in `.env` (never committed)
- [ ] Use strong, unique passwords
- [ ] Rotate credentials periodically
- [ ] Use `.env.example` for documentation

### Database Security
- [ ] IP whitelist in MongoDB Atlas
- [ ] Strong database password
- [ ] Regular backups enabled
- [ ] Encryption at rest enabled

### API Security
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Rate limiting configured
- [ ] CORS restricted to frontend domain
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak info

### Authentication
- [ ] Add admin authentication (JWT recommended)
- [ ] Protect sensitive endpoints
- [ ] Log access attempts
- [ ] Use secure session management

---

## 🚨 Error Monitoring

### Sentry Integration (Error Tracking)

```bash
npm install @sentry/node
```

**In server.js:**
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: process.env.SENTRY_DSN, });

app.use(Sentry.Handlers.errorHandler());
```

**In .env:**
```
SENTRY_DSN=https://your-sentry-dsn@sentry.io
```

### Google Cloud Logging

```javascript
// Automatic with GCP deployment
console.log('message'); // Auto-captured
```

---

## 📊 Performance Optimization

### 1. Database Indexing
```javascript
// In Message model
messageSchema.index({ email: 1 });
messageSchema.index({ createdAt: -1 });
```

### 2. Caching
```javascript
// Add Redis for caching
import redis from 'redis';
const client = redis.createClient();
```

### 3. CDN for Static Files
- Add static folder for files
- Use CloudFront or Cloudflare

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## 📈 Monitoring Checklist

### Log Monitoring
- [ ] Monitor API response times
- [ ] Track error rates
- [ ] Alert on high error count
- [ ] Log all important events

### Uptime Monitoring
- [ ] Use UptimeRobot (free)
- [ ] Monitor `/api/health` endpoint
- [ ] Get alerts on downtime
- [ ] Test endpoints periodically

### Performance Monitoring
- [ ] Track API latency
- [ ] Monitor database query times
- [ ] Track email delivery
- [ ] Monitor SMS costs

---

## 💰 Cost Estimation

### Monthly Production Costs

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| Render | Limited free | $7/month |
| MongoDB Atlas | 512MB | Free (sufficient) |
| Email (Gmail) | Unlimited* | Free |
| Twilio SMS | $1 credit | $0.01-0.02/SMS |
| Monitoring | Limited free | Free - $20/month |
| **Total** | | **~$10-20/month** |

*Gmail has sending limits (~500/day free account, 10k+/day business)

---

## 🆘 Rollback Procedure

### If Deployment Fails

**Render:**
```
Dashboard → Deploys → Select previous version → Revert
```

**Heroku:**
```bash
heroku releases               # List releases
heroku rollback v123          # Rollback to specific
```

**Manual:**
- Git revert problematic commit
- Re-deploy

---

## 📞 Support & Troubleshooting

### Common Issues

**502 Bad Gateway**
- Check server logs
- Verify environment variables
- Check database connection

**Email Not Sending**
- Verify credentials
- Check email quotas
- Log email service errors

**High Latency**
- Check database performance
- Monitor server resources
- Consider server upgrade

**CORS Errors**
- Verify FRONTEND_URL
- Check request headers
- Allow credentials if needed

---

## 🎯 Post-Deployment

1. ✅ Test all endpoints
2. ✅ Monitor logs
3. ✅ Set up error tracking
4. ✅ Configure backups
5. ✅ Set up monitoring
6. ✅ Document deployment steps
7. ✅ Plan scaling strategy
8. ✅ Schedule security audits

---

## 📚 Deployment Recipes

### Quick Deploy to Render
```bash
git add .
git commit -m "Ready for production"
git push origin main
# Render auto-deploys, add env vars in dashboard
```

### Docker Deployment
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

```bash
docker build -t portfolio-api .
docker run -p 5000:5000 -e MONGODB_URI=... portfolio-api
```

---

## 🔐 Security Credentials Checklist

Before deploying, ensure you have:
- ✅ MongoDB URI
- ✅ Gmail email & app password
- ✅ Twilio Account SID & Auth Token
- ✅ Twilio phone number
- ✅ Frontend URL
- ✅ Admin email

**NEVER commit these to git!**

---

**Ready to deploy? Follow the Quick Start guide first, then choose your platform above.** 🚀
