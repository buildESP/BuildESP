// utils/emailService.js
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

// Fonction pour envoyer l'email de réinitialisation de mot de passe
exports.sendResetEmail = async (email, token, firstname) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Options de l'email
    const mailOptions = {
        from: process.env.MAIL_USER,   // L'email de l'expéditeur
        to: email,                     // L'email du destinataire
        bcc: process.env.MAIL_USER,    // Optionnel: envoie également une copie cachée à l'adresse de l'expéditeur
        subject: 'Demande de réinitialisation du mot de passe',
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                    <table role="presentation" style="width: 100%; background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td>
                                <table role="presentation" style="width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #86efac; padding: 20px; text-align: center;">
                                            <h1 style="color: #fff; margin: 0;">Réinitialisation de votre mot de passe</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px; text-align: center;">
                                            <p style="font-size: 16px; line-height: 1.6;">Bonjour ${firstname}, nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Neighborrow. Cliquez sur le bouton ci-dessous pour procéder :</p>
                                            <p style="margin-top: 20px;">
                                                <a href="${resetLink}" style="background-color: #86efac; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
                                            </p>
                                            <p style="font-size: 14px; color: #555; margin-top: 20px;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #888;">
                                            <p>&copy; ${new Date().getFullYear()} Neighborrow. Tous droits réservés.</p>
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
