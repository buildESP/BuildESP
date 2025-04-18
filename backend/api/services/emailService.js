// services/emailService.js

const nodemailer = require('nodemailer');
const chalk = require('chalk');

// Vérification des variables d'environnement nécessaires
if (!process.env.MAIL_HOST || !process.env.MAIL_PORT || !process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.FRONTEND_URL) {
    console.error(chalk.red.bold('⛔ Les variables d\'environnement nécessaires au service de messagerie ne sont pas définies !'));
    process.exit(1);
}

// Création du transporteur Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true', // Si "true", utilise TLS
    tls: {
        rejectUnauthorized: false,  // Acceptation des certificats auto-signés
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

    // Options de l'email
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
<<<<<<< HEAD
                                            <h1 style="color: #fff; margin: 0;">Réinitialisation de votre mot de passe</h1>
=======
                                            <h1 style="color: #fff; margin: 0;">Réinitialisation du mot de passe</h1>
>>>>>>> c707d617c50ee213d8c396c8ebff3949113b6dc7
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px; text-align: center;">
<<<<<<< HEAD
                                            <p style="font-size: 16px; line-height: 1.6;">Bonjour ${firstname}, nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Neighborrow. Cliquez sur le bouton ci-dessous pour procéder :</p>
                                            <p style="margin-top: 20px;">
                                                <a href="${resetLink}" style="background-color: #86efac; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
                                            </p>
                                            <p style="font-size: 14px; color: #555; margin-top: 20px;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
=======
                                            <p style="font-size: 16px; line-height: 1.6;">Bonjour ${firstname},</p>
                                            <p style="font-size: 16px; line-height: 1.6;">Nous avons reçu une demande de réinitialisation de votre mot de passe pour votre compte Neighborrow.</p>
                                            <p style="margin-top: 20px;">
                                                <a href="${resetLink}" style="background-color: #86efac; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
                                            </p>
                                            <p style="font-size: 14px; color: #555; margin-top: 20px;">Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet email.</p>
>>>>>>> c707d617c50ee213d8c396c8ebff3949113b6dc7
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #888;">
<<<<<<< HEAD
                                            <p>&copy; ${new Date().getFullYear()} Neighborrow. Tous droits réservés.</p>
=======
                                            <p>&copy; ${new Date().getFullYear()} Neighborrow 2025. Tous droits réservés.</p>
>>>>>>> c707d617c50ee213d8c396c8ebff3949113b6dc7
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

    // Envoi de l'email
    try {
        console.log(chalk.blue(`🔄 Envoi de l'email à ${email}`));  // Log avant l'envoi pour le suivi
        await transporter.sendMail(mailOptions);
        console.log(chalk.green(`✅ Email envoyé à ${email}`));  // Log de confirmation d'envoi
    } catch (error) {
        console.error(chalk.red.bold('❌ Erreur lors de l\'envoi de l\'email :', error));  // Log d'erreur
        throw new Error('Échec de l\'envoi de l\'email');
    }
};
