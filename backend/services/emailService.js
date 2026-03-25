import transporter from '../config/email.js';

export const sendContactNotificationEmail = async (contactData) => {
  try {
    const { name, email, subject, message } = contactData;

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .header { background-color: #14b8a6; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #14b8a6; }
            .footer { background-color: #14b8a6; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div>${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div>${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div style="background-color: white; padding: 10px; border-left: 3px solid #14b8a6;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated email. Please reply directly to the sender's email address.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      html: htmlContent,
      replyTo: email,
    });

    return { success: true, message: 'Admin notification sent' };
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw new Error('Failed to send notification email');
  }
};

export const sendAutoReplyEmail = async (clientEmail, clientName) => {
  try {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .header { background-color: #14b8a6; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { background-color: #14b8a6; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
            .signature { margin-top: 30px; border-top: 2px solid #14b8a6; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Contacting Me</h2>
            </div>
            <div class="content">
              <p>Hi ${clientName},</p>
              <p>Thank you for reaching out! I appreciate you taking the time to contact me.</p>
              <p>I've received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
              <p>If your matter is urgent, feel free to reach out through other channels as well.</p>
              
              <div class="signature">
                <p>Best regards,</p>
                <p><strong>Portfolio Team</strong></p>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated response. Your message is important to us!</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: clientEmail,
      subject: 'Re: Thank you for contacting me',
      html: htmlContent,
    });

    return { success: true, message: 'Auto-reply sent to client' };
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
    throw new Error('Failed to send auto-reply email');
  }
};

export const sendReplyEmail = async (clientEmail, clientName, replyMessage) => {
  try {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .header { background-color: #14b8a6; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { background-color: #14b8a6; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Reply to Your Message</h2>
            </div>
            <div class="content">
              <p>Hi ${clientName},</p>
              <div style="background-color: white; padding: 15px; border-left: 3px solid #14b8a6; margin: 20px 0;">
                ${replyMessage.replace(/\n/g, '<br>')}
              </div>
              <p>Looking forward to our continued communication!</p>
            </div>
            <div class="footer">
              <p>Thank you for being in touch!</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: clientEmail,
      subject: 'Reply to your message',
      html: htmlContent,
    });

    return { success: true, message: 'Reply sent to client' };
  } catch (error) {
    console.error('Error sending reply email:', error);
    throw new Error('Failed to send reply email');
  }
};
