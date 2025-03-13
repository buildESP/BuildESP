import { API_BASE_URL } from "@/config"; 

/**
 * Authentifie un utilisateur et retourne son token et son ID.
 * @async
 * @function login
 * @param {string} login - L'identifiant de l'utilisateur (email ou username).
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<{ token: string, userId: number }>} - Token d'authentification et ID utilisateur.
 * @throws {Error} - En cas d'échec de connexion.
 */
export const login = async (login, password) => {
  console.log(API_BASE_URL)
  try {
    const response = await fetch(`${API_BASE_URL}/access-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur de connexion");
    }

    return await response.json(); // { token, userId }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Récupère les informations d'un utilisateur via son ID.
 * @async
 * @function getUserInfo
 * @param {string} token - Token d'authentification de l'utilisateur.
 * @param {number} userId - Identifiant unique de l'utilisateur.
 * @returns {Promise<Object>} - Objet contenant les informations utilisateur.
 * @throws {Error} - En cas d'échec de récupération des données.
 */
export const getUserInfo = async (token, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Impossible de récupérer les informations utilisateur.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Déconnecte l'utilisateur en supprimant son token du localStorage.
 * @function logout
 */
export const logout = () => {
  localStorage.removeItem("token");
};
