const { Item } = require('../models'); // Import des modèles
const { Op } = require('sequelize'); // Opérateur de Sequelize pour les filtres avancés

// Créer un nouvel item
exports.createItem = async (req, res) => {
  try {
    const {
      name,
      description,
      user_id,
      subcategory_id,
      daily_rate,
      deposit,
      max_rental_duration,
      picture,
      status,
    } = req.body;

    // Crée un nouvel item
    const newItem = await Item.create({
      name,
      description,
      user_id,
      subcategory_id,
      daily_rate,
      deposit,
      max_rental_duration,
      picture,
      status,
    });

    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating item' });
  }
};

// Récupérer tous les items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching items' });
  }
};

// Récupérer un item par son ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({
      where: { id },
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching item' });
  }
};

// Mettre à jour un item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      user_id,
      subcategory_id,
      daily_rate,
      deposit,
      max_rental_duration,
      picture,
      status,
    } = req.body;

    // Vérifie si l'item existe
    const item = await Item.findOne({ where: { id } });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Met à jour l'item avec les nouvelles données
    item.name = name || item.name;
    item.description = description || item.description;
    item.user_id = user_id || item.user_id;
    item.subcategory_id = subcategory_id || item.subcategory_id;
    item.daily_rate = daily_rate || item.daily_rate;
    item.deposit = deposit || item.deposit;
    item.max_rental_duration = max_rental_duration || item.max_rental_duration;
    item.picture = picture || item.picture;
    item.status = status || item.status;

    await item.save(); // Enregistre les modifications

    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating item' });
  }
};

// Supprimer un item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({ where: { id } });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await item.destroy(); // Supprime l'item

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting item' });
  }
};

// Récupérer les items d'un utilisateur spécifique (par exemple : récupérer les items d'un user connecté)
exports.getUserItems = async (req, res) => {
  try {
    const { user_id } = req.params; // Utilisateur spécifié

    const items = await Item.findAll({
      where: { user_id },
    });

    if (items.length === 0) {
      return res.status(404).json({ error: 'No items found for this user' });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user items' });
  }
};

// Récupérer les items disponibles (status: "Available")
exports.getAvailableItems = async (req, res) => {
  try {
    const availableItems = await Item.findAll({
      where: {
        status: 'Available',
      },
    });

    res.status(200).json(availableItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching available items' });
  }
};
