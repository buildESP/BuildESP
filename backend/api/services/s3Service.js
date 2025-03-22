const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

// Ajout de logs pour vérifier les variables d'environnement
console.log("AWS_ACCESS_KEY:", process.env.AWS_ACCESS_KEY);
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY ? "LOADED" : "MISSING");
console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("AWS_BUCKET_NAME:", process.env.AWS_BUCKET_NAME);

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
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
    const key = `${entityType}-${entityId}.${file.mimetype.split('/')[1]}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        console.log(`Uploading image: ${key} to bucket: ${process.env.AWS_BUCKET_NAME}`);
        await s3.send(new PutObjectCommand(params));
        console.log("Upload successful!");
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
        console.error("Erreur lors de l’upload de l’image:", error);
        throw error;
    }
};

/**
 * Generates a signed URL to temporarily access a private image.
 * @param {string} fileKey - File key on S3
 * @returns {string} Temporary signed URL
 */
const getImageUrl = async (fileKey) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };
    try {
        console.log(`Generating signed URL for: ${fileKey}`);
        const url = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 });
        console.log(`Signed URL generated: ${url}`);
        return url;
    } catch (error) {
        console.error("Erreur lors de la génération de l’URL signée:", error);
        throw error;
    }
};

/**
 * Deletes an image from S3.
 * @param {string} imageUrl - Full URL of the image to be deleted
 */
const deleteImage = async (imageUrl) => {
    if (!imageUrl) return;

    const fileKey = imageUrl.split('.amazonaws.com/')[1];
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };

    try {
        console.log(`Deleting image: ${fileKey} from bucket: ${process.env.AWS_BUCKET_NAME}`);
        await s3.send(new DeleteObjectCommand(params));
        console.log("Image deleted successfully!");
    } catch (error) {
        console.error("Erreur lors de la suppression de l’image:", error);
        throw error;
    }
};

module.exports = { uploadImageForEntity, getImageUrl, deleteImage };
