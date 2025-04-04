// routes/exchangeRoutes.js
const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');
const chatSocket = require('../sockets/chatSocket');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/exchanges:
 *   post:
 *     summary: Creates a new exchange
 *     tags: [Exchanges]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_id:
 *                 type: integer
 *                 description: The ID of the item being exchanged
 *               lender_user_id:
 *                 type: integer
 *                 description: The ID of the lender user
 *               borrow_user_id:
 *                 type: integer
 *                 description: The ID of the borrower user
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: The start date of the exchange
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: The end date of the exchange
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Completed, Cancelled]
 *                 description: The current status of the exchange
 *           example:
 *             item_id: 1
 *             lender_user_id: 2
 *             borrow_user_id: 3
 *             start_date: "2025-02-15T10:00:00Z"
 *             end_date: "2025-02-20T10:00:00Z"
 *             status: "Pending"
 *     responses:
 *       201:
 *         description: Exchange created successfully
 *       404:
 *         description: Item or user not found
 *       500:
 *         description: Error during exchange creation
 */
router.post('/exchanges', authenticateToken, exchangeController.createExchange);

/**
 * @swagger
 * /api/exchanges:
 *   get:
 *     summary: Retrieves all exchanges
 *     tags: [Exchanges]
 *     responses:
 *       200:
 *         description: A list of exchanges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Exchange's ID
 *                   item:
 *                     type: object
 *                     description: Item details associated with the exchange
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Item's ID
 *                       name:
 *                         type: string
 *                         description: Item's name
 *                   lender_user:
 *                     type: object
 *                     description: Lender user details
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Lender's ID
 *                       name:
 *                         type: string
 *                         description: Lender's name
 *                   borrow_user:
 *                     type: object
 *                     description: Borrower user details
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Borrower's ID
 *                       name:
 *                         type: string
 *                         description: Borrower's name
 *                   start_date:
 *                     type: string
 *                     format: date-time
 *                     description: The start date of the exchange
 *                   end_date:
 *                     type: string
 *                     format: date-time
 *                     description: The end date of the exchange
 *                   status:
 *                     type: string
 *                     enum: [Pending, Approved, Completed, Cancelled]
 *                     description: The current status of the exchange
 */
router.get('/exchanges', authenticateToken, exchangeController.getExchanges);

/**
 * @swagger
 * /api/exchanges/{exchange_id}:
 *   get:
 *     summary: Retrieves an exchange by ID
 *     tags: [Exchanges]
 *     parameters:
 *       - in: path
 *         name: exchange_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exchange's ID
 *     responses:
 *       200:
 *         description: Exchange found successfully
 *       404:
 *         description: Exchange not found
 *       500:
 *         description: Error during fetching exchange
 */
router.get('/exchanges/:exchange_id', authenticateToken, exchangeController.getExchangeById);

/**
 * @swagger
 * /api/exchanges/{exchange_id}:
 *   put:
 *     summary: Updates an exchange by ID
 *     tags: [Exchanges]
 *     parameters:
 *       - in: path
 *         name: exchange_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exchange's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_id:
 *                 type: integer
 *                 description: The ID of the item being exchanged
 *               lender_user_id:
 *                 type: integer
 *                 description: The ID of the lender user
 *               borrow_user_id:
 *                 type: integer
 *                 description: The ID of the borrower user
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: The start date of the exchange
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: The end date of the exchange
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Completed, Cancelled]
 *                 description: The current status of the exchange
 *           example:
 *             item_id: 1
 *             lender_user_id: 2
 *             borrow_user_id: 3
 *             start_date: "2025-02-15T10:00:00Z"
 *             end_date: "2025-02-20T10:00:00Z"
 *             status: "Pending"
 *     responses:
 *       200:
 *         description: Exchange updated successfully
 *       404:
 *         description: Exchange not found
 *       500:
 *         description: Error during exchange update
 */
router.put('/exchanges/:exchange_id', authenticateToken, exchangeController.updateExchange);

/**
 * @swagger
 * /api/exchanges/{exchange_id}:
 *   delete:
 *     summary: Deletes an exchange by ID
 *     tags: [Exchanges]
 *     parameters:
 *       - in: path
 *         name: exchange_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exchange's ID
 *     responses:
 *       200:
 *         description: Exchange deleted successfully
 *       404:
 *         description: Exchange not found
 *       500:
 *         description: Error during exchange deletion
 */
router.delete('/exchanges/:exchange_id', authenticateToken, exchangeController.deleteExchange);

//TODO SWAGGER
router.get('/exchanges/:exchange_id/chat', authenticateToken, chatSocket.connectSocket);

module.exports = router;
