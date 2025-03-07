import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const API_BASE_URL = "http://localhost:3000/api"; // 🔹 Base URL de l'API

const useFetchData = (endpoint) => {
  const { token } = useAuth(); // 🔹 Récupère le token de l'utilisateur
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setError("Aucun token trouvé. Authentification requise.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔹 Ajoute le token dans la requête
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
    };

    fetchData();
  }, [endpoint, token]); // 🔹 Dépendances: Se met à jour si `endpoint` ou `token` change

  return { data, loading, error };
};

export default useFetchData;
