const API_URL = "http://localhost:3000/api"; // Remplace par ton URL backend

// 🔹 Connexion de l'utilisateur
export const login = async (login, password) => {
  try {
    const response = await fetch(`${API_URL}/access-token`, {
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

// 🔹 Récupération des infos utilisateur
export const getUserInfo = async (token, userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
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

// 🔹 Déconnexion (supprime le token du localStorage)
export const logout = () => {
  localStorage.removeItem("token");
};
