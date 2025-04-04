// api/services/s3Service.js
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Configuration via les variables d'environnement
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Initialisation du client S3
let s3;
try {
  s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
  });
  console.log("✅ Client S3 initialisé !");
} catch (error) {
  console.error("❌ Erreur client S3:", error);
  process.exit(1);
}

// Fonction pour uploader une image
const uploadImageForEntity = async (file, entityType, entityId) => {
  const extension = file.mimetype.split('/')[1];
  const key = `${entityType}-${entityId}.${extension}`;

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'  // Permet à l'image d'être accessible publiquement
  };

  try {
    await s3.send(new PutObjectCommand(params));
    return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("❌ Upload échoué:", error);
    throw new Error('Échec upload S3');
  }
};

// Fonction pour générer une URL signée pour un fichier
const getImageUrl = async (fileKey) => {
  if (!fileKey) throw new Error("⛔ Clé du fichier manquante");

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileKey
  };

  try {
    const url = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 }); // L'URL expire dans 1 heure
    return url;
  } catch (error) {
    console.error('❌ Erreur génération URL signée:', error);
    throw new Error('Erreur génération URL signée');
  }
};

// Fonction pour supprimer une image
const deleteImage = async (imageUrl) => {
  const fileKey = imageUrl.split('.amazonaws.com/')[1];
  if (!fileKey) throw new Error("⛔ Clé introuvable dans l'URL");

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileKey
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
    console.log(`✅ Image supprimée : ${fileKey}`);
  } catch (error) {
    console.error('❌ Erreur suppression image:', error);
    throw new Error('Erreur suppression image');
  }
};

// Fonction pour lister les fichiers dans le bucket S3
const listImages = async () => {
  try {
    const params = { Bucket: AWS_BUCKET_NAME };
    const data = await s3.send(new ListObjectsV2Command(params));
    return data.Contents || [];
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des objets S3 :", error);
    throw new Error("Erreur lors de la récupération des fichiers S3");
  }
};

module.exports = {
  uploadImageForEntity,
  getImageUrl,
  deleteImage,
  listImages
};
