import { useState } from "react";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

// Utilisez la variable d'environnement pour la base URL de l'API et ajoutez le port et le chemin
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}:/api`;

/**
 * Hook personnalisé pour supprimer des données via l'API.
 * @param {string} basePath - Le chemin de base de l'API (ex: "/items").
 * @returns {Object} - { deleteData, loading, error }
 */
 const useDeleteData = (basePath) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Supprime un ou plusieurs éléments individuellement.
   * @param {string | string[]} ids - Un ID unique ou un tableau d'IDs à supprimer.
   * @returns {boolean} - True si la suppression est réussie, sinon False.
   */
  const deleteData = async (ids) => {
    setLoading(true);
    setError(null);

    // Convertir un ID unique en tableau pour uniformiser le traitement
    const idList = Array.isArray(ids) ? ids : [ids];

    try {
      if (idList.length === 0) throw new Error("Aucun ID fourni pour la suppression.");

      const formattedPath = basePath.startsWith("/") ? basePath : `/${basePath}`;

      for (const id of idList) {
        const response = await fetch(`${API_BASE_URL}${formattedPath}/${id}`, {
          method: "DELETE",
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Erreur ${response.status} lors de la suppression de l'élément ${id}`);
        }

        console.log(`✅ ${basePath} supprimé avec succès`);
        toast.success(`${basePath}  supprimé avec succès`);
      }

      return true;
    } catch (err) {
      setError(err.message);
      toast.error(`Erreur : ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteData;
