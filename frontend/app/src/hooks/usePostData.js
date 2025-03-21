// src/hooks/usePostData.js
import { useState } from "react";
import useAuth from "./useAuth";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/config"; // Import de la variable depuis config.js

const usePostData = (endpoint) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (data, successMessage = " Successfully submitted!", errorMessage = " An error occurred.") => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify(data),
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

    return { postData, loading, error };
};

export default usePostData;
