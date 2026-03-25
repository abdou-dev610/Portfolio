
# 🚀 Backend Setup - Quick Start Guide

## ✅ Backend Created Successfully!

Your complete portfolio contact backend is ready to use. Here's what was created:

### 📁 Project Structure
```
backend/
├── config/           # Configuration files
│   ├── database.js   # MongoDB connection
│   ├── email.js      # Nodemailer setup
│   └── twilio.js     # Twilio client
├── models/           # Database schemas
│   └── Message.js    # Contact messages
├── controllers/      # Business logic
│   └── contactController.js
├── routes/           # API endpoints
│   └── contactRoutes.js
├── services/         # External services
│   ├── emailService.js
│   └── smsService.js
├── middleware/       # Request handlers
│   └── validation.js
├── server.js         # Main server file
├── package.json      # Dependencies
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
├── README.md         # Full documentation
└── REACT_INTEGRATION.md  # Frontend examples
```

---

## 🔧 Step 1: Install Dependencies

```bash
cd backend
npm install
```

This installs:
- **express** - Web framework
- **mongoose** - MongoDB ORM
- **nodemailer** - Email service
- **twilio** - SMS/WhatsApp service
- **cors** - Cross-origin requests
- **helmet** - Security headers
- **express-rate-limit** - Anti-spam

---

## 📋 Step 2: Configure Environment Variables

Create a `.env` file in the `backend/` folder:

```bash
cp .env.example .env
```

Then fill in your credentials:

### MongoDB Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/portfolio-contact`
5. Add to `.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio-contact?retryWrites=true&w=majority
```

