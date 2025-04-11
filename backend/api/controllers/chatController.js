const { Exchange, User, ChatMessage } = require('../models/associations');
const { Op } = require('sequelize');

// Create a chat message
exports.createChatMessage = async (req, res) => {
    try {
        const { exchange_id, sender_id, message } = req.body;
        
        // Ensure the exchange exists
        const exchange = await Exchange.findByPk(exchange_id);
        if (!exchange) {
            return res.status(404).json({ message: 'Exchange not found' });
        }
        
        // Ensure the sender exists
        const sender = await User.findByPk(sender_id);
        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }
        
        const chatMessage = await ChatMessage.create({
            exchange_id,
            sender_id,
            message,
        });
        
        res.status(201).json({ message: 'Chat message created successfully', chatMessage });
    } catch (error) {
        console.error('Error creating chat message:', error);
        res.status(500).json({ error: 'Error creating chat message' });
    }
};

exports.getChatMessageById = async (req, res) => {
    try {
        const messageId = req.params.message_id;
        
        const message = await ChatMessage.findByPk(messageId, {
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'name'],
                },
            ],
        });
        
        if (!message) {
            return res.status(404).json({ message: 'Chat message not found' });
        }
        
        res.status(200).json(message);
    } catch (error) {
        console.error('Error fetching chat message by ID:', error);
        res.status(500).json({ error: 'Error fetching chat message' });
    }
};

exports.updateChatMessage = async (req, res) => {
    try {
        const messageId = req.params.message_id;
        const { message } = req.body;
        
        const chatMessage = await ChatMessage.findByPk(messageId);
        
        if (!chatMessage) {
            return res.status(404).json({ message: 'Chat message not found' });
        }
        
        await chatMessage.update({ message });
        
        res.status(200).json({ message: 'Chat message updated successfully', chatMessage });
    } catch (error) {
        console.error('Error updating chat message:', error);
        res.status(500).json({ error: 'Error updating chat message' });
    }
};

exports.deleteChatMessage = async (req, res) => {
    try {
        const messageId = req.params.message_id;
        
        const chatMessage = await ChatMessage.findByPk(messageId);
        
        if (!chatMessage) {
            return res.status(404).json({ message: 'Chat message not found' });
        }
        
        await chatMessage.destroy();
        
        res.status(200).json({ message: 'Chat message deleted successfully' });
    } catch (error) {
        console.error('Error deleting chat message:', error);
        res.status(500).json({ error: 'Error deleting chat message' });
    }
};

exports.getChatHistory = async (req, res) => {
    const exchangeId = req.params.exchange_id;
    const currentUserId = req.user.id;
    
    try {
        const exchange = await Exchange.findByPk(exchangeId);
        
        if (!exchange) {
            return res.status(403).json({ message: 'Exchange doesnt exist' });
        }
        
        const isUserInExchange = await Exchange.findOne({
            where: {
                id: exchangeId,
                [Op.or]: [
                    { lender_user_id: currentUserId },
                    { borrow_user_id: currentUserId },
                ],
            },
        });
        
        if (!isUserInExchange) {
            return res.status(403).json({ message: 'User not authorized to access this exchange' });
        }
        
        const messages = await ChatMessage.findAll({
            where: { exchange_id: exchangeId },
            order: [['timestamp', 'ASC']],
        });
        
        for (let message of messages) {
            if (message.sender_id !== currentUserId) {
                message.markAsRead();
            }
        }
        
        return res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Error fetching messages'+error });
    }
};

exports.getUnreadMessagesCount = async (req, res) => {
    const exchangeId = req.params.exchange_id;
    const currentUserId = req.user.id; 
    
    try {
        const unreadMessagesCount = await ChatMessage.count({
            where: {
                exchange_id: exchangeId,
                sender_id: { [Op.ne]: currentUserId },
                is_read: false,
            },
        });
        
        return res.status(200).json({ unreadMessagesCount });
    } catch (error) {
        console.error('Error fetching unread messages count:', error);
        return res.status(500).json({ error: 'Error fetching unread messages count' });
    }
}

exports.markMessageAsRead = async (req, res) => {
    const messageId = req.params.message_id;
    const currentUserId = req.user.id;
    
    try {
        const message = await ChatMessage.findByPk(messageId);
        
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        
        if (message.sender_id === currentUserId) {
            return res.status(403).json({ message: 'Cannot mark own message as read' });
        }
        
        await message.markAsRead();
        
        return res.status(200).json({ message: 'Message marked as read' });
    } catch (error) {
        console.error('Error marking message as read:', error);
        return res.status(500).json({ error: 'Error marking message as read' });
    }
}
