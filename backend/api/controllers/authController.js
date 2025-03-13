// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/associations');
const JWT_SECRET = process.env.JWT_SECRET;

exports.generateAccessToken = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Login and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email: login } });

    if (!user) {
      return res.status(401).json({ message: 'Aucun Email trouvé' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe Invalide' });
    }

    const payload = { id: user.id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
