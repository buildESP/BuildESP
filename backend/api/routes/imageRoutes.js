// /routes/image.routes.js
const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploadMiddleware'); // Middleware pour l'upload des fichiers
const authenticateToken = require('../../middlewares/authMiddleware'); // Middleware d'authentification
const { uploadImageController, deleteImageController } = require('../controllers/imageController');  // Import des contrôleurs

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Upload une image sur AWS S3 et retourne son URL
 *     description: Cette route permet d'envoyer une image sur AWS S3 et d'obtenir son URL pour l'utiliser dans une entité.
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
 *                 description: Le fichier image à uploader
 *               entityType:
 *                 type: string
 *                 example: "category"
 *                 description: Type d'entité associée (user, category, product, etc.)
 *               entityId:
 *                 type: string
 *                 example: "123"
 *                 description: Identifiant de l'entité associée
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
 *                   example: "https://s3.amazonaws.com/my-bucket/images/category-123.jpg"
 *       400:
 *         description: Aucun fichier envoyé ou données invalides
 *       500:
 *         description: Erreur interne du serveur lors de l'upload
 */
router.post('/images/upload', authenticateToken, upload.single('
