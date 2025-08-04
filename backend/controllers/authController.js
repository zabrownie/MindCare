const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');
const { generateOtp, sendOtpEmail } = require('../utils/otpUtil');

// Validation Schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const otpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required()
});

// Register Controller
const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { name, email, password } = value;
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ success: false, message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    await User.createUser(name, email, hashedPassword, otp);
    await sendOtpEmail(email, otp);

    res.status(201).json({ success: true, message: 'User registered. OTP sent to email.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};

// OTP Verification
const verifyOtp = async (req, res) => {
  try {
    const { error, value } = otpSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { email, otp } = value;
    const user = await User.findUserByEmail(email);
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });

    await User.verifyUserOtp(email);
    res.json({ success: true, message: 'Account verified. You can now log in.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'OTP verification failed', error: err.message });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { email, password } = value;
    const user = await User.findUserByEmail(email);
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });
    if (!user.is_verified) return res.status(403).json({ success: false, message: 'Account not verified' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { email, password } = value;
    const user = await User.findUserByEmail(email);
    if (!user || !user.is_admin) {
      return res.status(403).json({ success: false, message: 'Not an admin user' });
    }
    if (!user.is_verified) {
      return res.status(403).json({ success: false, message: 'Account not verified' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: true },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: true
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Admin login failed', error: err.message });
  }
};

// User Fetchers
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findUserById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get user', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAllUsers();
    res.json({
      success: true,
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get users', error: err.message });
  }
};

module.exports = {
  register,
  verifyOtp,
  login,
  adminLogin,
  getUserById,
  getAllUsers
};
