const bcrypt = require('bcrypt');
const { User } = require('../../../models/associations');
const { forgotPassword, resetPassword } = require('../../../controllers/authController');
const { sendResetEmail } = require('../../../services/emailService');
const crypto = require('crypto');

jest.mock('../../../models/associations');
jest.mock('../../../services/emailService');

describe('AuthController - forgotPassword', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('should return 400 if no login is provided', async () => {
    await forgotPassword(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Email is required (login field in body)'
    });
  });

  test('should return 404 if user not found', async () => {
    mockReq.body.login = 'nonexistent@example.com';
    User.findOne.mockResolvedValue(null);

    await forgotPassword(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'No user found with this email login'
    });
  });

  test('should generate reset token and return success message', async () => {
    const mockUser = {
      email: 'test@test.com',
      firstname: 'John',
      update: jest.fn(),
    };
    mockReq.body.login = mockUser.email;
    User.findOne.mockResolvedValue(mockUser);

    await forgotPassword(mockReq, mockRes);

    expect(mockUser.update).toHaveBeenCalledWith(expect.objectContaining({
      reset_token: expect.any(String),
      reset_token_expiry: expect.any(Number),
    }));

    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Password reset link will be sent shortly'
    });
  });

  test('should log error if sendResetEmail fails (but not affect response)', async () => {
    const mockUser = {
      email: 'test@test.com',
      firstname: 'Jane',
      update: jest.fn(),
    };
    mockReq.body.login = mockUser.email;
    User.findOne.mockResolvedValue(mockUser);

    sendResetEmail.mockRejectedValue(new Error('Email service down'));

    jest.useFakeTimers();

    await forgotPassword(mockReq, mockRes);
    jest.runAllTimers();

    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Password reset link will be sent shortly'
    });

    jest.useRealTimers();
  });

  test('should return 500 on DB error', async () => {
    mockReq.body.login = 'test@test.com';
    User.findOne.mockRejectedValue(new Error('DB failed'));

    await forgotPassword(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Server error'
    });
  });
});

describe('AuthController - resetPassword', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('should return 400 if token or newPassword missing', async () => {
    mockReq.body = { token: '', newPassword: '' };

    await resetPassword(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Token and new password are required'
    });
  });

  test('should return 400 if token is invalid or expired', async () => {
    mockReq.body = { token: 'invalid-token', newPassword: 'newPass123' };
    User.findOne.mockResolvedValue(null);

    await resetPassword(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Invalid or expired token'
    });
  });

  test('should reset password if token is valid', async () => {
    const mockUser = {
      update: jest.fn(),
    };
    mockReq.body = {
      token: 'valid-token',
      newPassword: 'securePass123'
    };
    User.findOne.mockResolvedValue(mockUser);

    await resetPassword(mockReq, mockRes);

    expect(mockUser.update).toHaveBeenCalledWith({
      password: 'securePass123',
      reset_token: null,
      reset_token_expiry: null,
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Password reset successfully'
    });
  });

  test('should return 500 on DB error', async () => {
    mockReq.body = { token: 'token', newPassword: 'pass' };
    User.findOne.mockRejectedValue(new Error('DB error'));

    await resetPassword(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Server error'
    });
  });
});
