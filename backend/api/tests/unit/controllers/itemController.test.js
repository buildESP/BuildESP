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
      const mockUser = { id: 1, save : jest.fn(), name: 'Test User' };
      const mockSubcategory = { id: 1, save : jest.fn(), name: 'Test Subcategory' };

      
      User.findByPk.mockResolvedValue(mockUser);
      Subcategory.findByPk.mockResolvedValue(mockSubcategory);
      Item.findByPk.mockResolvedValue(mockItem);
      //ATTENTION : les mocks marchent mal car findbyPk.mockResolvedValue mock le retour sur tous les objets. Donc ici, seul le dernier mock est effectif
      
      mockReq.params.item_id = '1';
      mockReq.body = {
        user_id: 1,
        subcategory_id: 1,
        name: 'Updated Item',
        description: 'Updated Description',
        picture: 'updated.jpg',
        status: 'available'
      };

      const mockUpdateEntityImage = jest.fn();
      jest.mock('../../../utils/imageUtils', () => ({
        updateEntityImage: mockUpdateEntityImage
      }));
      mockUpdateEntityImage.mockResolvedValue();

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

    test('should return 404 if item to update is not found', async () => {
      mockReq.params.item_id = 999;
      Item.findByPk.mockResolvedValue(null);

      await updateItem(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Item not found'
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
