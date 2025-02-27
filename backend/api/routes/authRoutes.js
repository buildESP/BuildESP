// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/access-token:
 *   post:
 *     summary: Generate a JWT access token
 *     description: Returns a JWT token and user ID required for accessing protected routes. The token is generated based on valid login credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: The user's login or email
 *                 example: alice.dupont@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password
 *     responses:
 *       200:
 *         description: Successfully generated JWT token and user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 userId:
 *                   type: integer
 *                   description: The user's unique ID
 *                   example: 123
 *       400:
 *         description: Missing login or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login and password are required
 *       401:
 *         description: Invalid login credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */

router.post('/access-token', authController.generateAccessToken);

module.exports = router;