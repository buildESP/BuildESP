const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
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
    console.log('Uploading image for entity:', entityType, entityId);
    const key = `${entityType}-${entityId}.${file.mimetype.split('/')[1]}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3.send(new PutObjectCommand(params));
        console.log('Image uploaded successfully:', key);
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

module.exports = { uploadImageForEntity };
