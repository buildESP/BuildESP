const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Vérification des variables d'environnement
const requiredEnvVars = ["AWS_REGION", "AWS_BUCKET_NAME"];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`⛔ Erreur: La variable ${varName} n'est pas définie dans l'environnement !`);
        process.exit(1);
    }
});

// Initialisation du client S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
});

// Configuration de Multer pour stocker directement dans S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldname: file.fieldname });
        },
        key: (req, file, cb) => {
            const fileName = `${req.body.entityType}-${req.body.entityId}.${file.originalname.split('.').pop()}`;
            cb(null, fileName);
        },
    }),
});

/**
 * 📌 Upload une image sur S3
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
const uploadImageForEntity = async (req, res) => {
    try {
        const file = req.file;
        console.log(`🚀 Tentative d'upload sur S3: ${file.key} (${file.mimetype})`);
        res.send({ message: 'Image uploadée avec succès', imageUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` });
    } catch (error) {
        console.error("❌ Erreur lors de l'upload sur S3:", error);
        res.status(500).send({ message: 'Échec de l’upload de l’image sur S3' });
    }
};

module.exports = { upload, uploadImageForEntity };
