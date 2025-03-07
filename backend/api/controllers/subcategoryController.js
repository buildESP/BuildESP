// controllers/subcategoryController.js

const { Category, Subcategory, Item } = require('../models/associations');


// create a subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { category_id, name, image_url } = req.body;

    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newSubcategory = await Subcategory.create({
      category_id,
      name,
      image_url

    });

    res.status(201).json({ message: 'Subcategory created successfully', subcategory: newSubcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during subcategory creation' });
  }
};


// get all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      include: [
        { model: Category, as: 'category'},
        { model: Item, as: 'items' },
      ],
    });
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during fetching subcategories' });
  }
};

// get subcategory by ID
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategory_id;
    const subcategory = await Subcategory.findByPk(subcategoryId, {
      include: [
        { model: Category, as: 'category' },
        { model: Item, as: 'items' },
      ],
    });

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during fetching subcategory' });
  }
};

// update subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategory_id;
    const { name } = req.body;

    const subcategory = await Subcategory.findByPk(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    await updateEntityImage(subcategory, req.body.image_url);

    await subcategory.update({ name, image_url: subcategory.image_url });

    res.status(200).json({ message: 'Subcategory updated successfully', subcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during subcategory update' });
  }
};

// delete subcategory
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
