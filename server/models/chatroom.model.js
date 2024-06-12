const pool = require('../config/db.config');

exports.createChatRoom = async (room) => {
  const { roomName, creatorId, roomPassword } = room;
  const sql = `INSERT INTO chatrooms (roomName, creatorId, roomPassword)
               VALUES (?, ?, ?)`;
  await pool.execute(sql, [roomName, creatorId, roomPassword]);
};

exports.getChatRoomById = async (roomId) => {
  const [rows] = await pool.execute('SELECT * FROM chatrooms WHERE roomId = ?', [roomId]);
  return rows[0];
};
