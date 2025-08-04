const db = require('../db/connection');

const createJournal = async (userId, title, content, mood) => {
  const [result] = await db.execute(
    'INSERT INTO journals (user_id, title, content, mood) VALUES (?, ?, ?, ?)',
    [userId, title, content, mood]
  );
  return result;
};


const findJournalsByUser = async (userId) => {
  const [rows] = await db.execute(
    'SELECT * FROM journals WHERE user_id = ? ORDER BY pinned DESC, created_at DESC',
    [userId]
  );
  return rows;
};

const findJournalById = async (journalId, userId) => {
  const [rows] = await db.execute(
    'SELECT * FROM journals WHERE id = ? AND user_id = ?',
    [journalId, userId]
  );
  return rows[0];
};

const updateJournal = async (journalId, userId, title, content, mood) => {
  const [result] = await db.execute(
    'UPDATE journals SET title = ?, content = ?, mood = ? WHERE id = ? AND user_id = ?',
    [title, content, mood, journalId, userId]
  );
  return result;
};

const deleteJournal = async (journalId, userId) => {
  const [result] = await db.execute(
    'DELETE FROM journals WHERE id = ? AND user_id = ?',
    [journalId, userId]
  );
  return result;
};

const togglePinJournal = async (journalId, userId) => {
  const [result] = await db.execute(
    'UPDATE journals SET pinned = NOT pinned WHERE id = ? AND user_id = ?',
    [journalId, userId]
  );
  return result;
};

module.exports = {
  createJournal,
  findJournalsByUser,
  findJournalById,
  updateJournal,
  deleteJournal,
  togglePinJournal,
};
