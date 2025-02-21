const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/**
 * Upload une image sur S3 avec un nom unique basé sur l'entité et son ID.
 * @param {Object} file - Fichier envoyé
 * @param {string} entityType - Type d'entité (ex: "user", "category")
 * @param {string} entityId - ID de l'entité
 * @returns {string} URL publique de l'image sur S3
 */
const uploadImageForEntity = async (file, entityType, entityId) => {
    const key = `images/${entityType}-${entityId}.${file.mimetype.split('/')[1]}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
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
    return getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 });
};

/**
 * Supprime une image sur S3.
 * @param {string} imageUrl - URL complète de l'image à supprimer
 */
const deleteImage = async (imageUrl) => {
    if (!imageUrl) return;

    const fileKey = imageUrl.split('.amazonaws.com/')[1];
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };

    await s3.send(new DeleteObjectCommand(params));
};

module.exports = { uploadImageForEntity, getImageUrl, deleteImage };
