jest.mock('nodemailer');

const nodemailer = require('nodemailer');
const { sendWelcomeEmail, sendResetEmail } = require('../../../services/emailService');

describe('emailService', () => {
  const sendMailMock = jest.fn().mockResolvedValue(true);

  beforeEach(() => {
    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });
    sendMailMock.mockClear();
  });

  describe('sendWelcomeEmail', () => {
    it('should send a welcome email with correct options', async () => {
      const email = 'test@example.com';
      const firstname = 'John';

      await sendWelcomeEmail(email, firstname);

      expect(sendMailMock).toHaveBeenCalledTimes(1);
      const mailOptions = sendMailMock.mock.calls[0][0];

      expect(mailOptions.to).toBe(email);
      expect(mailOptions.subject).toBe('Welcome to Neighborrow!');
      expect(mailOptions.html).toContain(`Hi ${firstname}`);
    });

    it('should throw an error if sending welcome email fails', async () => {
      sendMailMock.mockRejectedValueOnce(new Error('Mail server error'));

      await expect(sendWelcomeEmail('fail@example.com', 'User')).rejects.toThrow('Failed to send welcome email');
    });
  });

  describe('sendResetEmail', () => {
    it('should send a reset email with the reset token and correct content', async () => {
      const email = 'reset@example.com';
      const token = 'mocked-token';
      const firstname = 'Jane';

      await sendResetEmail(email, token, firstname);

      expect(sendMailMock).toHaveBeenCalledTimes(1);
      const mailOptions = sendMailMock.mock.calls[0][0];

      expect(mailOptions.to).toBe(email);
      expect(mailOptions.subject).toBe('Password Reset Request');
      expect(mailOptions.html).toContain(token);
      expect(mailOptions.html).toContain(`Hello ${firstname}`);
    });

    it('should throw an error if sending reset email fails', async () => {
      sendMailMock.mockRejectedValueOnce(new Error('Mail server error'));

      await expect(sendResetEmail('fail@example.com', 'token', 'User')).rejects.toThrow('Failed to send email');
    });
  });

  describe('error handling', () => {
    it('should throw an error if sending welcome email fails', async () => {
      sendMailMock.mockRejectedValueOnce(new Error('Mail server error'));

      await expect(sendWelcomeEmail('fail@example.com', 'User')).rejects.toThrow('Failed to send welcome email');
    });

    it('should throw an error if sending reset email fails', async () => {
      sendMailMock.mockRejectedValueOnce(new Error('Mail server error'));

      await expect(sendResetEmail('fail@example.com', 'token', 'User')).rejects.toThrow('Failed to send email');
    });
  });
});
