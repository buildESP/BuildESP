// api/controllers/imageController.js
const s3Service = require('../services/s3Service'); // Import du service S3

/**
 * Contrôleur pour l'upload d'image
 */
const uploadImageController = async (req, res) => {
  try {
    console.log('Received file:', req.file);
    console.log('Received entityType:', req.body.entityType);
    console.log('Received entityId:', req.body.entityId);

    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier envoyé' });
    }

    if (!req.body.entityType || !req.body.entityId) {
      return res.status(400).json({ message: 'EntityType ou EntityId manquant' });
    }

    const imageUrl = await s3Service.uploadImageForEntity(req.file, req.body.entityType, req.body.entityId);

    return res.status(201).json({
      message: 'Image uploadée avec succès',
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error('Error during image upload:', error);
    return res.status(500).json({ message: 'Erreur lors de l’upload de l’image', error: error.message });
  }
};

/**
 * Contrôleur pour supprimer une image
 */
const deleteImageController = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'URL de l’image requise' });
    }

    await s3Service.deleteImage(imageUrl);
    
    return res.status(200).json({ message: 'Image supprimée avec succès' });
  } catch (error) {
    console.error('Error during image deletion:', error);
    return res.status(500).json({ message: 'Erreur lors de la suppression de l’image', error: error.message });
  }
};

module.exports = { uploadImageController, deleteImageController };
