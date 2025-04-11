// src/hooks/useUploadImage.js
import { useState } from "react";
import { API_BASE_URL } from "@/config";  // Assurez-vous que API_BASE_URL est défini correctement
import useAuth from "./useAuth";

const useUploadImage = () => {
  const { token } = useAuth();  // Vous récupérez le token d'authentification
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Uploads an image file to the backend
   * @param {File} file - Image file to upload
   * @returns {Promise<string|null>} - URL of the uploaded image or null if failed
   */
  const uploadImage = async (file, entityType, entityId) => {
    if (!file || !entityType || !entityId) {
      console.warn("🚨 Missing file, entityType, or entityId");
      return null;
    }

    const formData = new FormData(); 
    formData.append("image", file);

    if (entityType) formData.append("entityType", entityType);
    if (entityId) formData.append("entityId", entityId);

    setUploading(true);
    setError(null);
    for (let [key, value] of formData.entries()) {
      console.log(`🧪 ${key}:`, value);
    }
    

    try {
      // Vérification du token avant envoi
      if (!token) {
        console.error("Token manquant");
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/images/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,  // Envoi du token d'autorisation
        },
        body: formData,
      });

      // Vérification de la réponse du serveur
      if (!response.ok) {
        console.error(`Upload failed with status ${response.status}`);
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse du serveur:", data);  // Vérification de la réponse du serveur

      return data.imageUrl;  // Retourne l'URL de l'image
    } catch (err) {
      console.error("Erreur lors de l'upload:", err.message);  // Log de l'erreur
      setError(err.message);
      return null;
    } finally {
      setUploading(false);  // Fin du chargement
    }
  };

  return { uploadImage, uploading, error };
};

export default useUploadImage;