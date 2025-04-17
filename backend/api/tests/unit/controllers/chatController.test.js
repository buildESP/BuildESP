const {
  createChatMessage,
  getChatMessageById,
  updateChatMessage,
  deleteChatMessage,
  getChatHistory,
  getUnreadMessagesCount,
  markMessageAsRead
} = require('../../../controllers/chatController');
const { Exchange, User, ChatMessage } = require('../../../models/associations');
const { Op } = require('sequelize');

// Mock the models
jest.mock('../../../models/associations');
jest.mock('sequelize', () => {
  const actualSequelize = jest.requireActual('sequelize');
  return {
    ...actualSequelize,
    Op: {
      ne: 'ne',
      or: 'or'
    }
  };
});

describe('ChatController', () => {
  let req, res;
  
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    req = { 
      params: {}, 
      body: {},
      user: { id: 1 }
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  describe('createChatMessage', () => {
    test('should create chat message when exchange and sender exist', async () => {
      req.body = { exchange_id: 1, sender_id: 1, message: 'Hello!' };
      
      // Set up the individual mock responses
      const exchangeMock = { id: 1 };
      const userMock = { id: 1 };
      const newChatMessage = { id: 1, exchange_id: 1, sender_id: 1, message: 'Hello!' };
      
      // Mock the specific model methods with their responses
      Exchange.findByPk = jest.fn().mockResolvedValue(exchangeMock);
      User.findByPk = jest.fn().mockResolvedValue(userMock);
      ChatMessage.create = jest.fn().mockResolvedValue(newChatMessage);
      
      await createChatMessage(req, res);
      
      expect(Exchange.findByPk).toHaveBeenCalledWith(1);
      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Chat message created successfully', chatMessage: newChatMessage });
    });
    
    test('should return 404 if exchange not found', async () => {
      req.body = { exchange_id: 1, sender_id: 1, message: 'Hello!' };
      
      // Mock Exchange.findByPk to return null
      Exchange.findByPk = jest.fn().mockResolvedValue(null);
      
      await createChatMessage(req, res);
      
      expect(Exchange.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Exchange not found' });
    });
    
    test('should return 404 if sender not found', async () => {
      req.body = { exchange_id: 1, sender_id: 1, message: 'Hello!' };
      
      // Mock Exchange.findByPk to return a value and User.findByPk to return null
      Exchange.findByPk = jest.fn().mockResolvedValue({ id: 1 });
      User.findByPk = jest.fn().mockResolvedValue(null);
      
      await createChatMessage(req, res);
      
      expect(Exchange.findByPk).toHaveBeenCalledWith(1);
      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Sender not found' });
    });
  });

  describe('getChatMessageById', () => {
    test('should return chat message if exists', async () => {
      req.params.message_id = 1;
      
      const chatMessage = { id: 1, message: 'Hello!' };
      ChatMessage.findByPk = jest.fn().mockResolvedValue(chatMessage);
      
      await getChatMessageById(req, res);
      
      expect(ChatMessage.findByPk).toHaveBeenCalledWith(1, expect.anything());
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(chatMessage);
    });
    
    test('should return 404 if chat message not found', async () => {
      req.params.message_id = 1;
      
      ChatMessage.findByPk = jest.fn().mockResolvedValue(null);
      
      await getChatMessageById(req, res);
      
      expect(ChatMessage.findByPk).toHaveBeenCalledWith(1, expect.anything());
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Chat message not found' });
    });
  });

  describe('updateChatMessage', () => {
    test('should update chat message when found', async () => {
      req.params.message_id = 1;
      req.body = { message: 'Updated message' };
      
      const chatMessage = { id: 1, update: jest.fn().mockResolvedValue() };
      ChatMessage.findByPk = jest.fn().mockResolvedValue(chatMessage);
      
      await updateChatMessage(req, res);
      
      expect(ChatMessage.findByPk).toHaveBeenCalledWith(1);
      expect(chatMessage.update).toHaveBeenCalledWith({ message: 'Updated message' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Chat message updated successfully', chatMessage });
    });
    
    test('should return 404 if chat message not found', async () => {
      req.params.message_id = 1;
      req.body = { message: 'Updated message' };
      
      ChatMessage.findByPk = jest.fn().mockResolvedValue(null);
      
      await updateChatMessage(req, res);
      
      expect(ChatMessage.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Chat message not found' });
    });
  });

  describe('deleteChatMessage', () => {
    test('should delete chat message when found', async () => {
      req.params.message_id = 1;
      
      const chatMessage = { id: 1, destroy: jest.fn().mockResolvedValue() };
      ChatMessage.findByPk = jest.fn().mockResolvedValue(chatMessage);
      
      await deleteChatMessage(req, res);
      
      expect(ChatMessage.findByPk).toHaveBeenCalledWith(1);
      expect(chatMessage.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Chat message deleted successfully' });
    });
    
    test('should return 404 if chat message not found', async () => {
      req.params.message_id = 1;
      
      ChatMessage.findByPk = jest.fn().mockResolvedValue(null);
      
      await deleteChatMessage(req, res);
      
      expect(ChatMessage.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Chat message not found' });
    });
  });

  describe('getChatHistory', () => {
    test('should return chat messages for authorized user', async () => {
      req.params.exchange_id = 1;
      
      // Set up distinct mock instances for each model method
      Exchange.findByPk = jest.fn().mockResolvedValue({ id: 1 });
      Exchange.findOne = jest.fn().mockResolvedValue({ id: 1 });
      
      const messages = [
        { id: 1, sender_id: 1, markAsRead: jest.fn() },
        { id: 2, sender_id: 2, markAsRead: jest.fn() }
      ];
      ChatMessage.findAll = jest.fn().mockResolvedValue(messages);
      
      await getChatHistory(req, res);
      
      expect(Exchange.findByPk).toHaveBeenCalledWith(1);
      expect(Exchange.findOne).toHaveBeenCalledWith(expect.objectContaining({
        where: expect.anything()
      }));
      expect(ChatMessage.findAll).toHaveBeenCalledWith(expect.objectContaining({
        where: { exchange_id: 1 }
      }));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ messages });
      // Only the message from another sender should be marked as read
      expect(messages[0].markAsRead).not.toHaveBeenCalled();
      expect(messages[1].markAsRead).toHaveBeenCalled();
    });
    
    test('should return 403 if exchange does not exist', async () => {
      req.params.exchange_id = 1;
      
      Exchange.findByPk = jest.fn().mockResolvedValue(null);
      
      await getChatHistory(req, res);
      
      expect(Exchange.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Exchange doesnt exist' });
    });
    
    test('should return 403 if user is not part of exchange', async () => {
      req.params.exchange_id = 1;
      
      Exchange.findByPk = jest.fn().mockResolvedValue({ id: 1 });
      Exchange.findOne = jest.fn().mockResolvedValue(null);
      
      await getChatHistory(req, res);
      
      expect(Exchange.findByPk).toHaveBeenCalledWith(1);
      expect(Exchange.findOne).toHaveBeenCalledWith(expect.objectContaining({
        where: expect.anything()
      }));
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not authorized to access this exchange' });
    });
  });

  describe('getUnreadMessagesCount', () => {
    test('should return count of unread messages', async () => {
      req.params.exchange_id = 1;
      
      ChatMessage.count = jest.fn().mockResolvedValue(5);
      
      await getUnreadMessagesCount(req, res);
      
      expect(ChatMessage.count).toHaveBeenCalledWith(expect.objectContaining({
        where: expect.anything()
      }));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ unreadMessagesCount: 5 });
    });
  });

  describe('markMessageAsRead', () => {
    test('should mark message as read when valid', async () => {
      req.params.message_id = 1;
      
      const message = { id: 1, sender_id: 2, markAsRead: jest.fn().mockResolvedValue() };
      ChatMessage.findByPk = jest.fn().mockResolvedValue(message);
      
      await markMessageAsRead(req, res);
      
      expect(ChatMessage.findByPk).toHaveBeenCalledWith(1);
      expect(message.markAsRead).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Message marked as read' });
    });
    
    test('should return 404 if message not found', async () => {
      req.params.message_id = 1;
      
      ChatMessage.findByPk = jest.fn().mockResolvedValue(null);
      
      await markMessageAsRead(req, res);
      
      expect(ChatMessage.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Message not found' });
    });
    
    test('should return 403 when trying to mark own message as read', async () => {
      req.params.message_id = 1;
      
      const message = { id: 1, sender_id: 1 }; // Same as req.user.id
      ChatMessage.findByPk = jest.fn().mockResolvedValue(message);
      
      await markMessageAsRead(req, res);
      
      expect(ChatMessage.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cannot mark own message as read' });
    });
  });
});
