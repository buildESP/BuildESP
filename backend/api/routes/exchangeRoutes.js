// routes/exchangeRoutes.js
const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');

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
 *               lender_user_id:
 *                 type: integer
 *               borrow_user_id:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Completed, Cancelled]
 *     responses:
 *       201:
 *         description: Exchange created successfully
 *       404:
 *         description: Item or user not found
 *       500:
 *         description: Error during exchange creation
 */
router.post('/exchanges', exchangeController.createExchange);

/**
 * @swagger
 * /api/exchanges:
 *   get:
 *     summary: Retrieves all exchanges
 *     tags: [Exchanges]
 *     responses:
 *       200:
 *         description: A list of exchanges
 */
router.get('/exchanges', exchangeController.getExchanges);

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
 */
router.get('/exchanges/:exchange_id', exchangeController.getExchangeById);

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
 *               lender_user_id:
 *                 type: integer
 *               borrow_user_id:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Completed, Cancelled]
 *     responses:
 *       200:
 *         description: Exchange updated successfully
 *       404:
 *         description: Exchange not found
 */
router.put('/exchanges/:exchange_id', exchangeController.updateExchange);

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
 */
router.delete('/exchanges/:exchange_id', exchangeController.deleteExchange);

module.exports = router;
