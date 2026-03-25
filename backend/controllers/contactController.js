import Message from '../models/Message.js';
import { sendContactNotificationEmail, sendAutoReplyEmail, sendReplyEmail } from '../services/emailService.js';
import { sendSMSNotification, sendWhatsAppNotification } from '../services/smsService.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    // Create new message document
    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      phone: phone || null,
    });

    // Save to database
    await newMessage.save();

    try {
      // Send notification email to admin
      await sendContactNotificationEmail({ name, email, subject, message });
      newMessage.emailSent = true;
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      newMessage.emailSent = false;
    }

    try {
      // Send auto-reply to client
      await sendAutoReplyEmail(email, name);
    } catch (autoReplyError) {
      console.error('Failed to send auto-reply:', autoReplyError);
    }

    try {
      // Send SMS notification
      if (process.env.TWILIO_PHONE_NUMBER) {
        await sendSMSNotification(process.env.TWILIO_PHONE_NUMBER, name, email);
        newMessage.smsSent = true;
      }
    } catch (smsError) {
      console.error('Failed to send SMS:', smsError);
      newMessage.smsSent = false;
    }

    // Save updated status
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message submitted successfully. We will get back to you soon!',
      data: {
        id: newMessage._id,
        timestamp: newMessage.createdAt,
      },
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    // Check if admin (you can add proper auth later)
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access',
      });
    }

    const messages = await Message.find().sort({ createdAt: -1 });

    const stats = {
      total: messages.length,
      new: messages.filter(m => m.status === 'new').length,
      read: messages.filter(m => m.status === 'read').length,
      replied: messages.filter(m => m.status === 'replied').length,
    };

    res.status(200).json({
      success: true,
      data: {
        stats,
        messages,
      },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    // Mark as read
    message.status = 'read';
    await message.save();

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Reply message cannot be empty',
      });
    }

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    try {
      // Send reply email to client
      await sendReplyEmail(message.email, message.name, reply);
    } catch (emailError) {
      console.error('Failed to send reply email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send reply email',
        error: process.env.NODE_ENV === 'development' ? emailError.message : undefined,
      });
    }

    // Update message with reply
    message.reply = reply;
    message.status = 'replied';
    message.repliedAt = new Date();
    await message.save();

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      data: message,
    });
  } catch (error) {
    console.error('Error replying to message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reply to message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const message = await Message.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: message,
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update message status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
