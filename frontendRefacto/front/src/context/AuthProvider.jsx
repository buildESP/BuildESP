import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUserInfo, logout as logoutService } from "../services/authServices";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId")); 

  const isAuthenticated = !!token;


  useEffect(() => {
    if (token && userId) {
      console.log("🔹 Récupération des infos utilisateur...");
      getUserInfo(token, userId)
        .then(setUser)
        .catch(() => {
          console.log("❌ Erreur, suppression des infos...");
          logout();
        });
    }
  }, [token, userId]);

  const login = (newToken, newUserId) => { 
    console.log("✅ Connexion réussie : Token & UserID enregistrés");
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
    setToken(newToken);
    setUserId(newUserId);
    getUserInfo(newToken, newUserId).then(setUser);
  };

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
