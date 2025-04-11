const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../../models/associations');
const { generateAccessToken } = require('../../../controllers/authController');

jest.mock('jsonwebtoken');
jest.mock('bcrypt');
jest.mock('../../../models/associations');

describe('AuthController', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('should return 400 when login is missing', async () => {
    mockReq.body = { password: 'testpass' };
    
    await generateAccessToken(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Login and password are required'
    });
  });

  test('should return 400 when password is missing', async () => {
    mockReq.body = { login: 'test@test.com' };
    
    await generateAccessToken(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Login and password are required'
    });
  });

  test('should return 401 when user is not found', async () => {
    mockReq.body = { login: 'test@test.com', password: 'testpass' };
    User.findOne.mockResolvedValue(null);

    await generateAccessToken(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Invalid credentials'
    });
  });

  test('should return 401 when password is invalid', async () => {
    mockReq.body = { login: 'test@test.com', password: 'wrongpass' };
    User.findOne.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      password: 'hashedpass',
      isAdmin: false
    });
    bcrypt.compare.mockResolvedValue(false);

    await generateAccessToken(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Invalid credentials'
    });
  });

  test('should return token when credentials are valid', async () => {
    const mockUser = {
      id: 1,
      email: 'test@test.com',
      password: 'hashedpass',
      isAdmin: false
    };
    const mockToken = 'valid.jwt.token';

    mockReq.body = { login: 'test@test.com', password: 'correctpass' };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue(mockToken);

    await generateAccessToken(mockReq, mockRes);

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser.id, isAdmin: mockUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      token: mockToken,
      userId: mockUser.id
    });
  });

  test('should return 500 on server error', async () => {
    mockReq.body = { login: 'test@test.com', password: 'testpass' };
    User.findOne.mockRejectedValue(new Error('Database error'));

    await generateAccessToken(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Server error'
    });
  });
});
