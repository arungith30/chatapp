const express = require('express');
const profileController = require('../controllers/profile.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/profile/:userId', authMiddleware, profileController.getProfile);

module.exports = router;
