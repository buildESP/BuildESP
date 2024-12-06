// routes/subcategoryRoutes.js
const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

/**
 * @swagger
 * /api/subcategories:
 *   post:
 *     summary: Creates a new subcategory
 *     tags: [Subcategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: string
 *                 description: The ID of the category to which the subcategory belongs
 *               name:
 *                 type: string
 *                 description: The name of the subcategory
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error during subcategory creation
 */
router.post('/subcategories', subcategoryController.createSubcategory);

/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: Retrieves a list of all subcategories
 *     tags: [Subcategories]
 *     responses:
 *       200:
 *         description: A list of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Subcategory's ID
 *                   name:
 *                     type: string
 *                     description: Subcategory's name
 *                   category:
 *                     type: object
 *                     description: Category details associated with the subcategory
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Category's ID
 *                       name:
 *                         type: string
 *                         description: Category's name
 *                   items:
 *                     type: array
 *                     description: List of items under the subcategory
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: Item's ID
 *                         name:
 *                           type: string
 *                           description: Item's name
 */
router.get('/subcategories', subcategoryController.getSubcategories);

/**
 * @swagger
 * /api/subcategories/{subcategory_id}:
 *   get:
 *     summary: Retrieves a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: subcategory_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory's ID
 *     responses:
 *       200:
 *         description: Subcategory found successfully
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Error during fetching subcategory
 */
router.get('/subcategories/:subcategory_id', subcategoryController.getSubcategoryById);

/**
 * @swagger
 * /api/subcategories/{subcategory_id}:
 *   put:
 *     summary: Updates a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: subcategory_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the subcategory
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Error during subcategory update
 */
router.put('/subcategories/:subcategory_id', subcategoryController.updateSubcategory);

/**
 * @swagger
 * /api/subcategories/{subcategory_id}:
 *   delete:
 *     summary: Deletes a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: subcategory_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory's ID
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Error during subcategory deletion
 */
router.delete('/subcategories/:subcategory_id', subcategoryController.deleteSubcategory);

module.exports = router;
