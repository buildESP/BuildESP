import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadFile = async (fileBuffer, fileName, mimeType) => {
    try {
        console.log("Tentative d'upload sur S3...");
        console.log("AWS_REGION:", process.env.AWS_REGION);
        console.log("AWS_BUCKET_NAME:", process.env.AWS_BUCKET_NAME);
        console.log("Clé d'accès AWS:", process.env.AWS_ACCESS_KEY_ID ? "OK" : "Manquante");
        console.log("Clé secrète AWS:", process.env.AWS_SECRET_ACCESS_KEY ? "OK" : "Manquante");
        
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: fileBuffer,
            ContentType: mimeType,
            ACL: "public-read", // Rendre le fichier public
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);
        
        console.log("Upload réussi!");
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    } catch (error) {
        console.error("Erreur lors de l'upload sur S3:", error);
        throw new Error("Impossible d'upload le fichier sur S3");
    }
};

export { uploadFile };
