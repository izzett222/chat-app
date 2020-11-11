import express from 'express';
import joinChatController from '../controllers/chatController';
import protect from '../middleware/protectRoute';

const router = express.Router();

router.get('/join/:userName', protect, joinChatController);

export default router;
