// controllers/userController.js

const { User, Group } = require('../models/associations');
const { updateEntityImage } = require('../utils/imageUtils');

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
      groups, // Groups to associate with user
    } = req.body;

    // Create user
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

    // If groups are provided, associate user with those groups
    if (groups && groups.length > 0) {
      const groupInstances = await Group.findAll({
        where: {
          id: groups, // Find groups by their IDs
        },
      });

      // Associate user with the selected groups
      await newUser.addGroups(groupInstances);
    }

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
      groups, // Groups to update
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await updateEntityImage(user, req.body.picture);


    // Update user fields
    await user.update({
      firstname: firstname || user.firstname,
      lastname: lastname || user.lastname,
      email: email || user.email,
      password: password || user.password,
      address: address || user.address,
      postcode: postcode || user.postcode,
      phone: phone || user.phone,
      rating: rating || user.rating,
      picture: picture || user.picture,
      is_admin: is_admin !== undefined ? is_admin : user.is_admin,
    });

    // Update groups association
    if (groups && groups.length > 0) {
      const groupInstances = await Group.findAll({ where: { id: groups } });

      if (groupInstances.length !== groups.length) {
        return res.status(400).json({ message: 'One or more groups not found' });
      }

      await user.setGroups(groupInstances);
    }

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
