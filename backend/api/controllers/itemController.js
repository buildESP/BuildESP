// controllers/itemController.js

const { Item, User, Subcategory } = require('../models/associations');

// Create item
exports.createItem = async (req, res) => {
  try {
    const { user_id, subcategory_id, name, description, picture, status } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subcategory = await Subcategory.findByPk(subcategory_id);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const newItem = await Item.create({
      user_id,
      subcategory_id,
      name,
      description,
      picture,
      status,
    });

    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during item creation' });
  }
};

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Subcategory, as: 'subcategory' },
      ],
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during getting items' });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.item_id;
    const item = await Item.findByPk(itemId, {
      include: [
        { model: User, as: 'user' },
        { model: Subcategory, as: 'subcategory' },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during fetching item' });
  }
};

// Update item by ID
exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.item_id;
    const { user_id, subcategory_id, name, description, picture, status } = req.body;

    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    
    const subcategory = await Subcategory.findByPk(subcategory_id);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    await updateEntityImage(item, req.body.picture);
    
    await item.update({
      user_id,
      subcategory_id,
      name,
      description,
      picture,
      status,
    });

    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during item update' });
  }
};

// Delete item by ID
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.item_id;
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.destroy();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during item deletion' });
  }
};
