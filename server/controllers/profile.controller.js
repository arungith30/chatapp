const userService = require('../services/profile.service');

exports.getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
