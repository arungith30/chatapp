const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', [
  check('userId').isInt(),
  check('deviceId').isLength({ min: 5 }),
  check('name').isLength({ min: 2 }),
  check('phone').isMobilePhone(),
  check('password').isLength({ min: 6 })
], authController.register);

router.post('/login', authController.login);

module.exports = router;
