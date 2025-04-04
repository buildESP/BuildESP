const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand
  } = require('@aws-sdk/client-s3');
  const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
  
  // ✅ Infos AWS en dur (attention : à ne faire que temporairement pour tests !)
  const AWS_ACCESS_KEY_ID = 'AKIA4VDBMD2P7ITQDPPJ';
  const AWS_SECRET_ACCESS_KEY = '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';
  const AWS_REGION = 'eu-west-3';
  const AWS_BUCKET_NAME = 's3esppitctures';
  
  console.log("🔍 Initialisation du client S3 avec :");
  console.log(`  ➤ AWS_REGION: ${AWS_REGION}`);
  console.log(`  ➤ AWS_BUCKET_NAME: ${AWS_BUCKET_NAME}`);
  
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
  
  const uploadImageForEntity = async (file) => {
    const key = `${file.mimetype.split('/')[1]}`;
  
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };
  
    console.log(`🚀 Upload sur S3: ${key}`);
  
    try {
      await s3.send(new PutObjectCommand(params));
      console.log("✅ Upload réussi !");
      return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
      console.error("❌ Upload échoué:", error);
      throw new Error('Échec upload S3');
    }
  };
  
  const getImageUrl = async (fileKey) => {
    if (!fileKey) throw new Error("⛔ Clé du fichier manquante");
  
    const params = {
      Bucket: AWS_BUCKET_NAME,
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
      Bucket: AWS_BUCKET_NAME,
      Key: fileKey
    };
  
    try {
      await s3.send(new DeleteObjectCommand(params));
    } catch (error) {
      throw new Error('Erreur suppression image');
    }
  };
  
  module.exports = { uploadImageForEntity, getImageUrl, deleteImage };
  