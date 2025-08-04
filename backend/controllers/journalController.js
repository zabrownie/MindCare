const Journal = require('../models/Journal');

const createJournal = async (req, res) => {
  const { title, content, mood } = req.body;
  const userId = req.user.id;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const result = await Journal.createJournal(userId, title, content, mood);
    res.status(201).json({
      message: 'Journal created successfully',
      journalId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create journal', error: err.message });
  }
};

const getAllJournals = async (req, res) => {
  const userId = req.user.id;

  try {
    const journals = await Journal.findJournalsByUser(userId);
    res.json({ journals });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch journals', error: err.message });
  }
};

const getJournalById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const journal = await Journal.findJournalById(id, userId);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.json({ journal });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch journal', error: err.message });
  }
};

const updateJournal = async (req, res) => {
  const { id } = req.params;
  const { title, content, mood } = req.body;
  const userId = req.user.id;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const journal = await Journal.findJournalById(id, userId);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    await Journal.updateJournal(id, userId, title, content, mood);
    res.json({ message: 'Journal updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update journal', error: err.message });
  }
};

const deleteJournal = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const journal = await Journal.findJournalById(id, userId);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    await Journal.deleteJournal(id, userId);
    res.json({ message: 'Journal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete journal', error: err.message });
  }
};

const togglePinJournal = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const journal = await Journal.findJournalById(id, userId);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    await Journal.togglePinJournal(id, userId);
    res.json({ message: 'Journal pin status toggled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle pin status', error: err.message });
  }
};

module.exports = {
  createJournal,
  getAllJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  togglePinJournal,
};