### Gmail Setup (Email Notifications)
1. Go to [Google Account](https://myaccount.google.com/)
2. Select **Security** from left menu
3. Enable **2-Step Verification**
4. Create **App Password**:
   - Go to App passwords
   - Select Mail & Windows
   - Copy 16-character password
5. Add to `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
ADMIN_EMAIL=ndiayeabdoumamesaye1234@gmail.com
```

### Twilio Setup (SMS Notifications)
1. Sign up at [Twilio](https://www.twilio.com)
2. Get **Account SID** & **Auth Token** from dashboard
3. Buy a phone number
4. Add to `.env`:
```
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### Frontend URL
```
FRONTEND_URL=http://localhost:5173
```

---

## ▶️ Step 3: Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════════════╗
║  Portfolio Contact API Server                      ║
║  🚀 Server running on port 5000                   ║
║  📧 Email: your-email@gmail.com                   ║
║  📱 Twilio: +1234567890                           ║
║  🗄️  Database: development mode                   ║
╚════════════════════════════════════════════════════╝
```

---

## 🧪 Step 4: Test the API

### Test with cURL
```bash
# Health check
curl http://localhost:5000/api/health

# Send contact message
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Project",
    "message": "This is a test message with enough content to validate."
  }'
```

### Test with Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Create new request:
   - Method: `POST`
   - URL: `http://localhost:5000/api/contact`
   - Body (JSON):
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "subject": "Test Subject",
     "message": "This is a test message with more than 10 characters"
   }
   ```
3. Send request

---

## 🎯 Step 5: Connect React Frontend

### Install Axios (optional)
```bash
npm install axios
```

### Update Contact Form Component
See `REACT_INTEGRATION.md` for complete React example with:
- Form handling
- API integration
- Error handling
- Loading states
- Success/error messages

### Quick Example:
```javascript
const API_URL = 'http://localhost:5000/api';

const response = await fetch(`${API_URL}/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

const data = await response.json();
if (data.success) {
  console.log('✅ Message sent!');
}
```

---

## 📧 Email Features

✅ **Admin Notifications**
- New contact received
- HTML formatted email
- Sender's email in reply-to

✅ **Auto-Reply to Client**
- Automatic acknowledgment
- Professional template
- Sent immediately

✅ **Admin Reply System**
- Send reply to client
- Email delivered automatically
- Message marked as "replied"

---

## 📱 SMS Features

✅ **SMS Notifications**
- Alert about new contact
- Includes sender info
- Goes to `TWILIO_PHONE_NUMBER`

✅ **WhatsApp Notifications** (Optional)
- Same as SMS but via WhatsApp
- Requires `TWILIO_WHATSAPP_NUMBER`
- Gracefully skips if not configured

---

## 🛡️ Security Features

✅ **Rate Limiting**
- 5 requests per 15 minutes per IP
- Prevents spam

✅ **Input Validation**
- Name: 2+ characters
- Email: Valid format
- Subject: 5-100 characters
- Message: 10-5000 characters

✅ **Security Headers**
- Helmet.js protection
- CORS validation
- XSS prevention

✅ **Error Handling**
- Graceful error messages
- No sensitive info exposed
- Development mode debugging

---

## 📊 Database

### Message Status Flow
```
new → read → replied
```

### Message Fields
- `name` - Sender's name
- `email` - Sender's email
- `subject` - Message subject
- `message` - Full message
- `phone` - Optional phone number
- `status` - new/read/replied
- `reply` - Admin's reply
- `emailSent` - Notification sent?
- `smsSent` - SMS sent?
- `createdAt` - Timestamp
- `updatedAt` - Last update

---

## 🔑 API Endpoints Reference

### Public
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Server health check

### Admin (requires setup)
- `GET /api/messages` - All messages
- `GET /api/messages/:id` - Single message
- `POST /api/reply/:id` - Send reply
- `PATCH /api/messages/:id/status` - Update status
- `DELETE /api/messages/:id` - Delete message

---

## 🐛 Troubleshooting

### MongoDB not connecting?
```
❌ Check MONGODB_URI is correct
❌ Check IP whitelist in MongoDB Atlas
❌ Verify internet connection
```

### Emails not sending?
```
❌ Gmail: Use app-specific password, not regular password
❌ Enable 2-Step Verification first
❌ Check EMAIL_USER matches your Gmail
```

### SMS not sending?
```
❌ Verify Twilio Account SID & Auth Token
❌ Verify phone number format: +[country][number]
❌ Check Twilio account has credits
```

### CORS errors?
```
❌ Check FRONTEND_URL matches your frontend
❌ Ensure frontend is running on correct port
```

---

## 📚 Documentation Files

- **README.md** - Full documentation with all details
- **REACT_INTEGRATION.md** - React component examples
- **.env.example** - Environment variable template

---

## 🚀 Production Deployment

### Heroku
```bash
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set EMAIL_USER=your_email
# ... set all other env vars
git push heroku main
```

### Vercel/Netlify (for frontend only)
- Deploy React app normally
- Update `VITE_API_URL` to point to backend

### VPS/Cloud Server
- Install Node.js
- Clone repo
- Create `.env` with production credentials
- Run `npm install && npm start`
- Use PM2 for process management
- Set up Nginx reverse proxy

---

## 📝 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Create `.env` file with credentials
3. ✅ Start server: `npm run dev`
4. ✅ Test with cURL or Postman
5. ✅ Connect React frontend
6. ✅ Customize email templates (optional)
7. ✅ Deploy to production

---

## 🎉 You're All Set!

Your backend is ready to receive and manage contact messages professionally.

### What You Have:
✅ Express API server
✅ MongoDB integration
✅ Email notifications (Gmail)
✅ SMS alerts (Twilio)
✅ WhatsApp support (optional)
✅ Admin message management
✅ Rate limiting & security
✅ Professional error handling
✅ MVC architecture

### What It Does:
✅ Receives contact forms
✅ Stores in database
✅ Sends admin notification
✅ Sends auto-reply to client
✅ Sends SMS alert
✅ Allows admin replies
✅ Prevents spam

---

## 💡 Pro Tips

1. **Local Testing**: Use `http://localhost:5000`
2. **Postman Collections**: Save your requests for reuse
3. **Email Templates**: Customize in `services/emailService.js`
4. **Rate Limiting**: Adjust in `server.js` if needed
5. **Database Backup**: Regular MongoDB backups
6. **Monitoring**: Log errors with proper timestamps
7. **HTTPS**: Use in production always

---

**Happy building! 🚀**

For detailed documentation, see **README.md**
For React examples, see **REACT_INTEGRATION.md**

Questions? Check troubleshooting section or review the code comments.
