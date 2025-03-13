import { useState } from "react";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:3000/api"; // 🔹 Base URL de l'API

const useDeleteData = (endpoint) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * @param {string} id - L'ID de l'élément à supprimer
   * @param {string} successMessage - Message de succès personnalisé
   * @param {string} errorMessage - Message d'erreur personnalisé
   */
  const deleteData = async ( successMessage = "Suppression réussie!", errorMessage = " Échec de la suppression.") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      toast.success(successMessage);
      return true; 
    } catch (err) {
      setError(err.message);
      toast.error(errorMessage);
      return false; 
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteData;
