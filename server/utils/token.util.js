const crypto = require('crypto');

exports.generateInvitationToken = (roomId) => {
  return crypto.createHash('sha256').update(`${roomId}-${Date.now()}`).digest('hex');
};
