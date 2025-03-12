import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * 🔒 Composant de gestion des routes privées.
 * 
 * Ce composant **protège** certaines routes en empêchant les utilisateurs **non authentifiés** d'y accéder.
 * 
 * 👉 **Si l'utilisateur est connecté**, il peut voir le contenu de la page protégée.
 * 👉 **Sinon**, il est **redirigé** vers `/login` pour s'authentifier.
 *
 * @component
 * @returns {JSX.Element} - Redirection vers `/login` si non authentifié, sinon affiche la route protégée.
 */
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth(); // 🔹 Vérifie si l'utilisateur est connecté

  return isAuthenticated ? (
    //  Affiche la page demandée si l'utilisateur est connecté
    <Outlet />
  ) : (
    //  Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
