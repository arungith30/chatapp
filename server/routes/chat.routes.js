const express = require('express');
const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/chatrooms', authMiddleware, chatController.createChatRoom);
router.post('/invite', authMiddleware, chatController.inviteToChatRoom);
router.post('/joinroom', authMiddleware, chatController.joinChatRoom);

module.exports = router;
