// controllers/userController.js

const User = require('../models/User');

// Create user
exports.createUser = async (req, res) => {
  try {
    const { name, firstname, email, password, address, postcode, phone, rating, picture, isAdmin } = req.body;

    const newUser = await User.create({
      name,
      firstname,
      email,
      password,
      address,
      postcode,
      phone,
      rating,
      picture,
      isAdmin,
    });

    res.status(201).json({ message: 'User creation success', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during user creation' });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error for during getting user' });
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id_utilisateur;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during get single user' });
  }
};

// Update user by id
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id_utilisateur;
    const { name, prénom, email, password, address, postcode, phone, rating, picture, isAdmin } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      name,
      prénom,
      email,
      password,
      address,
      postcode,
      phone,
      rating,
      picture,
      isAdmin,
    });

    res.status(200).json({ message: 'User update successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during user update' });
  }
};

// Delete user by id
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id_utilisateur;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User delete successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during user deletion' });
  }
};
