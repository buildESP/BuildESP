// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's last name
 *               firstname:
 *                 type: string
 *                 description: User's first name
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               address:
 *                 type: string
 *                 description: User's physical address
 *               postcode:
 *                 type: string
 *                 description: User's postal code
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               rating:
 *                 type: integer
 *                 description: User's rating score
 *               picture:
 *                 type: string
 *                 description: URL of the user's profile picture
 *               isAdmin:
 *                 type: boolean
 *                 description: Indicates if the user is an administrator
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error during user creation
 */
router.post('/users', authenticateToken, userController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieves a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: User's ID
 *                   name:
 *                     type: string
 *                     description: User's last name
 *                   firstname:
 *                     type: string
 *                     description: User's first name
 *                   email:
 *                     type: string
 *                     description: User's email
 *                   address:
 *                     type: string
 *                     description: User's address
 *                   postcode:
 *                     type: string
 *                     description: User's postal code
 *                   phone:
 *                     type: string
 *                     description: User's phone number
 *                   rating:
 *                     type: integer
 *                     description: User's rating score
 *                   picture:
 *                     type: string
 *                     description: URL of user's profile picture
 *                   isAdmin:
 *                     type: boolean
 *                     description: If the user is an administrator
 */
router.get('/users', authenticateToken, userController.getUsers);

/**
 * @swagger
 * /api/users/{id_utilisateur}:
 *   get:
 *     summary: Retrieves a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_utilisateur
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User found successfully
 *       404:
 *         description: User not found
 */
router.get('/users/:id_utilisateur', userController.getUserById);

/**
 * @swagger
 * /api/users/{id_utilisateur}:
 *   put:
 *     summary: Updates a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_utilisateur
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's last name
 *               firstname:
 *                 type: string
 *                 description: User's first name
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               address:
 *                 type: string
 *                 description: User's physical address
 *               postcode:
 *                 type: string
 *                 description: User's postal code
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               rating:
 *                 type: integer
 *                 description: User's rating score
 *               picture:
 *                 type: string
 *                 description: URL of the user's profile picture
 *               isAdmin:
 *                 type: boolean
 *                 description: Indicates if the user is an administrator
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error during user update
 */
router.put('/users/:id_utilisateur', userController.updateUser);

/**
 * @swagger
 * /api/users/{id_utilisateur}:
 *   delete:
 *     summary: Deletes a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_utilisateur
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error during user deletion
 */
router.delete('/users/:id_utilisateur', userController.deleteUser);

module.exports = router;
