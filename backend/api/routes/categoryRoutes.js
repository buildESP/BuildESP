const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Creates a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               image_url:
 *                 type: string
 *                 format: uri
 *                 description: URL of the category image
 *                 example: "https://s3.amazonaws.com/my-bucket/images/category-123.jpg"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Category ID
 *                 name:
 *                   type: string
 *                   description: Category name
 *                 image_url:
 *                   type: string
 *                   format: uri
 *                   description: URL of the category image
 *       500:
 *         description: Error during category creation
 */
router.post('/categories', categoryController.createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieves a list of all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Category's ID
 *                   name:
 *                     type: string
 *                     description: Category's name
 *                   image_url:
 *                     type: string
 *                     format: uri
 *                     description: URL of the category image
 *                   subcategories:
 *                     type: array
 *                     description: List of subcategories under the category
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: Subcategory's ID
 *                         name:
 *                           type: string
 *                           description: Subcategory's name
 */
router.get('/categories', categoryController.getCategories);

/**
 * @swagger
 * /api/categories/{category_id}:
 *   get:
 *     summary: Retrieves a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category's ID
 *     responses:
 *       200:
 *         description: Category found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Category ID
 *                 name:
 *                   type: string
 *                   description: Category name
 *                 image_url:
 *                   type: string
 *                   format: uri
 *                   description: URL of the category image
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error during fetching category
 */
router.get('/categories/:category_id', categoryController.getCategoryById);

/**
 * @swagger
 * /api/categories/{category_id}:
 *   put:
 *     summary: Updates a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *               image_url:
 *                 type: string
 *                 format: uri
 *                 description: New URL of the category image
 *                 example: "https://s3.amazonaws.com/my-bucket/images/category-123-new.jpg"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Category ID
 *                 name:
 *                   type: string
 *                   description: Category name
 *                 image_url:
 *                   type: string
 *                   format: uri
 *                   description: Updated URL of the category image
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error during category update
 */
router.put('/categories/:category_id', categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{category_id}:
 *   delete:
 *     summary: Deletes a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category's ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error during category deletion
 */
router.delete('/categories/:category_id', categoryController.deleteCategory);

module.exports = router;
