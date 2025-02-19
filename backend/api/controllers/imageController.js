const { uploadImage, getImageUrl } = require('../services/s3Service');

const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier envoyé' });
        }

        const result = await uploadImage(req.file);
        res.status(201).json({ message: 'Image uploadée avec succès', imageUrl: result.Location });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l’upload de l’image' });
    }
};

const getImageController = async (req, res) => {
    try {
        const { fileKey } = req.params;
        if (!fileKey) {
            return res.status(400).json({ message: 'Clé de fichier requise' });
        }

        const signedUrl = await getImageUrl(fileKey);
        res.json({ url: signedUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l’image' });
    }
};

module.exports = { uploadImageController, getImageController };
