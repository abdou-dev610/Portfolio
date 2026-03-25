# Portfolio Contact Backend API

Professional Node.js/Express backend for portfolio contact form with email notifications, SMS alerts, and message management.

## Features

✅ **Contact Form Submission**
- Validates form data (name, email, subject, message)
- Stores messages in MongoDB
- Automatic email notifications to admin
- Auto-reply emails to clients

✅ **Notifications**
- Email notifications using Nodemailer
- SMS notifications via Twilio
- WhatsApp message support (optional)
- Professional HTML email templates

✅ **Admin Features**
- View all contact messages
- Reply to messages with email delivery
- Mark messages as read/replied
- Delete messages
- Message statistics

✅ **Security & Performance**
- CORS protection
- Helmet.js security headers
- Rate limiting to prevent spam
- Input validation and sanitization
- Async/await error handling

✅ **Best Practices**
- MVC architecture
- Separation of concerns
- Environment variable configuration
- Professional error handling
- Scalable structure

## Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Email**: Nodemailer (Gmail/SMTP)
- **SMS**: Twilio API
- **Security**: Helmet.js, CORS, Rate Limiting

## Installation

### 1. Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account or local MongoDB
- Gmail account with app-specific password
- Twilio account (for SMS/WhatsApp)

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Environment Variables
Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio-contact

# Server
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
ADMIN_EMAIL=ndiayeabdoumamesaye1234@gmail.com

# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Frontend
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=5
```

### 4. Start the Server

**Development (with hot reload)**
```bash
npm run dev
```

**Production**
```bash
npm start
```

## API Endpoints

### Public Endpoints

#### 1. Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in your services...",
  "phone": "+1234567890" (optional)
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message submitted successfully. We will get back to you soon!",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "timestamp": "2024-03-18T10:30:00Z"
  }
}
```

#### 2. Health Check
```
GET /api/health
```

### Admin Endpoints

#### 1. Get All Messages
```
GET /api/messages
Headers: x-admin-key: your-admin-key
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 10,
      "new": 3,
      "read": 5,
      "replied": 2
    },
    "messages": [...]
  }
}
```

#### 2. Get Single Message
```
GET /api/messages/:id
```

#### 3. Reply to Message
```
POST /api/reply/:id
Content-Type: application/json

{
  "reply": "Thank you for your inquiry. I'll get back to you shortly."
}
```

#### 4. Update Message Status
```
PATCH /api/messages/:id/status
Content-Type: application/json

{
  "status": "read" // or "new", "replied"
}
```

#### 5. Delete Message
```
DELETE /api/messages/:id
```

## Email Configuration

### Gmail Setup

1. Enable 2-Step Verification in Google Account
2. Generate App Password:
   - Go to Google Account > Security
   - Select your device and app (Mail, Windows)
   - Copy the generated 16-character password
   - Use this as `EMAIL_PASS`

### Nodemailer with Custom SMTP
```javascript
// Modify config/email.js if using different SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Twilio Setup

### SMS Configuration
1. Sign up at [Twilio](https://www.twilio.com)
2. Get your Account SID and Auth Token
3. Buy a phone number
4. Set in `.env`:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER` (your Twilio number)

### WhatsApp Configuration (Optional)
1. Set up WhatsApp Sandbox in Twilio Console
2. Set `TWILIO_WHATSAPP_NUMBER` in `.env`
3. The system will attempt WhatsApp delivery if configured

## Database Schema

### Message Model
```javascript
{
  name: String (required),
  email: String (required, validated),
  subject: String (required, 5-100 chars),
  message: String (required, 10-5000 chars),
  phone: String (optional),
  status: String (new/read/replied, default: new),
  reply: String (admin reply content),
  repliedAt: Date,
  emailSent: Boolean (default: false),
  smsSent: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development mode only)"
}
```

## Rate Limiting

- Contact endpoint: Limited to 5 requests per 15 minutes per IP
- Prevents spam and abuse
- Returns 429 Too Many Requests when limit exceeded

## Security Features

✅ **Helmet.js**: Security headers protection
✅ **CORS**: Restricted to frontend URL only
✅ **Rate Limiting**: Prevents brute force attacks
✅ **Input Validation**: All inputs validated
✅ **Error Handling**: Secure error messages
✅ **Environment Variables**: Credentials never hardcoded
✅ **HTTPS Ready**: Works with HTTPS in production

## Frontend Integration

### React Example
```javascript
const handleSubmit = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (data.success) {
      // Show success message
      toast.success('Message sent successfully!');
    } else {
      // Show error
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Failed to send message');
  }
};
```

## Deployment

### Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set ENV_VAR_NAME=value
```

### MongoDB Atlas Connection
```
mongodb+srv://username:password@cluster0.mongodb.net/portfolio-contact?retryWrites=true&w=majority
```

### Environment on Production
- Set `NODE_ENV=production`
- Use strong, unique passwords
- Enable HTTPS
- Use environment variable management in hosting platform

## Testing

Test the API using Postman, cURL, or Thunder Client:

```bash
# Test contact submission
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message with enough content"
  }'

# Test health endpoint
curl http://localhost:5000/api/health
```

## File Structure

```
backend/
├── config/
│   ├── database.js       # MongoDB connection
│   ├── email.js          # Nodemailer setup
│   └── twilio.js         # Twilio client
├── controllers/
│   └── contactController.js    # Business logic
├── models/
│   └── Message.js        # MongoDB schema
├── routes/
│   └── contactRoutes.js  # API routes
├── services/
│   ├── emailService.js   # Email templates & sending
│   └── smsService.js     # SMS & WhatsApp sending
├── middleware/
│   └── validation.js     # Input validation & error handling
├── .env.example          # Environment template
├── server.js             # Entry point
└── package.json          # Dependencies
```

## Troubleshooting

### MongoDB Connection Error
- Check connection string in `.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure network connectivity

### Email Not Sending
- Verify Gmail app password (not regular password)
- Check 2-Step Verification is enabled
- Verify `EMAIL_USER` matches Gmail account
- Check email provider doesn't block automation

### SMS Not Sending
- Verify Twilio credentials
- Ensure you have credits/active account
- Check phone number format: +[country][number]
- Verify receiver has SMS capability

### CORS Issues
- Check `FRONTEND_URL` matches your frontend
- Ensure credentials: true is set if needed
- Check headers are included in requests

## Support & Contributing

For issues or improvements, please check:
1. MongoDB connection
2. Environment variables
3. Email/SMS credentials
4. Application logs

## License

MIT License - Feel free to use this backend in your projects!

## Next Steps

1. Set up MongoDB Atlas account
2. Configure Gmail app password
3. Set up Twilio account
4. Fill in all `.env` variables
5. Run `npm install`
6. Start with `npm run dev`
7. Test with Postman or cURL
8. Connect to your React frontend
9. Deploy to production!

---

**Happy coding! 🚀**
