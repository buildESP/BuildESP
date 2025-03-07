const {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup
} = require('../../../controllers/groupController');
const { Group, User } = require('../../../models/associations');

jest.mock('../../../models/associations');

describe('GroupController', () => {
  let req, res;
  beforeEach(() => {
    req = { params: {}, body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  describe('createGroup', () => {
    test('should create group if admin exists', async () => {
      req.body = { name: 'Group1', description: 'Desc', group_admin: 1 };
      User.findByPk.mockResolvedValue({ id: 1 });
      const newGroup = { id: 1 };
      Group.create.mockResolvedValue(newGroup);
      await createGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Group created successfully', group: newGroup });
    });
    test('should return 404 if admin user not found', async () => {
      req.body = { name: 'Group1', description: 'Desc', group_admin: 1 };
      User.findByPk.mockResolvedValue(null);
      await createGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Admin user not found' });
    });
  });

  describe('getGroups', () => {
    test('should return all groups', async () => {
      Group.findAll.mockResolvedValue([{ id: 1 }]);
      await getGroups(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });
  });

  describe('getGroupById', () => {
    test('should return group if exists', async () => {
      req.params.group_id = 1;
      Group.findByPk.mockResolvedValue({ id: 1 });
      await getGroupById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });
    test('should return 404 if group not found', async () => {
      req.params.group_id = 1;
      Group.findByPk.mockResolvedValue(null);
      await getGroupById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Group not found' });
    });
  });

  describe('updateGroup', () => {
    test('should update group when found and admin exists', async () => {
      req.params.group_id = 1;
      req.body = { name: 'Updated', description: 'New', group_admin: 1 };
      const group = { id: 1, update: jest.fn().mockResolvedValue() };
      Group.findByPk.mockResolvedValue(group);
      User.findByPk.mockResolvedValue({ id: 1 });
      await updateGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Group updated successfully', group });
    });
    test('should return 404 if group to update not found', async () => {
      req.params.group_id = 1;
      Group.findByPk.mockResolvedValue(null);
      await updateGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Group not found' });
    });
  });

  describe('deleteGroup', () => {
    test('should delete group when exists', async () => {
      req.params.group_id = 1;
      const group = { id: 1, destroy: jest.fn().mockResolvedValue() };
      Group.findByPk.mockResolvedValue(group);
      await deleteGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Group deleted successfully' });
    });
    test('should return 404 if group not found', async () => {
      req.params.group_id = 1;
      Group.findByPk.mockResolvedValue(null);
      await deleteGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Group not found' });
    });
  });
});
