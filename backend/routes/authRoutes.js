const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.post('/admin/login', authController.adminLogin);
router.get('/users', authenticateToken, authController.getAllUsers);
router.get('/users/:id', authenticateToken, authController.getUserById);

module.exports = router; 