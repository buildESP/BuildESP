const { ChatMessage, User, Exchange } = require('../models/associations.js');
const { Op } = require('sequelize');


exports.initSockets = async (io) =>{
    
    io.on('connection', async (socket) => {
        const userId = socket.userId;
        const exchangeId = socket.handshake.query.exchangeId;
        if (!userId || !exchangeId) {
            console.error('Missing userId or exchangeId in socket connection');
            socket.emit('error', 'Missing userId or exchangeId');
            socket.disconnect();
        }

        const user = await User.findByPk(userId);
        const exchange = await Exchange.findByPk(exchangeId);
        if (!user) {
            console.error('User not found');
            socket.emit('error', 'User not found');
            socket.disconnect();
        }
        if (!exchange) {
            console.error('Exchange not found');
            socket.emit('error', 'Exchange not found');
            socket.disconnect();
        }
        const isUserInExchange = await Exchange.findOne({
            where: {
                id: exchangeId,
                [Op.or]: [
                    { lender_user_id: userId },
                    { borrow_user_id: userId }
                ]
            }
        });
        if (!isUserInExchange) {
            console.error('User is not part of the exchange');
            socket.emit('error', 'User is not part of the exchange');
            socket.disconnect();
            return;
        }
        
        socket.join(exchangeId);
        
        socket.on('disconnect', () => {
            
        });

        socket.on('sendMessage', (message) => {
            const chatMessage = {
                exchange_id: exchangeId,
                sender_id: userId,
                message: message,
                timestamp: new Date(),
                is_read: false
            };
            
            // Save the message to the database
            ChatMessage.create(chatMessage)
            .then(() => {
                io.to(exchangeId).emit('receiveMessage', chatMessage);
            })
            .catch((error) => {
                console.error('Error saving message:', error);
                socket.emit('error', 'Error saving message');
                throw new Error('Error saving message');
            });
        });

        socket.on('readMessage', (messageId) => {
            ChatMessage.findByPk(messageId)
            .then((message) => {
                if (message) {
                    message.markAsRead();
                } else {
                    console.error('Message not found when trying to read:', messageId);
                    socket.emit('error', 'Message not found');
                    throw new Error('Message not found when trying to mark as read');
                }
            })
            .catch((error) => {
                console.error('Error marking message as read:', error);
                throw new Error('Error marking message as read');
            });
        });

        socket.on('typing', () => {
            socket.broadcast.to(exchangeId).emit('typing', userId);
        });

        socket.on('stopTyping', () => {
            socket.broadcast.to(exchangeId).emit('stopTyping', userId);
        });
    });
}
