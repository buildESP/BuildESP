// /routes/image.routes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware'); // ✅ Chemin corrigé
const authenticateToken = require('../middlewares/authMiddleware'); // Middleware d'authentification
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
router.post('/images/upload', authenticateToken, upload.single('image'), uploadImageController);

/**
 * @swagger
 * /api/images/delete:
 *   delete:
 *     summary: Supprime une image sur AWS S3
 *     description: Supprime une image spécifique stockée sur AWS S3 en utilisant son URL.
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "https://s3.amazonaws.com/my-bucket/images/category-123.jpg"
 *                 description: L'URL complète de l'image à supprimer
 *     responses:
 *       200:
 *         description: Image supprimée avec succès
 *       400:
 *         description: URL de l’image requise
 *       500:
 *         description: Erreur interne du serveur lors de la suppression
 */
router.delete('/images/delete', authenticateToken, deleteImageController);

module.exports = router;
