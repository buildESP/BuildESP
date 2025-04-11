const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/chats/{exchange_id}/history:
 *   get:
 *     summary: Retrieves chat history for a specific exchange
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: exchange_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exchange's ID
 *     responses:
 *       200:
 *         description: Chat history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Message ID
 *                       exchange_id:
 *                         type: integer
 *                         description: Associated exchange ID
 *                       sender:
 *                         type: object
 *                         description: Sender details
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: Sender's ID
 *                           name:
 *                             type: string
 *                             description: Sender's name
 *                       content:
 *                         type: string
 *                         description: Message content
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         description: Time the message was sent
 *       403:
 *         description: User not authorized to access this exchange
 *       500:
 *         description: Error fetching messages
 */
router.get('/chats/:exchange_id/history', authenticateToken, chatController.getChatHistory);

/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Creates a new chat message
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exchange_id:
 *                 type: integer
 *                 description: The ID of the exchange
 *               sender_id:
 *                 type: integer
 *                 description: The ID of the sender
 *               message:
 *                 type: string
 *                 description: The chat message content
 *           example:
 *             exchange_id: 1
 *             sender_id: 2
 *             message: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Chat message created successfully
 *       404:
 *         description: Exchange or sender not found
 *       500:
 *         description: Error creating chat message
 */
router.post('/chats', authenticateToken, chatController.createChatMessage);


/**
 * @swagger
 * /api/chats/message/{message_id}:
 *   get:
 *     summary: Retrieves a single chat message by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: message_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the chat message
 *     responses:
 *       200:
 *         description: Chat message retrieved successfully
 *       404:
 *         description: Chat message not found
 *       500:
 *         description: Error fetching chat message
 */
router.get('/chats/message/:message_id', authenticateToken, chatController.getChatMessageById);

/**
 * @swagger
 * /api/chats/message/{message_id}:
 *   put:
 *     summary: Updates a chat message by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: message_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the chat message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The updated chat message content
 *           example:
 *             message: "Updated message content"
 *     responses:
 *       200:
 *         description: Chat message updated successfully
 *       404:
 *         description: Chat message not found
 *       500:
 *         description: Error updating chat message
 */
router.put('/chats/message/:message_id', authenticateToken, chatController.updateChatMessage);

/**
 * @swagger
 * /api/chats/message/{message_id}:
 *   delete:
 *     summary: Deletes a chat message by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: message_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the chat message
 *     responses:
 *       200:
 *         description: Chat message deleted successfully
 *       404:
 *         description: Chat message not found
 *       500:
 *         description: Error deleting chat message
 */
router.delete('/chats/message/:message_id', authenticateToken, chatController.deleteChatMessage);

/**
 * @swagger
 * /api/chats/unread/{exchange_id}:
 *   get:
 *     summary: Retrieves the count of unread messages for a specific exchange
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: exchange_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exchange's ID
 *     responses:
 *       200:
 *         description: Unread messages count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unreadMessagesCount:
 *                   type: integer
 *                   description: Count of unread messages
 *       500:
 *         description: Error fetching unread messages count
 */
router.get('/chats/unread/:exchange_id', authenticateToken, chatController.getUnreadMessagesCount);

/**
 * @swagger
 * /api/chats/message/{message_id}/read:
 *   put:
 *     summary: Marks a chat message as read
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: message_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the chat message
 *     responses:
 *       200:
 *         description: Message marked as read successfully
 *       403:
 *         description: Cannot mark own message as read
 *       404:
 *         description: Message not found
 *       500:
 *         description: Error marking message as read
 */
router.put('/chats/message/:message_id/read', authenticateToken, chatController.markMessageAsRead);

module.exports = router;