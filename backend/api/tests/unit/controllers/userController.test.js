const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../../../controllers/userController');
const { User, Group } = require('../../../models/associations');

jest.mock('../../../models/associations');

jest.mock('../../../utils/imageUtils', () => ({
  updateEntityImage: jest.fn().mockResolvedValue()
}));

describe('UserController', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createUser', () => {
    test('should create user and associate groups', async () => {
      req.body = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        password: 'secret',
        address: '123 St',
        postcode: '12345',
        phone: '1234567890',
        rating: 5,
        picture: 'pic.png',
        is_admin: false,
        groups: [1]
      };

      const newUser = {
        id: 1,
        addGroups: jest.fn().mockResolvedValue()
      };

      User.create.mockResolvedValue(newUser);
      Group.findAll.mockResolvedValue([{ id: 1 }]);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        user: newUser
      });
    });

    test('should handle error during user creation', async () => {
      req.body = {};
      User.create.mockRejectedValue(new Error('Error'));

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error during user creation' });
    });
  });

  describe('getUsers', () => {
    test('should return all users', async () => {
      User.findAll.mockResolvedValue([{ id: 1 }]);

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });
  });

  describe('getUserById', () => {
    test('should return user when found', async () => {
      req.params.user_id = 1;
      User.findByPk.mockResolvedValue({ id: 1 });

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    test('should return 404 when user not found', async () => {
      req.params.user_id = 1;
      User.findByPk.mockResolvedValue(null);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    test('should handle errors', async () => {
      req.params.user_id = 1;
      User.findByPk.mockRejectedValue(new Error('DB error'));

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error during fetching user' });
    });
  });

  describe('updateUser', () => {
    test('should update user and groups', async () => {
      req.params.user_id = 1;
      req.body = { firstname: 'Jane', groups: [1] };

      const user = {
        id: 1,
        update: jest.fn().mockResolvedValue(),
        setGroups: jest.fn().mockResolvedValue()
      };

      User.findByPk.mockResolvedValue(user);
      Group.findAll.mockResolvedValue([{ id: 1 }]);

      await updateUser(req, res);

      expect(user.update).toHaveBeenCalled();
      expect(user.setGroups).toHaveBeenCalledWith([{ id: 1 }]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User updated successfully', user });
    });

    test('should return 404 when user to update not found', async () => {
      req.params.user_id = 1;
      User.findByPk.mockResolvedValue(null);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    test('should return 400 if some groups not found', async () => {
      req.params.user_id = 1;
      req.body = { groups: [1, 2] };

      const user = {
        update: jest.fn().mockResolvedValue(),
        setGroups: jest.fn().mockResolvedValue()
      };

      User.findByPk.mockResolvedValue(user);
      Group.findAll.mockResolvedValue([{ id: 1 }]); // Only one found

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'One or more groups not found' });
    });

    test('should handle error during update', async () => {
      req.params.user_id = 1;
      req.body = { firstname: 'Test' };

      const user = {
        update: jest.fn().mockRejectedValue(new Error('fail')),
        setGroups: jest.fn()
      };

      User.findByPk.mockResolvedValue(user);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error during user update' });
    });
  });

  describe('deleteUser', () => {
    test('should delete user when found', async () => {
      req.params.user_id = 1;
      const user = {
        id: 1,
        destroy: jest.fn().mockResolvedValue()
      };

      User.findByPk.mockResolvedValue(user);

      await deleteUser(req, res);

      expect(user.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    test('should return 404 when user to delete is not found', async () => {
      req.params.user_id = 1;
      User.findByPk.mockResolvedValue(null);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    test('should handle error during deletion', async () => {
      req.params.user_id = 1;
      const user = {
        destroy: jest.fn().mockRejectedValue(new Error('fail'))
      };

      User.findByPk.mockResolvedValue(user);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error during user deletion' });
    });
  });
});
