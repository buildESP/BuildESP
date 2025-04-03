const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

// Vérification des variables d'environnement et ajout de logs
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION || !process.env.AWS_BUCKET_NAME) {
    console.error("⛔ Erreur: Les variables d'environnement AWS ne sont pas définies correctement !");
    process.exit(1);  // Arrêter l'application si une variable d'environnement est manquante
}

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/**
 * Uploads an image to S3 with a unique name based on the entity type and its ID.
 * @param {Object} file - The uploaded file
 * @param {string} entityType - Type of entity (e.g., "user", "category")
 * @param {string} entityId - ID of the entity
 * @returns {string} Public URL of the image on S3
 */
const uploadImageForEntity = async (file, entityType, entityId) => {
    const fileExtension = file.mimetype.split('/')[1];
    const key = `${entityType}-${entityId}.${fileExtension}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    // Logs avant l'upload
    console.log(`Préparation de l'upload pour l'image avec les paramètres suivants :`);
    console.log(`Bucket: ${process.env.AWS_BUCKET_NAME}`);
    console.log(`Key: ${key}`);
    console.log(`Body size: ${file.buffer.length} bytes`);
    console.log(`ContentType: ${file.mimetype}`);

    try {
        console.log(`Upload de l'image: ${key} vers le bucket: ${process.env.AWS_BUCKET_NAME}`);
        await s3.send(new PutObjectCommand(params));
        console.log("Upload réussi !");
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
        console.error("Erreur lors de l'upload de l'image:", error);
        throw new Error('Échec de l’upload de l’image sur S3');
    }
};

/**
 * Génère une URL signée pour accéder temporairement à une image privée.
 * @param {string} fileKey - Clé du fichier sur S3
 * @returns {string} URL signée temporaire
 */
const getImageUrl = async (fileKey) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };

    // Log pour la génération de l'URL signée
    console.log(`Génération de l'URL signée pour le fichier: ${fileKey}`);

    try {
        const url = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 });
        console.log(`URL signée générée: ${url}`);
        return url;
    } catch (error) {
        console.error("Erreur lors de la génération de l’URL signée:", error);
        throw new Error('Échec de la génération de l’URL signée');
    }
};

/**
 * Supprime une image de S3.
 * @param {string} imageUrl - URL complète de l'image à supprimer
 */
const deleteImage = async (imageUrl) => {
    if (!imageUrl) {
        throw new Error("L'URL de l'image est requise pour la suppression");
    }

    const fileKey = imageUrl.split('.amazonaws.com/')[1];
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };

    // Log avant la suppression de l'image
    console.log(`Suppression de l'image: ${fileKey} du bucket: ${process.env.AWS_BUCKET_NAME}`);

    try {
        await s3.send(new DeleteObjectCommand(params));
        console.log("Suppression réussie !");
    } catch (error) {
        console.error("Erreur lors de la suppression de l'image:", error);
        throw new Error('Échec de la suppression de l’image sur S3');
    }
};

module.exports = { uploadImageForEntity, getImageUrl, deleteImage };
