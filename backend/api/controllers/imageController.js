const { uploadImageForEntity, deleteImage } = require('../services/s3Service');

/**
 * Upload an image and return URL.
 */
const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier envoyé' });
        }

        const entityType = req.body.entityType || 'generic';
        const entityId = req.body.entityId || Date.now();

        const imageUrl =  await uploadImageForEntity(req.file, entityType, entityId);
        res.status(201).json({ message: 'Image uploadée avec succès', imageUrl });
    } catch (error) {
        console.error('Erreur lors de l’upload de l’image:', error);
        res.status(500).json({ message: 'Erreur lors de l’upload de l’image' });
    }
};

/**
 * Delete image in S3.
 */
const deleteImageController = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ message: 'URL de l’image requise' });
        }

        await deleteImage(imageUrl);
        res.json({ message: 'Image supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l’image:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l’image' });
    }
};

module.exports = { uploadImageController, deleteImageController };
