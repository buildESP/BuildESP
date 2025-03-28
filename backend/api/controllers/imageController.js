const express = require('express');
const multer = require('multer');
const { uploadImageForEntity, deleteImage } = require('../services/s3Service');  // Assurez-vous que le chemin est correct
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
    // Logs pour déboguer
    console.log('Received file:', req.file);
    console.log('Received entityType:', req.body.entityType);
    console.log('Received entityId:', req.body.entityId);

    // Vérification de la présence du fichier
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier envoyé' });
    }

    // Vérification de la présence des champs entityType et entityId
    if (!req.body.entityType || !req.body.entityId) {
      return res.status(400).json({ message: 'EntityType ou EntityId manquant' });
    }

    // Appel du service pour uploader l'image sur S3
    const imageUrl = await uploadImageForEntity(req.file, req.body.entityType, req.body.entityId);
    
    // Retourner l'URL de l'image uploadée
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

    // Vérification si l'URL de l'image est présente
    if (!imageUrl) {
      return res.status(400).json({ message: 'URL de l’image requise' });
    }

    // Appel du service pour supprimer l'image sur S3
    await deleteImage(imageUrl);
    
    // Réponse après la suppression
    return res.status(200).json({ message: 'Image supprimée avec succès' });
  } catch (error) {
    console.error('Error during image deletion:', error);
    return res.status(500).json({ message: 'Erreur lors de la suppression de l’image', error: error.message });
  }
};

// Fonction pour uploader l'image sur S3
const uploadImageForEntity = async (file, entityType, entityId) => {
  try {
    console.log('Uploading file to S3...', file);

    // Code pour télécharger l'image sur S3 (exemple avec AWS SDK)
    const result = await s3.upload({
      Bucket: 's3esppitctures', // Assurez-vous que ce bucket existe
      Key: `${entityType}/${entityId}/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    }).promise();

    console.log('Upload successful:', result);
    return result.Location; // URL de l'image uploadée
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error; // Lancer l'erreur pour être capturé dans le contrôleur
  }
};

// Routes pour l'upload et la suppression d'image
app.post('/upload', upload, uploadImageController);
app.delete('/delete', deleteImageController);

module.exports = { uploadImageController, deleteImageController };
