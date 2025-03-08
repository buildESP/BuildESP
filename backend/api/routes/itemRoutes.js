// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Creates a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user who creates the item
 *               subcategory_id:
 *                 type: string
 *                 description: The ID of the subcategory to which the item belongs
 *               name:
 *                 type: string
 *                 description: The name of the item
 *               description:
 *                 type: string
 *                 description: The description of the item
 *               picture:
 *                 type: string
 *                 description: URL of the item picture
 *               status:
 *                 type: string
 *                 description: The status of the item (e.g., available, sold)
 *           example:
 *             user_id: 4
 *             subcategory_id: 1
 *             name: "Vélo de ville"
 *             description: "Vélo tout terrain avec suspension et freins à disque. Idéal pour les randonnées."
 *             picture: "https://www.cyclable.com/img/c/1468.jpg"
 *             status: "Available"
 *     responses:
 *       201:
 *         description: Item created successfully
 *       404:
 *         description: User or Subcategory not found
 *       500:
 *         description: Error during item creation
 */
router.post('/items', authenticateToken, ItemController.createItem);

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Retrieves a list of all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The item's ID
 *                   name:
 *                     type: string
 *                     description: The name of the item
 *                   description:
 *                     type: string
 *                     description: The description of the item
 *                   picture:
 *                     type: string
 *                     description: The picture URL of the item
 *                   status:
 *                     type: string
 *                     description: The status of the item
 *                   user:
 *                     type: object
 *                     description: User details associated with the item
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: User's ID
 *                       name:
 *                         type: string
 *                         description: User's name
 *                   subcategory:
 *                     type: object
 *                     description: Subcategory details of the item
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Subcategory's ID
 *                       name:
 *                         type: string
 *                         description: Subcategory's name
 */
router.get('/items', ItemController.getItems);

/**
 * @swagger
 * /api/items/{item_id}:
 *   get:
 *     summary: Retrieves an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item
 *     responses:
 *       200:
 *         description: Item found successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Error during fetching item
 */
router.get('/items/:item_id', ItemController.getItemById);

/**
 * @swagger
 * /api/items/{item_id}:
 *   put:
 *     summary: Updates an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user who updates the item
 *               subcategory_id:
 *                 type: string
 *                 description: The ID of the subcategory to which the item belongs
 *               name:
 *                 type: string
 *                 description: The new name of the item
 *               description:
 *                 type: string
 *                 description: The new description of the item
 *               picture:
 *                 type: string
 *                 description: The new picture URL of the item
 *               status:
 *                 type: string
 *                 description: The new status of the item (e.g., available, sold)
 *           example:
 *             user_id: 4
 *             subcategory_id: 1
 *             name: "Vélo de ville"
 *             description: "Vélo tout terrain avec suspension et freins à disque. Idéal pour les randonnées."
 *             picture: "https://www.cyclable.com/img/c/1468.jpg"
 *             status: "Available"
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item, User, or Subcategory not found
 *       500:
 *         description: Error during item update
 */
router.put('/items/:item_id', authenticateToken, ItemController.updateItem);

/**
 * @swagger
 * /api/items/{item_id}:
 *   delete:
 *     summary: Deletes an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Error during item deletion
 */
router.delete('/items/:item_id', authenticateToken, ItemController.deleteItem);

module.exports = router;
