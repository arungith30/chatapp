const friendService = require('../services/friend.service');

exports.sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    await friendService.sendFriendRequest(userId, friendId);
    res.status(201).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
