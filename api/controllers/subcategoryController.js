// controllers/subcategoryController.js

const Subcategory = require('../models/Subcategory'); // Assurez-vous que le modèle Subcategory est importé
const Category = require('../models/Category'); // Assurez-vous que le modèle Category est importé

// Créer une nouvelle sous-catégorie
exports.createSubcategory = async (req, res) => {
  try {
    const { category_id, name } = req.body;

    // Vérifiez si la catégorie existe avant de créer la sous-catégorie
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newSubcategory = await Subcategory.create({
      category_id,
      name,
    });

    res.status(201).json({ message: 'Subcategory created successfully', subcategory: newSubcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during subcategory creation' });
  }
};

// Récupérer toutes les sous-catégories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll();
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during fetching subcategories' });
  }
};

// Récupérer une sous-catégorie par ID
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategory_id;
    const subcategory = await Subcategory.findByPk(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during fetching subcategory' });
  }
};

// Mettre à jour une sous-catégorie par ID
exports.updateSubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategory_id;
    const { name } = req.body;

    const subcategory = await Subcategory.findByPk(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    await subcategory.update({ name });

    res.status(200).json({ message: 'Subcategory updated successfully', subcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during subcategory update' });
  }
};

// Supprimer une sous-catégorie par ID
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategory_id;
    const subcategory = await Subcategory.findByPk(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    await subcategory.destroy();
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during subcategory deletion' });
  }
};
