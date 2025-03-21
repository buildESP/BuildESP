// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/associations');
const JWT_SECRET = process.env.JWT_SECRET;
const crypto = require('crypto');
const { sendResetEmail } = require('../utils/emailService');
const { Op } = require('sequelize');

exports.generateAccessToken = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Login and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email: login } });

    if (!user) {
      return res.status(401).json({ message: 'No Email found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = { id: user.id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { login } = req.body;

  if (!login) {
    return res.status(400).json({ message: 'Email is required (login field in body)' });
  }

  try {
    const user = await User.findOne({ where: { email: login } });

    if (!user)
      return res.status(404).json({ message: 'No user found with this email login' });

    const reset_token = crypto.randomBytes(32).toString('hex');
    const reset_token_expiry = Date.now() + 3600000;

    await user.update({
      reset_token,
      reset_token_expiry,
    });

    res.json({ message: 'Password reset link will be sent shortly' });

    setImmediate(async () => {
      try {
        await sendResetEmail(user.email, reset_token, user.firstname);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
    }

    try {
        const user = await User.findOne({ 
            where: { reset_token: token, reset_token_expiry: { [Op.gt]: Date.now() } } 
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await user.update({ password: newPassword, reset_token: null, reset_token_expiry: null });

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
