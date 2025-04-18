const { Item, User, Subcategory } = require('../../../models/associations');
const { createItem, getItems, getItemById, updateItem, deleteItem } = require('../../../controllers/itemController');
const { updateEntityImage } = require('../../../utils/imageUtils');

jest.mock('../../../models/associations');

describe('ItemController', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createItem', () => {
    test('should create item when user and subcategory exist', async () => {
      mockReq.body = {
        user_id: 1,
        subcategory_id: 1,
        name: 'Test Item',
        description: 'Test Description',
        picture: 'test.jpg',
        status: 'available'
      };

      User.findByPk.mockResolvedValue({ id: 1 });
      Subcategory.findByPk.mockResolvedValue({ id: 1 });
      Item.create.mockResolvedValue({ id: 1, ...mockReq.body });

      await createItem(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Item created successfully',
        item: expect.any(Object)
      });
    });

    test('should return 404 if user is not found', async () => {
      mockReq.body = { user_id: 999 };
      User.findByPk.mockResolvedValue(null);

      await createItem(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User not found'
      });
    });
  });

  describe('getItems', () => {
    test('should return all items', async () => {
      const mockItems = [{ id: 1, name: 'Test Item' }];
      Item.findAll.mockResolvedValue(mockItems);

      await getItems(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockItems);
    });
  });

  describe('getItemById', () => {
    test('should return item if exists', async () => {
      const mockItem = { id: 1, name: 'Test Item' };
      mockReq.params.item_id = 1;
      Item.findByPk.mockResolvedValue(mockItem);

      await getItemById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockItem);
    });

    test('should return 404 if item not found', async () => {
      mockReq.params.item_id = 999;
      Item.findByPk.mockResolvedValue(null);

      await getItemById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Item not found'
      });
    });
  });

  describe('updateItem', () => {
    test('should update item when all conditions are met', async () => {
      // jest.unmock('../../../models/Item');

      const mockItem = {
        id: 1,
        name: 'Test Item',
        save: jest.fn(),
        update: jest.fn().mockResolvedValue({
          id: 1,
          name: 'Updated Item',
          description: 'Updated Description',
          picture: 'updated.jpg',
          status: 'available'
        })
      };
  
      mockReq.params.item_id = 1;
      mockReq.body = {
        user_id: 1,
        subcategory_id: 1,
        name: 'Updated Item',
        description: 'Updated Description',
        picture: 'updated.jpg',
        status: 'available'
      };
  
      Item.findByPk.mockResolvedValue(mockItem);
      User.findByPk.mockResolvedValue({ id: 1 });
      Subcategory.findByPk.mockResolvedValue({ id: 1 });
  
      await updateItem(mockReq, mockRes);
  
      expect(mockItem.update).toHaveBeenCalledWith({
        user_id: 1,
        subcategory_id: 1,
        name: 'Updated Item',
        description: 'Updated Description',
        picture: 'updated.jpg',
        status: 'available'
      });
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Item updated successfully',
        item: mockItem
      });
    });
  });

  describe('deleteItem', () => {
    test('should delete item if found', async () => {
      const mockItem = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(true)
      };
      
      mockReq.params.item_id = 1;
      Item.findByPk.mockResolvedValue(mockItem);

      await deleteItem(mockReq, mockRes);

      expect(mockItem.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Item deleted successfully'
      });
    });

    test('should return 404 if item not found', async () => {
      mockReq.params.item_id = 999;
      Item.findByPk.mockResolvedValue(null);

      await deleteItem(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Item not found'
      });
    });
  });
});
