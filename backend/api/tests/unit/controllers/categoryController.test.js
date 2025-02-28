const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../../../controllers/categoryController');
const { Category, Subcategory } = require('../../../models/associations');

jest.mock('../../../models/associations');

describe('CategoryController', () => {
  let req, res;
  beforeEach(() => {
    req = { params: {}, body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  describe('createCategory', () => {
    test('should create category', async () => {
      req.body = { name: 'Test Category' }; // Added request payload
      Category.create.mockResolvedValue({ id: 1, name: 'Test Category' });
      await createCategory(req, res);
      expect(Category.create).toHaveBeenCalledWith({ name: 'Test Category' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category created successfully', category: { id: 1, name: 'Test Category' } });
    });
  });

  describe('getCategories', () => {
    test('should return all categories', async () => {
      const categories = [{ id: 1, name: 'Cat1' }];
      Category.findAll.mockResolvedValue(categories);
      await getCategories(req, res);
      expect(Category.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(categories);
    });
  });

  describe('getCategoryById', () => {
    test('should return a category when found', async () => {
      req.params.category_id = 1;
      const category = { id: 1, name: 'Cat1' };
      Category.findByPk.mockResolvedValue(category);
      await getCategoryById(req, res);
      expect(Category.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(category);
    });

    test('should return 404 when not found', async () => {
      req.params.category_id = 999;
      Category.findByPk.mockResolvedValue(null);
      await getCategoryById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });
  });

  describe('updateCategory', () => {
    test('should update category when found', async () => {
      req.params.category_id = 1;
      req.body = { name: 'Updated Category' };
      const category = { 
        id: 1, 
        name: 'Old Category',
        update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Category' })
      };
      Category.findByPk.mockResolvedValue(category);
      await updateCategory(req, res);
      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(category.update).toHaveBeenCalledWith({ name: 'Updated Category' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category updated successfully', category });
    });

    test('should return 404 when category to update is not found', async () => {
      req.params.category_id = 999;
      req.body = { name: 'Nonexistent' };
      Category.findByPk.mockResolvedValue(null);
      await updateCategory(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });
  });

  describe('deleteCategory', () => {
    test('should delete category when found', async () => {
      req.params.category_id = 1;
      const category = { id: 1, destroy: jest.fn().mockResolvedValue() };
      Category.findByPk.mockResolvedValue(category);
      await deleteCategory(req, res);
      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(category.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted successfully' });
    });

    test('should return 404 when category to delete is not found', async () => {
      req.params.category_id = 999;
      Category.findByPk.mockResolvedValue(null);
      await deleteCategory(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });
  });
});