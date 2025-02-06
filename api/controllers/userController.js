// controllers/userController.js

const { User } = require('../models/associations');

// Create user
exports.createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      address,
      postcode,
      phone,
      rating,
      picture,
      is_admin,
    } = req.body;

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      address,
      postcode,
      phone,
      rating,
      picture,
      is_admin,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
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
    res.status(500).json({ error: 'Error during getting users' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.user_id;
    console.log(userId);
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during fetching user' });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const {
      firstname,
      lastname,
      email,
      password,
      address,
      postcode,
      phone,
      rating,
      picture,
      is_admin,
    } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      firstname,
      lastname,
      email,
      password,
      address,
      postcode,
      phone,
      rating,
      picture,
      is_admin,
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during user update' });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during user deletion' });
  }
};
