import { useEffect, useState, useCallback } from "react";
import useAuth from "./useAuth";

const API_BASE_URL = "http://localhost:3000/api"; // 🔹 Base URL de l'API

const useFetchData = (endpoint, { requiresAuth = false, manual = false } = {}) => { 
  const { token } = useAuth(); // Get token from auth context
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!manual); 

  const fetchData = useCallback(async () => {
    if (requiresAuth && !token) { 
      setError(" Authentification requise.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const headers = {
        "Content-Type": "application/json",
      };

      if (requiresAuth && token) {  //  Add Authorization header only when needed
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers,
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
  }, [endpoint, token, requiresAuth]);

  useEffect(() => {
    if (!manual) {
      fetchData(); 
    }
  }, [fetchData, manual]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
