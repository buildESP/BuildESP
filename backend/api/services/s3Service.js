const s3 = require('../config/awsConfig');
const { v4: uuidv4 } = require('uuid');

const uploadImage = async (file) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `images/${uuidv4()}-${file.originalname}`, // Génère un nom unique
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read', // Rendre l'image accessible publiquement
    };

    return s3.upload(params).promise();
};

const getImageUrl = async (fileKey) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };
    return s3.getSignedUrlPromise('getObject', params);
};

module.exports = { uploadImage, getImageUrl };
