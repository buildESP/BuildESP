// routes/subcategoryRoutes.js
const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const authenticateToken = require('../middlewares/authMiddleware');

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
 *                 example: "1"
 *               name:
 *                 type: string
 *                 description: The name of the subcategory
 *                 example: "Mobile Phones"
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subcategory created successfully"
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Mobile Phones"
 *                     category_id:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error during subcategory creation
 */
router.post('/subcategories', authenticateToken, subcategoryController.createSubcategory);

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
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     description: Subcategory's name
 *                     example: "Mobile Phones"
 *                   category:
 *                     type: object
 *                     description: Category details associated with the subcategory
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Category's ID
 *                         example: "1"
 *                       name:
 *                         type: string
 *                         description: Category's name
 *                         example: "Electronics"
 *                   items:
 *                     type: array
 *                     description: List of items under the subcategory
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: Item's ID
 *                           example: "1"
 *                         name:
 *                           type: string
 *                           description: Item's name
 *                           example: "iPhone 12"
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
 *         example: "1"
 *     responses:
 *       200:
 *         description: Subcategory found successfully
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
 *                   example: "Mobile Phones"
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     name:
 *                       type: string
 *                       example: "Electronics"
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
 *                 description: The new name of the subcategory
 *                 example: "Smartphones"
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subcategory updated successfully"
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Smartphones"
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Error during subcategory update
 */
router.put('/subcategories/:subcategory_id', authenticateToken, subcategoryController.updateSubcategory);

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
 *         example: "1"
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subcategory deleted successfully"
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Error during subcategory deletion
 */
router.delete('/subcategories/:subcategory_id', authenticateToken, subcategoryController.deleteSubcategory);

module.exports = router;
