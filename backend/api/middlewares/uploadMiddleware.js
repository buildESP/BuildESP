const multer = require('multer');

const storage = multer.memoryStorage(); // Stockage en mémoire avant envoi vers S3

const upload = multer({ storage });

module.exports = upload;
