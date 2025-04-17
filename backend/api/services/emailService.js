// services/emailService.js

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

exports.sendWelcomeEmail = async (email, firstname) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        bcc: process.env.MAIL_USER,
        subject: 'Bienvenue sur Neighborrow !',
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                    <table role="presentation" style="width: 100%; background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td>
                                <table role="presentation" style="width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #86efac; padding: 20px; text-align: center;">
                                            <h1 style="color: #fff; margin: 0;">Bienvenue sur Neighborrow !</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px; text-align: center;">
                                            <p style="font-size: 16px; line-height: 1.6;">Bonjour ${firstname} !</p>
                                            <p style="font-size: 16px; line-height: 1.6;">Nous sommes ravis de vous compter parmi nous. Votre inscription a bien été enregistrée.</p>
                                            <p style="font-size: 16px; line-height: 1.6;">Vous pouvez dès maintenant explorer la plateforme, mettre un objet en ligne ou en emprunter un ;)</p>
                                            <p style="margin-top: 20px;">
                                                <a href="${process.env.FRONTEND_URL}" style="background-color: #86efac; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Accéder à Neighborrow</a>
                                            </p>
                                            <p style="font-size: 14px; color: #555; margin-top: 20px;">À très bientôt !</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #888;">
                                            <p>&copy; ${new Date().getFullYear()} Neighborrow 2025. Tous droits réservés.</p>
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
        console.error('Error sending welcome email:', error);
        throw new Error('Failed to send welcome email');
    }
};

exports.sendResetEmail = async (email, token, firstname) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        bcc: process.env.MAIL_USER,
        subject: 'Réinitialisation de votre mot de passe',
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                    <table role="presentation" style="width: 100%; background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td>
                                <table role="presentation" style="width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #86efac; padding: 20px; text-align: center;">
                                            <h1 style="color: #fff; margin: 0;">Réinitialisation du mot de passe</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px; text-align: center;">
                                            <p style="font-size: 16px; line-height: 1.6;">Bonjour ${firstname},</p>
                                            <p style="font-size: 16px; line-height: 1.6;">Nous avons reçu une demande de réinitialisation de votre mot de passe pour votre compte Neighborrow.</p>
                                            <p style="margin-top: 20px;">
                                                <a href="${resetLink}" style="background-color: #86efac; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
                                            </p>
                                            <p style="font-size: 14px; color: #555; margin-top: 20px;">Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet email.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #888;">
                                            <p>&copy; ${new Date().getFullYear()} Neighborrow 2025. Tous droits réservés.</p>
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
