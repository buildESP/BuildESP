// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /access-token:
 *   post:
 *     summary: Generate a JWT access token
 *     description: Returns a JWT token required for accessing protected routes. The token is generated based on valid login credentials.
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully generated JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
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
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.post('/access-token', authController.generateAccessToken);

module.exports = router;