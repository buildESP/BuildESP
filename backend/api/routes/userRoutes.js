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
 *               firstname:
 *                 type: string
 *                 description: User's first name
 *                 example: "Alice"
 *               lastname:
 *                 type: string
 *                 description: User's last name
 *                 example: "Dupont"
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "alice.dupont@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password"
 *               address:
 *                 type: string
 *                 description: User's physical address
 *                 example: "1 rue de Paris, 75001 Paris, France"
 *               postcode:
 *                 type: string
 *                 description: User's postal code
 *                 example: "75001"
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *                 example: "0102030405"
 *               rating:
 *                 type: number
 *                 description: User's rating score
 *                 example: 4.5
 *               picture:
 *                 type: string
 *                 description: URL of the user's profile picture
 *                 example: "https://randomuser.me/api/portraits/women/50.jpg"
 *               is_admin:
 *                 type: boolean
 *                 description: Indicates if the user is an administrator
 *                 example: true
 *               groups:
 *                 type: array
 *                 description: List of groups the user belongs to
 *                 items:
 *                   type: integer
 *                   example: 2
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error during user creation
 */
router.post('/users', userController.createUser);

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
 *                   firstname:
 *                     type: string
 *                     description: User's first name
 *                   lastname:
 *                     type: string
 *                     description: User's last name
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
 *                     type: number
 *                     description: User's rating score
 *                   picture:
 *                     type: string
 *                     description: URL of user's profile picture
 *                   is_admin:
 *                     type: boolean
 *                     description: Indicates if the user is an administrator
 */
router.get('/users', authenticateToken, userController.getUsers);

/**
 * @swagger
 * /api/users/{user_id}:
 *   get:
 *     summary: Retrieves a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
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
router.get('/users/:user_id', authenticateToken, userController.getUserById);

/**
 * @swagger
 * /api/users/{user_id}:
 *   put:
 *     summary: Updates a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
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
 *               firstname:
 *                 type: string
 *                 description: User's first name
 *               lastname:
 *                 type: string
 *                 description: User's last name
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
 *                 type: number
 *                 description: User's rating score
 *               picture:
 *                 type: string
 *                 description: URL of the user's profile picture
 *               is_admin:
 *                 type: boolean
 *                 description: Indicates if the user is an administrator
 *           example:
 *             firstname: "Alice"
 *             lastname: "Dupont"
 *             email: "alice.dupont40@example.com"
 *             password: "password"
 *             address: "1 rue de Paris, 75001 Paris, France"
 *             postcode: "75001"
 *             phone: "0102030405"
 *             rating: 4.5
 *             picture: "https://randomuser.me/api/portraits/women/50.jpg"
 *             is_admin: true
 *             groups: [2]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error during user update
 */
router.put('/users/:user_id', authenticateToken, userController.updateUser);

/**
 * @swagger
 * /api/users/{user_id}:
 *   delete:
 *     summary: Deletes a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
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
router.delete('/users/:user_id', authenticateToken, userController.deleteUser);

module.exports = router;
