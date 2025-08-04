const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const authenticateToken = require('../middleware/authMiddleware');
// Then include `mood` in your INSERT query


// Apply authentication middleware to all journal routes
router.use(authenticateToken);

// Journal CRUD routes
router.post('/', journalController.createJournal);
router.get('/', journalController.getAllJournals);
router.get('/:id', journalController.getJournalById);
router.put('/:id', journalController.updateJournal);
router.delete('/:id', journalController.deleteJournal);
router.patch('/:id/pin', journalController.togglePinJournal);

module.exports = router; 