const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

// Vérification des variables d'environnement et logs
const requiredEnvVars = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION", "AWS_BUCKET_NAME"];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`⛔ Erreur: La variable ${varName} n'est pas définie dans l'environnement !`);
    process.exit(1);
  }
});

// Initialisation du client S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

/**
 * 📌 Upload une image sur S3
 * @param {Object} file - Fichier à uploader (via Multer)
 * @param {string} entityType - Type d'entité (ex: "user", "category")
 * @param {string} entityId - ID de l'entité
 * @returns {string} URL de l'image sur S3
 */
const uploadImageForEntity = async (file, entityType, entityId) => {
  if (!file) throw new Error("⛔ Erreur: Aucun fichier fourni pour l'upload !");

  // Vérification du fichier stream
  if (!file.stream) {
    throw new Error("⛔ Erreur: Flux de fichier manquant");
  }

  const fileExtension = file.mimetype.split('/')[1] || 'txt';
  const key = `${entityType}-${entityId}.${fileExtension}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.stream,  // Utilisation du flux du fichier
    ContentType: file.mimetype,
    ACL: 'public-read'  // Permettre l'accès public aux images (ajustez si nécessaire)
  };

  console.log(`🚀 Tentative d'upload sur S3: ${key} (${file.mimetype})`);
  console.log("En-têtes de la requête:", params);

  // Ajouter des logs pour vérifier le flux de fichier
  file.stream.on('data', (chunk) => {
    console.log(`Chunk reçu: ${chunk.length} octets`);
  });

  file.stream.on('end', () => {
    console.log('Fin de la lecture du flux de fichier.');
  });

  file.stream.on('error', (err) => {
    console.error('Erreur lors de la lecture du flux de fichier:', err);
  });

  try {
    await s3.send(new PutObjectCommand(params));
    console.log("✅ Upload réussi !");
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("❌ Erreur lors de l'upload sur S3:", error);
    // Affiche les détails de l'erreur AWS
    console.error("Détails de l'erreur AWS:", error.$metadata);
    throw new Error(`Échec de l’upload de l’image sur S3: ${error.message}`);
  }
};

/**
 * 📌 Génère une URL signée pour accéder temporairement à une image privée sur S3
 * @param {string} fileKey - Nom du fichier sur S3
 * @returns {Promise<string>} URL signée temporaire (expire après 1 heure)
 */
const getImageUrl = async (fileKey) => {
  if (!fileKey) throw new Error("⛔ Erreur: Clé du fichier manquante pour la génération d'URL");

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey
  };

  console.log(`🔗 Génération d'une URL signée pour: ${fileKey}`);

  try {
    const url = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 });
    console.log(`✅ URL signée générée: ${url}`);
    return url;
  } catch (error) {
    console.error("❌ Erreur lors de la génération de l’URL signée:", error);
    throw new Error('Échec de la génération de l’URL signée');
  }
};

/**
 * 📌 Supprime une image sur S3
 * @param {string} imageUrl - URL complète de l'image à supprimer
 */
const deleteImage = async (imageUrl) => {
  if (!imageUrl) throw new Error("⛔ Erreur: URL de l'image requise pour la suppression");

  const fileKey = imageUrl.split('.amazonaws.com/')[1];
  if (!fileKey) throw new Error("⛔ Erreur: Impossible d'extraire la clé du fichier depuis l'URL");

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey
  };

  console.log(`🗑️ Suppression de l'image sur S3: ${fileKey}`);

  try {
    await s3.send(new DeleteObjectCommand(params));
    console.log("✅ Suppression réussie !");
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de l'image:", error);
    throw new Error('Échec de la suppression de l’image sur S3');
  }
};

module.exports = { uploadImageForEntity, getImageUrl, deleteImage };
