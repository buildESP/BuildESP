import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUserInfo, logout as logoutService } from "../services/authServices";

/**
 * 📌 Fournit le contexte d'authentification à l'application.
 *
 * Ce Provider :
 * - Stocke l'utilisateur et son token après connexion.
 * - Récupère les infos utilisateur depuis l'API.
 * - Gère la persistance des informations via `localStorage`.
 *
 * @component
 * @param {React.ReactNode} children - Les composants enfants qui auront accès au contexte.
 * @returns {JSX.Element} - Composant Provider pour l'authentification.
 */
const AuthProvider = ({ children }) => {
  // 🔹 États d'authentification
  const [user, setUser] = useState(null); // ✅ Stocke les infos utilisateur
  const [token, setToken] = useState(localStorage.getItem("token")); // ✅ Token JWT
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // ✅ ID utilisateur
  const isAuthenticated = !!token; // ✅ Indique si l'utilisateur est connecté

  /**
   * 🔄 **Récupère les infos utilisateur au chargement**
   * - Exécuté si un `token` et `userId` sont présents.
   * - Charge les informations utilisateur via `getUserInfo()`.
   * - En cas d'erreur, exécute `logout()`.
   */
  useEffect(() => {
    if (token && userId) {
      console.log("🔹 Récupération des infos utilisateur...");
      getUserInfo(token, userId)
        .then(setUser) // ✅ Stocke les infos utilisateur
        .catch(() => {
          console.log("❌ Erreur, suppression des infos...");
          logout(); // ✅ Déconnecte l'utilisateur en cas d'erreur
        });
    }
  }, [token, userId]);

  /**
   * ✅ **Connexion de l'utilisateur**
   * - Stocke `token` et `userId` dans `localStorage` et `state`.
   * - Charge les infos utilisateur après connexion.
   *
   * @param {string} newToken - Token d'authentification.
   * @param {string} newUserId - ID de l'utilisateur.
   */
  const login = (newToken, newUserId) => {
    console.log("✅ Connexion réussie : Token & UserID enregistrés");
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
    setToken(newToken);
    setUserId(newUserId);
    getUserInfo(newToken, newUserId).then(setUser); // ✅ Récupère les infos utilisateur après login
  };

  /**
   * 🚪 **Déconnexion de l'utilisateur**
   * - Supprime `token` et `userId` du `localStorage`.
   * - Réinitialise `user`, `token` et `userId` dans `state`.
   */
  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
