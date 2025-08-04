const db = require('../db/connection');

const createUser = async (name, email, hashedPassword, otp) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, email, password, otp, is_verified) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashedPassword, otp, 0]
  );
  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

const findAllUsers = async () => {
  const [rows] = await db.execute('SELECT id, name, email, is_verified FROM users');
  return rows;
};

const updateUserOtp = async (email, otp) => {
  await db.execute('UPDATE users SET otp = ? WHERE email = ?', [otp, email]);
};

const verifyUserOtp = async (email) => {
  await db.execute('UPDATE users SET is_verified = 1, otp = NULL WHERE email = ?', [email]);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findAllUsers,
  updateUserOtp,
  verifyUserOtp,
}; 