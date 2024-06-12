const bcrypt = require('bcryptjs');
const chatService = require('../services/chat.service');
const tokenUtil = require('../utils/token.util');

exports.createChatRoom = async (req, res) => {
  if (!req.user.isPrime) {
    return res.status(403).json({ message: 'Only prime members can create chat rooms' });
  }

  const { roomName, roomPassword } = req.body;
  const hashedPassword = await bcrypt.hash(roomPassword, 10);

  try {
    await chatService.createChatRoom({ roomName, creatorId: req.user.userId, roomPassword: hashedPassword });
    res.status(201).json({ message: 'Chat room created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.inviteToChatRoom = async (req, res) => {
  const { roomId } = req.body;

  try {
    const invitationToken = tokenUtil.generateInvitationToken(roomId);
    // Store or send the invitation token to the invitee
    res.json({ invitationToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinChatRoom = async (req, res) => {
    const { roomId, invitationToken } = req.body;
  
    try {
      const room = await chatService.getChatRoomById(roomId);
      if (!room) {
        return res.status(404).json({ message: 'Chat room not found' });
      }
  
      const isPrime = req.user.isPrime;
  
      if (!isPrime) {
        const user = await userService.getUserById(req.user.userId);
        if (user.availCoins < 150) {
          return res.status(403).json({ message: 'Not enough coins to join another room' });
        }
        // Deduct coins logic here
      }
  
      // Join room logic here
      res.json({ message: 'Joined chat room successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
