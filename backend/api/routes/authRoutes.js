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

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Request a password reset email
 *     description: Sends a password reset link to the user's email.
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
 *                 description: The user's email for password reset request
 *                 example: alice.dupont@example.com
 *     responses:
 *       200:
 *         description: Password reset link has been sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset link will be sent shortly
 *       400:
 *         description: Missing email (login)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email is required (login field in body)
 *       404:
 *         description: No user found with this email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No user found with this email login
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
router.post('/forgot-password', authController.forgotPassword);

/**
 * @swagger
 * /api/reset-password:
 *   post:
 *     summary: Reset password using a reset token
 *     description: Allows the user to reset their password using a valid reset token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The reset token sent to the user's email
 *                 example: b0ecaa0282657368a3f8749c61a254a9244aa581b1cd5cfb7e078f92caedd3b8
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password has been reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       400:
 *         description: Missing token or new password, or token expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token and new password are required
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
router.post('/reset-password', authController.resetPassword);

module.exports = router;