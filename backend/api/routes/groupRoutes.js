// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Creates a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the group
 *               description:
 *                 type: string
 *                 description: A brief description of the group
 *               group_admin:
 *                 type: integer
 *                 description: The ID of the user who is the admin of the group
 *           example:
 *             name: "Building"
 *             description: "Group for the building residents"
 *             group_admin: 3
 *     responses:
 *       201:
 *         description: Group created successfully
 *       404:
 *         description: Admin user not found
 *       500:
 *         description: Error during group creation
 */
router.post('/groups', groupController.createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Retrieves all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: A list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the group
 *                   name:
 *                     type: string
 *                     description: The name of the group
 *                   description:
 *                     type: string
 *                     description: A brief description of the group
 *                   group_admin:
 *                     type: object
 *                     description: The admin user of the group
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Admin user's ID
 *                       name:
 *                         type: string
 *                         description: Admin user's name
 *                   users:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: User's ID in the group
 *                         name:
 *                           type: string
 *                           description: User's name
 */
router.get('/groups', groupController.getGroups);

/**
 * @swagger
 * /api/groups/{group_id}:
 *   get:
 *     summary: Retrieves a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The group's ID
 *     responses:
 *       200:
 *         description: Group found successfully
 *       404:
 *         description: Group not found
 */
router.get('/groups/:group_id', groupController.getGroupById);

/**
 * @swagger
 * /api/groups/{group_id}:
 *   put:
 *     summary: Updates a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The group's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the group
 *               description:
 *                 type: string
 *                 description: A new description for the group
 *               group_admin:
 *                 type: integer
 *                 description: The ID of the new admin user for the group
 *           example:
 *             name: "Building"
 *             description: "Group for the building residents"
 *             group_admin: 3
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       404:
 *         description: Group not found
 */
router.put('/groups/:group_id', groupController.updateGroup);

/**
 * @swagger
 * /api/groups/{group_id}:
 *   delete:
 *     summary: Deletes a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The group's ID
 *     responses:
 *       200:
 *         description: Group deleted successfully
 *       404:
 *         description: Group not found
 */
router.delete('/groups/:group_id', groupController.deleteGroup);

module.exports = router;
