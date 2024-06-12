const pool = require('../config/db.config');

exports.createUser = async (user) => {
  const { userId, deviceId, name, phone, availCoins, password } = user;
  const sql = `INSERT INTO users (userId, deviceId, name, phone, availCoins, password)
               VALUES (?, ?, ?, ?, ?, ?)`;
  await pool.execute(sql, [userId, deviceId, name, phone, availCoins, password]);
};

exports.getUserById = async (userId) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE userId = ?', [userId]);
  return rows[0];
};
