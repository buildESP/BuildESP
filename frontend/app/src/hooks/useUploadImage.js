import { useState } from "react";

// Utilisez la variable d'environnement pour la base URL de l'API et ajoutez le port et le chemin
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}:/api`;

const useUploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Uploads an image file to the backend
   * @param {File} file - Image file to upload
   * @returns {Promise<string|null>} - URL of the uploaded image or null if failed
   */
  const uploadImage = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.imageUrl; // ✅ Retourne l'URL de l'image envoyée par l'API
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, error };
};

export default useUploadImage;
