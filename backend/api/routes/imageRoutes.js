const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const authenticateToken = require('../middlewares/authMiddleware');
const s3Service = require('../api/services/s3Service'); // Import du service S3

const { Readable } = require('stream');

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
router.post('/images/upload', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const { entityType, entityId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Aucun fichier n'a été uploadé." });
        }

        // Convertir le buffer en flux
        const bufferStream = new Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);

        file.stream = bufferStream; // Ajouter le flux à l'objet file

        const imageUrl = await s3Service.uploadImageForEntity(file, entityType, entityId);
        res.status(201).json({ message: 'Image uploadée avec succès', imageUrl });
    } catch (error) {
        console.error('Erreur lors de l\'upload:', error);
        res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image', error: error.message });
    }
});

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
router.delete('/images/delete', authenticateToken, async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: 'URL de l’image requise' });
        }

        await s3Service.deleteImage(imageUrl);
        return res.status(200).json({ message: 'Image supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        return res.status(500).json({ message: 'Erreur lors de la suppression de l’image', error: error.message });
    }
});
/**
 * @swagger
 * /api/images/list:
 *   get:
 *     summary: Liste les objets/images dans le bucket S3
 *     description: Retourne la liste des fichiers stockés dans le bucket AWS S3.
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Liste des fichiers récupérée avec succès
 *       500:
 *         description: Erreur lors de la récupération des fichiers
 */
 router.get('/images/list', authenticateToken, async (req, res) => {
    try {
        const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

        const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
        };

        const data = await s3.send(new ListObjectsV2Command(params));
        res.status(200).json(data.Contents || []);
    } catch (err) {
        console.error('❌ Erreur lors de la récupération des objets S3 :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des fichiers S3', error: err });
    }
});


module.exports = router;
