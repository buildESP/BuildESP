import { useState } from "react";
import useAuth from "./useAuth";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/config";


const usePutData = (endpoint) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * @param {Object} updatedData - The new form data
   * @param {Object} originalData - The existing data from the API
   * @param {string} successMessage - Custom success message
   * @param {string} errorMessage - Custom error message
   */
  const putData = async (updatedData, originalData, successMessage = " Updated successfully!", errorMessage = " Update failed.") => {
    setLoading(true);
    setError(null);

    const isModified = Object.entries(updatedData).some(([key, value]) => value !== originalData[key]);

    if (!isModified) {
      toast.info("No changes detected.");
      setLoading(false);
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(updatedData), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      const result = await response.json();
      toast.success(successMessage);
      return result;
    } catch (err) {
      setError(err.message);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { putData, loading, error };
};

export default usePutData;
