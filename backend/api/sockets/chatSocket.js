import { Server } from "socket.io";

exports.connectSocket = async (req, res) => {
    const exchangeId = req.params.exchange_id;
    const currentUserId = req.user.id; // Assuming you have the user ID from the token, UNSURE
    
    try{
        exchange = await Exchange.findByPk(exchangeId)

    } catch (error) {
        console.error('Error fetching exchange by ID:', error);
        res.status(500).json({ error: 'Error during fetching exchange', details: error.message });
    }

    if (!exchange) {
        return res.status(404).json({ message: 'Exchange not found' });
    }

    // Check if the user is part of the exchange
    const isUserInExchange = await Exchange.findOne({
        where: {
            id: exchangeId,
            [Op.or]: [
                { lender_user_id: currentUserId },
                { borrow_user_id: currentUserId }
            ]
        }
    });
    if (!isUserInExchange) {
        return res.status(403).json({ message: 'User not authorized to access this exchange' });
    }

    //get old messages
    const messages = await ChatMessage.findAll({
        where: { exchange_id: exchangeId },
        include: [
            {
                model: User,
                as: 'sender',
                attributes: ['id', 'name']
            }
        ],
        order: [['timestamp', 'ASC']]
    });
    for (let message of messages) {
        if (message.sender_id !== currentUserId) {
            message.markAsRead();
        }

    const io = new Server(req.socket.server);
    io.on('connection', (socket) => {
        console.log('New client connected');
        
        socket.join(exchangeId);
        
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
    socket.on('sendMessage', (message) => {
        const chatMessage = {
            exchange_id: exchangeId,
            sender_id: currentUserId,
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
            });
    });
    socket.on('readMessage', (messageId) => {
        ChatMessage.findByPk(messageId)
            .then((message) => {
                message.markAsRead();
            })
            .catch((error) => {
                console.error('Error marking message as read:', error);
            });
    });
    socket.on('typing', () => {
        socket.broadcast.to(exchangeId).emit('typing', currentUserId);
    });
    socket.on('stopTyping', () => {
        socket.broadcast.to(exchangeId).emit('stopTyping', currentUserId);
    });
    res.status(200).json({ messages: messages });
    }
}
