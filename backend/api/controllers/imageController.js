const express = require('express');
const multer = require('multer');
const { uploadImageForEntity, deleteImage } = require('/usr/src/app/services/s3Service');

const app = express();

// Middleware pour gérer les fichiers multipart/form-data
const upload = multer().single('file');

// Contrôleur pour l'upload d'image
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
        return res.status(500).json({ message: 'Erreur lors de l’upload de l’image' });
    }
};

// Route pour l'upload d'image
app.post('/upload', upload, uploadImageController);

// Route pour supprimer l'image
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
        return res.status(500).json({ message: 'Erreur lors de la suppression de l’image' });
    }
};

app.delete('/delete', deleteImageController);

module.exports = { uploadImageController, deleteImageController };
