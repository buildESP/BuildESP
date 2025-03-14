const jwt = require('jsonwebtoken');
const authenticateToken = require('../../../middlewares/authMiddleware');

jest.mock('jsonwebtoken');

describe('Authentication Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  test('should authenticate valid token', () => {
    const mockUser = { id: 1, email: 'test@test.com' };
    const mockToken = 'valid.jwt.token';
    
    mockReq.headers.authorization = `Bearer ${mockToken}`;
    jwt.verify.mockReturnValue(mockUser);

    authenticateToken(mockReq, mockRes, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET);
    expect(mockReq.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalled();
  });

  test('should return 401 if token is missing', () => {
    authenticateToken(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Access token is missing or invalid'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should return 403 if token is invalid', () => {
    mockReq.headers.authorization = 'Bearer invalid.token';
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authenticateToken(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Invalid token'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should return 401 for malformed authorization header', () => {
    mockReq.headers.authorization = 'InvalidHeader';
    
    authenticateToken(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Access token is missing or invalid'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});