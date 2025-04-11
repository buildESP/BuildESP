const {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory
} = require('../../../controllers/subcategoryController');
const { Category, Subcategory } = require('../../../models/associations');
//const { updateEntityImage } = require('../../../utils/imageUtils');

jest.mock('../../../models/associations');

describe('SubcategoryController', () => {
  let req, res;
  beforeEach(() => {
    req = { params: {}, body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  describe('createSubcategory', () => {
    test('should create subcategory if category exists', async () => {
      req.body = { category_id: 1, name: 'Sub1' };
      Category.findByPk.mockResolvedValue({ id: 1 });
      const newSub = { id: 1, name: 'Sub1' };
      Subcategory.create.mockResolvedValue(newSub);
      await createSubcategory(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Subcategory created successfully', subcategory: newSub });
    });
    test('should return 404 if category does not exist', async () => {
      req.body = { category_id: 1, name: 'Sub1' };
      Category.findByPk.mockResolvedValue(null);
      await createSubcategory(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });
  });

  describe('getSubcategories', () => {
    test('should return all subcategories', async () => {
      Subcategory.findAll.mockResolvedValue([{ id: 1 }]);
      await getSubcategories(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });
  });

  describe('getSubcategoryById', () => {
    test('should return subcategory when exists', async () => {
      req.params.subcategory_id = 1;
      Subcategory.findByPk.mockResolvedValue({ id: 1 });
      await getSubcategoryById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });
    test('should return 404 when subcategory not found', async () => {
      req.params.subcategory_id = 1;
      Subcategory.findByPk.mockResolvedValue(null);
      await getSubcategoryById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Subcategory not found' });
    });
  });

  describe('updateSubcategory', () => {
    test('should update subcategory', async () => {
      req.params.subcategory_id = 1;
      req.body = { name: 'Updated Name' };
      const subcategory = { id: 1, update: jest.fn().mockResolvedValue({}), save : jest.fn() };
      Subcategory.findByPk.mockResolvedValue(subcategory);
      await updateSubcategory(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Subcategory updated successfully', subcategory });
    });
    
    test('should return 404 if subcategory not found', async () => {
      req.params.subcategory_id = 1;
      Subcategory.findByPk.mockResolvedValue(null);
      await updateSubcategory(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Subcategory not found' });
    });
  });

  describe('deleteSubcategory', () => {
    test('should delete subcategory if exists', async () => {
      req.params.subcategory_id = 1;
      const subcategory = { id: 1, destroy: jest.fn().mockResolvedValue() };
      Subcategory.findByPk.mockResolvedValue(subcategory);
      await deleteSubcategory(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Subcategory deleted successfully' });
    });
    test('should return 404 when subcategory not found', async () => {
      req.params.subcategory_id = 1;
      Subcategory.findByPk.mockResolvedValue(null);
      await deleteSubcategory(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Subcategory not found' });
    });
  });
});
