import twilioClient from '../config/twilio.js';

export const sendSMSNotification = async (phoneNumber, name, email) => {
  try {
    if (!twilioClient) {
      console.warn('Twilio not configured, SMS notification skipped');
      return { success: false, message: 'Twilio not configured' };
    }

    if (!phoneNumber) {
      return { success: false, message: 'Phone number not provided' };
    }

    const message = await twilioClient.messages.create({
      body: `New contact from ${name} (${email}). Check your email for details.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log(`SMS sent with SID: ${message.sid}`);
    return { success: true, message: 'SMS notification sent', sid: message.sid };
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS notification');
  }
};

export const sendWhatsAppNotification = async (phoneNumber, name, email) => {
  try {
    if (!twilioClient) {
      console.warn('Twilio not configured, WhatsApp notification skipped');
      return { success: false, message: 'Twilio not configured' };
    }

    if (!phoneNumber || !process.env.TWILIO_WHATSAPP_NUMBER) {
      return { success: false, message: 'Phone number or WhatsApp config not provided' };
    }

    // Format phone number for WhatsApp
    const whatsappPhone = `whatsapp:${phoneNumber}`;

    const message = await twilioClient.messages.create({
      body: `📩 New contact message from ${name}\n\nEmail: ${email}\n\nCheck your inbox for full details.`,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: whatsappPhone,
    });

    console.log(`WhatsApp message sent with SID: ${message.sid}`);
    return { success: true, message: 'WhatsApp notification sent', sid: message.sid };
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    // Don't throw, as WhatsApp is optional
    console.log('WhatsApp notification skipped - check configuration');
    return { success: false, message: 'WhatsApp notification skipped' };
  }
};
