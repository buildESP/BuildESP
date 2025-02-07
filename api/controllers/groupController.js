// controllers/groupController.js

const { Group, User } = require('../models/associations');

// Create a group
exports.createGroup = async (req, res) => {
  try {
    const { name, description, group_admin } = req.body;

    // Check if the admin user exists
    const admin = await User.findByPk(group_admin);
    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    // Create the group
    const newGroup = await Group.create({
      name,
      description,
      group_admin,
    });

    res.status(201).json({ message: 'Group created successfully', group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during group creation' });
  }
};

// Get all groups
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: [
        { model: User, as: 'admin' },
        { model: User, as: 'users' }
      ],
    });
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Error during fetching groups', details: error.message });
  }
};

// Get group by ID
exports.getGroupById = async (req, res) => {
  try {
    const groupId = req.params.group_id;

    const group = await Group.findByPk(groupId, {
      include: [
        { model: User, as: 'admin' },
        { model: User, as: 'users' }
      ],
    });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error('Error fetching group by ID:', error);
    res.status(500).json({ error: 'Error during fetching group', details: error.message });
  }
};

// ✅ Update a group
exports.updateGroup = async (req, res) => {
  try {
    const groupId = req.params.group_id;
    const { name, description, group_admin } = req.body;

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if the admin user exists
    const admin = await User.findByPk(group_admin);
    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    // Update the group
    await group.update({
      name,
      description,
      group_admin,
    });

    res.status(200).json({ message: 'Group updated successfully', group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during group update' });
  }
};

// ✅ Delete a group
exports.deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.group_id;
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    await group.destroy();
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during group deletion' });
  }
};
