const express = require('express');
const { uploadImageController, getImageController } = require('../controllers/imageController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Upload une image vers AWS S3
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: L'image à uploader
 *     responses:
 *       201:
 *         description: Image uploadée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image uploadée avec succès"
 *                 imageUrl:
 *                   type: string
 *                   example: "https://s3.amazonaws.com/bucket-name/image.jpg"
 *       400:
 *         description: Aucun fichier envoyé
 *       500:
 *         description: Erreur lors de l'upload de l'image
 */
router.post('/images/upload', upload.single('image'), uploadImageController);

/**
 * @swagger
 * /images/{fileKey}:
 *   get:
 *     summary: Récupère une URL signée d'une image stockée sur AWS S3
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: fileKey
 *         required: true
 *         schema:
 *           type: string
 *         description: La clé du fichier sur S3
 *     responses:
 *       200:
 *         description: URL signée générée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://s3.amazonaws.com/bucket-name/image.jpg"
 *       400:
 *         description: Clé de fichier requise
 *       500:
 *         description: Erreur lors de la récupération de l’image
 */
router.get('images/:fileKey', getImageController);

module.exports = router;
