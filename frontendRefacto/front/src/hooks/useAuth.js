import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext";

/**
 * 📌 Hook personnalisé pour accéder au contexte d'authentification.
 *
 * Ce hook permet d'obtenir les informations d'authentification de l'utilisateur
 * (statut de connexion, token, méthodes `login` et `logout`).
 *
 * 🚨 **Doit être utilisé à l'intérieur d'un `<AuthProvider>` !**
 *
 * @returns {Object} - Objet contenant les informations et méthodes d'authentification.
 * @throws {Error} - Erreur si le hook est utilisé en dehors d'un `AuthProvider`.
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
};

export default useAuth;
