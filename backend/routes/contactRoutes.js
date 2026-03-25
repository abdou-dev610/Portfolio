import express from 'express';
import { validateContactForm } from '../middleware/validation.js';
import {
  submitContact,
  getAllMessages,
  getMessageById,
  replyToMessage,
  deleteMessage,
  updateMessageStatus,
} from '../controllers/contactController.js';

const router = express.Router();

// Public endpoints
router.post('/contact', validateContactForm, submitContact);

// Admin endpoints (require authentication)
router.get('/messages', getAllMessages);
router.get('/messages/:id', getMessageById);
router.post('/reply/:id', replyToMessage);
router.patch('/messages/:id/status', updateMessageStatus);
router.delete('/messages/:id', deleteMessage);

export default router;
