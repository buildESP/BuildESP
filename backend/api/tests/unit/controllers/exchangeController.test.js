const {
  createExchange,
  getExchanges,
  getExchangeById,
  updateExchange,
  deleteExchange
} = require('../../../controllers/exchangeController');
const { Exchange, Item, User } = require('../../../models/associations');

jest.mock('../../../models/associations');

describe('ExchangeController', () => {
  let req, res;
  
  beforeEach(() => {
    req = { params: {}, body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('createExchange', () => {
    test('should create exchange if item and users exist', async () => {
      req.body = { item_id: 1, lender_user_id: 1, borrow_user_id: 2, start_date: '2023-01-01', end_date: '2023-01-02', status: 'pending' };
      Item.findByPk.mockResolvedValue({ id: 1 });
      User.findByPk.mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce({ id: 2 });
      const newExchange = { id: 1 };
      Exchange.create.mockResolvedValue(newExchange);
      await createExchange(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Exchange created successfully', exchange: newExchange });
    });
    test('should return 404 if item not found', async () => {
      req.body = { item_id: 1 };
      Item.findByPk.mockResolvedValue(null);
      await createExchange(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });
  });

  describe('getExchanges', () => {
    test('should return all exchanges', async () => {
      Exchange.findAll.mockResolvedValue([{ id: 1 }]);
      await getExchanges(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });
  });

  describe('getExchangeById', () => {
    test('should return exchange when exists', async () => {
      req.params.exchange_id = 1;
      Exchange.findByPk.mockResolvedValue({ id: 1 });
      await getExchangeById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });
    test('should return 404 if exchange not found', async () => {
      req.params.exchange_id = 1;
      Exchange.findByPk.mockResolvedValue(null);
      await getExchangeById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Exchange not found' });
    });
  });

  describe('updateExchange', () => {
    test('should update exchange when all conditions are met', async () => {
      req.params.exchange_id = 1;
      req.body = { item_id: 1, lender_user_id: 1, borrow_user_id: 2, start_date: '2023-01-01', end_date: '2023-01-02', status: 'confirmed' };
      
      // Define the mock with the update method
      const mockExchange = { 
        id: 1, 
        update: jest.fn().mockResolvedValue({}) 
      };
      
      // Set up mocks with explicit return values
      Exchange.findByPk = jest.fn().mockResolvedValue(mockExchange);
      Item.findByPk = jest.fn().mockResolvedValue({ id: 1 });
      User.findByPk = jest.fn()
        .mockResolvedValueOnce({ id: 1 })  // First call (lender)
        .mockResolvedValueOnce({ id: 2 });  // Second call (borrower)
      
      await updateExchange(req, res);
      
      expect(mockExchange.update).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Exchange updated successfully', 
        exchange: mockExchange 
      });
    });
    test('should return 404 if exchange not found', async () => {
      req.params.exchange_id = 1;
      Exchange.findByPk.mockResolvedValue(null);
      await updateExchange(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Exchange not found' });
    });
  });

  describe('deleteExchange', () => {
    test('should delete exchange if found', async () => {
      req.params.exchange_id = 1;
      const exchange = { id: 1, destroy: jest.fn().mockResolvedValue() };
      Exchange.findByPk.mockResolvedValue(exchange);
      await deleteExchange(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Exchange deleted successfully' });
    });
    test('should return 404 if exchange not found', async () => {
      req.params.exchange_id = 1;
      Exchange.findByPk.mockResolvedValue(null);
      await deleteExchange(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Exchange not found' });
    });
  });
});
