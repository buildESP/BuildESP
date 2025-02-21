// controllers/categoryController.js

const { Category, Subcategory } = require('../models/associations');

// create a category
exports.createCategory = async (req, res) => {
  try {
    const { name, image_url } = req.body;

    const newCategory = await Category.create({
      name,
      image_url
    });

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during category creation' });
  }
};

// get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Subcategory,
          as: 'subcategories',
        },
      ],
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Error during fetching categories', details: error.message });
  }
};

// get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.category_id;

    const category = await Category.findByPk(categoryId, {
      include: [
        {
          model: Subcategory,
          as: 'subcategories',
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    res.status(500).json({ error: 'Error during fetching category', details: error.message });
  }
};

// update category
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const { name } = req.body;


    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await updateEntityImage(category, req.body.image_url);


    await category.update({ name, image_url: category.image_url  });

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during category update' });
  }
};

// delete category
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
