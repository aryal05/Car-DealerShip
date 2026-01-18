import express from 'express';
import {
  createMessage,
  getAllMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage
} from '../controllers/contactController.js';

const router = express.Router();

// Public route - anyone can submit a contact message
router.post('/messages', createMessage);

// Admin routes - require authentication (add auth middleware if you have one)
router.get('/admin/messages', getAllMessages);
router.get('/admin/messages/:id', getMessage);
router.put('/admin/messages/:id/status', updateMessageStatus);
router.delete('/admin/messages/:id', deleteMessage);

export default router;
