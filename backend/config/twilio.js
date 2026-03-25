import twilio from 'twilio';

let twilioClient = null;

// Only initialize Twilio if credentials are provided
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
} else {
  console.warn('⚠️  Twilio credentials not configured. SMS/WhatsApp notifications will be disabled.');
}

export default twilioClient;
