// controllers/categoryController.js

const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({
      name,
    });

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during category creation' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during fetching categories' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during fetching category' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const { name } = req.body;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.update({ name });

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during category update' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during category deletion' });
  }
};
