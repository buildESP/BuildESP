// routes/categoryRoutes.js
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
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Electronics"
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
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     description: Category's name
 *                     example: "Electronics"
 *                   subcategories:
 *                     type: array
 *                     description: List of subcategories under the category
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: Subcategory's ID
 *                           example: "2"
 *                         name:
 *                           type: string
 *                           description: Subcategory's name
 *                           example: "Mobile Phones"
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
 *         example: "1"
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
 *                   example: "1"
 *                 name:
 *                   type: string
 *                   example: "Electronics"
 *                 subcategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Subcategory's ID
 *                         example: "2"
 *                       name:
 *                         type: string
 *                         description: Subcategory's name
 *                         example: "Mobile Phones"
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
 *         example: "1"
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
 *                 example: "Consumer Electronics"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Consumer Electronics"
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
 *         example: "1"
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error during category deletion
 */
router.delete('/categories/:category_id', categoryController.deleteCategory);

module.exports = router;
