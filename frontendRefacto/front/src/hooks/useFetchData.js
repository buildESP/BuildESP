import { useEffect, useState, useCallback } from "react";
import useAuth from "./useAuth";

const API_BASE_URL = "http://localhost:3000/api"; // 🔹 Base URL de l'API

const useFetchData = (endpoint, { manual = false } = {}) => { // ✅ Add `manual` option
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!manual); // ✅ Only load if manual mode is false

  const fetchData = useCallback(async () => {
    if (!token) {
      setError("Aucun token trouvé. Authentification requise.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, token]);

  useEffect(() => {
    if (!manual) {
      fetchData(); // ✅ Only fetch if manual is false
    }
  }, [fetchData, manual]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
