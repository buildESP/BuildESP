const express = require('express');
const multer = require('multer');
const s3Service = require('../services/s3Service');  // Import du service S3
const app = express();

// Middleware pour gérer les fichiers multipart/form-data
const upload = multer({
  fileFilter: (req, file, cb) => {
    // Autoriser uniquement les fichiers image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers image sont autorisés'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // Limite de taille du fichier à 5MB
}).single('image');  // "image" correspond au nom du champ dans le formulaire

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
