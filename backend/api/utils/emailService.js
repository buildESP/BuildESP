// utils/emailService.js:

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true',
    tls: {
        rejectUnauthorized: false,
    },
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

exports.sendResetEmail = async (email, token, firstname) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                    <table role="presentation" style="width: 100%; background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td>
                                <table role="presentation" style="width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #86efac; padding: 20px; text-align: center;">
                                            <h1 style="color: #fff; margin: 0;">Password Reset Request</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px; text-align: center;">
                                            <p style="font-size: 16px; line-height: 1.6;">Hello ${firstname}, we received a request to reset your password for your Neighborrow account. Click the button below to proceed:</p>
                                            <p style="margin-top: 20px;">
                                                <a href="${resetLink}" style="background-color: #86efac; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Reset Password</a>
                                            </p>
                                            <p style="font-size: 14px; color: #555; margin-top: 20px;">If you did not request a password reset, please ignore this email.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #888;">
                                            <p>&copy; ${new Date().getFullYear()} Neighborrow. All Rights Reserved.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

