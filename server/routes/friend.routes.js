const express = require('express');
const friendController = require('../controllers/friend.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/friend-requests', authMiddleware, friendController.sendFriendRequest);

module.exports = router;
