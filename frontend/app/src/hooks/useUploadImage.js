import { useState } from "react";
import { API_BASE_URL } from "@/config";
import useAuth from "./useAuth";


const useUploadImage = () => {
  const { token } = useAuth();
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
      const response = await fetch(`${API_BASE_URL}/images/upload`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
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
