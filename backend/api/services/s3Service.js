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

    await s3.send(new PutObjectCommand(params));
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
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
    return getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 });
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

    await s3.send(new DeleteObjectCommand(params));
};

module.exports = { uploadImageForEntity, getImageUrl, deleteImage };
