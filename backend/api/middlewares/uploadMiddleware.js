// middlewares/uploadMiddleware.js
const multer = require('multer');

// Stockage en mémoire pour que le fichier soit accessible dans la requête sous req.file
const storage = multer.memoryStorage();

// Configuration de multer pour accepter uniquement les images et définir une taille maximale (5MB ici)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limite à 5 Mo
  fileFilter: (req, file, cb) => {
    // Vérifier que le fichier est bien une image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers images sont autorisés'), false);
    }
  }
});

module.exports = upload;
