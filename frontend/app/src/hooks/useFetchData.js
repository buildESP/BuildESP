import { useEffect, useState, useCallback } from "react";
import useAuth from "./useAuth";
import { API_BASE_URL } from "@/config";

/**
 * 📌 Hook personnalisé pour récupérer des données depuis l'API.
 *
 * Ce hook facilite la récupération de données en gérant **le chargement, les erreurs** et **le rechargement**.
 * Il peut être utilisé avec ou sans **authentification** et permet de contrôler manuellement l'exécution.
 *
 * @param {string} endpoint - L'URL de l'endpoint à appeler (ex: `/items`).
 * @param {Object} [options] - Options de configuration.
 * @param {boolean} [options.requiresAuth=false] - Indique si l'appel nécessite une authentification.
 * @param {boolean} [options.manual=false] - Permet de déclencher la requête manuellement via `refetch()`.
 * @returns {Object} - Contient les données récupérées, l'état de chargement, une erreur éventuelle et une fonction `refetch`.
 */
const useFetchData = (endpoint, { requiresAuth = false, manual = false } = {}) => {
  const { token } = useAuth(); // 🔹 Récupère le token depuis le contexte d'authentification
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!manual); // ✅ Active le chargement sauf si mode manuel

  /**
   * 🔄 Fonction pour récupérer les données depuis l'API.
   * - Ajoute l'en-tête `Authorization` si `requiresAuth` est activé.
   * - Met à jour les états `loading`, `data` et `error`.
   */
  const fetchData = useCallback(async () => {
    if (requiresAuth && !token) {
      setError("🔒 Authentification requise.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const headers = {
        "Content-Type": "application/json",
        ...(requiresAuth && token && { Authorization: `Bearer ${token}` }), // ✅ Ajout conditionnel du token
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`❌ Erreur ${response.status}: ${response.statusText}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, token, requiresAuth]);

  /**
   * 🔄 Exécute `fetchData` automatiquement sauf si l'option `manual` est activée.
   */
  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [fetchData, manual]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
