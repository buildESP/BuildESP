const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand
  } = require('@aws-sdk/client-s3');
  const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
  const path = require('path');
  const dotenv = require('dotenv');
  
  // Charger .env général puis celui de /api
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
  dotenv.config({ path: path.resolve(__dirname, './.env') });
  
  const requiredEnvVars = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION", "AWS_BUCKET_NAME"];
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      console.error(`⛔ Erreur: La variable ${varName} n'est pas définie !`);
      process.exit(1);
    }
  });
  
  console.log("🔍 Initialisation du client S3 avec :");
  console.log(`  ➤ AWS_REGION: ${process.env.AWS_REGION}`);
  console.log(`  ➤ AWS_BUCKET_NAME: ${process.env.AWS_BUCKET_NAME}`);
  
  let s3;
  try {
    s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });
    console.log("✅ Client S3 initialisé !");
  } catch (error) {
    console.error("❌ Erreur client S3:", error);
    process.exit(1);
  }
  
  const uploadImageForEntity = async (file) => {
    const key = `${file.mimetype.split('/')[1]}`;
  
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };
  
    console.log(`🚀 Upload sur S3: ${key}`);
  
    try {
      await s3.send(new PutObjectCommand(params));
      console.log("✅ Upload réussi !");
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
      console.error("❌ Upload échoué:", error);
      throw new Error('Échec upload S3');
    }
  };
  
  const getImageUrl = async (fileKey) => {
    if (!fileKey) throw new Error("⛔ Clé du fichier manquante");
  
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey
    };
  
    try {
      const url = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 });
      return url;
    } catch (error) {
      throw new Error('Erreur génération URL signée');
    }
  };
  
  const deleteImage = async (imageUrl) => {
    const fileKey = imageUrl.split('.amazonaws.com/')[1];
    if (!fileKey) throw new Error("⛔ Clé introuvable dans l'URL");
  
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey
    };
  
    try {
      await s3.send(new DeleteObjectCommand(params));
    } catch (error) {
      throw new Error('Erreur suppression image');
    }
  };
  
  module.exports = { uploadImageForEntity, getImageUrl, deleteImage };
  