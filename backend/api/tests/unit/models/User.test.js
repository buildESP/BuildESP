const { User } = require('../../../models/associations');
const bcrypt = require('bcrypt');

describe('User Model Hooks', () => {
  test('should hash the password before creating a user', async () => {
    const userData = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const newUser = await User.create(userData);

    expect(newUser.password).not.toBe('password123');
    const isPasswordValid = await bcrypt.compare('password123', newUser.password);
    expect(isPasswordValid).toBe(true);
  });

  test('should hash the password before updating a user', async () => {
    const userData = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const user = await User.create(userData);

    user.password = 'newPassword456';
    await user.save();

    expect(user.password).not.toBe('newPassword456');
    const isPasswordValid = await bcrypt.compare('newPassword456', user.password);
    expect(isPasswordValid).toBe(true);
  });
});
