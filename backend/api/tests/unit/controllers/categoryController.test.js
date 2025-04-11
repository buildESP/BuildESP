const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../../../controllers/categoryController');
const { Category, Subcategory } = require('../../../models/associations');
const { updateEntityImage } = require('../../../utils/imageUtils');

jest.mock('../../../models/associations');
jest.mock('../../../utils/imageUtils', () => ({
  updateEntityImage: jest.fn().mockResolvedValue()
}));

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
      req.body = { name: 'Updated', description: 'New description' };
      
      const mockCategory = { 
        id: 1, 
        name: 'Old Category',
        update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Category' }),
        image_url: 'old_image_url'
      };
      Category.findByPk.mockResolvedValue(category);
      updateEntityImage.mockResolvedValue();
      
      await updateCategory(req, res);
      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(updateEntityImage).toHaveBeenCalledWith(category, undefined); // As no image_url is passed
      expect(category.update).toHaveBeenCalledWith({ name: 'Updated Category', image_url: 'old_image_url' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category updated successfully', category });
    });

    test('should update category when image_url is provided', async () => {
      req.params.category_id = 1;
      req.body = { name: 'Updated Category', image_url: 'new_image_url' };
      const category = { 
        id: 1, 
        name: 'Old Category',
        update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Category' }),
        image_url: 'old_image_url'
      };
      Category.findByPk.mockResolvedValue(category);
      updateEntityImage.mockResolvedValue();

      await updateCategory(req, res);
      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(updateEntityImage).toHaveBeenCalledWith(category, 'new_image_url');
      expect(category.update).toHaveBeenCalledWith({ name: 'Updated Category', image_url: 'old_image_url' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Category updated successfully', 
        category: mockCategory 
      });
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
