const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/auth.service');
const { validationResult } = require('express-validator');
const secretKey = 'your_secret_key';

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, deviceId, name, phone, availCoins, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await userService.createUser({ userId, deviceId, name, phone, availCoins, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.userId, isPrime: user.isPrime }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
