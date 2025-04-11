import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

/**
 * 🔒 Composant de gestion des routes publiques.
 * 
 * Ce composant empêche les utilisateurs **déjà authentifiés** d'accéder aux pages publiques 
 * comme la connexion (`/login`) ou l'inscription (`/register`).
 * 
 * 👉 **Si l'utilisateur est connecté**, il est redirigé vers `/my-items`.
 * 👉 **Sinon**, il peut accéder normalement aux routes publiques.
 *
 * @component
 * @returns {JSX.Element} - Redirection vers `/home` si connecté, sinon affiche la route publique demandée.
 */
const PublicRoutes = () => {
    const { isAuthenticated } = useAuth(); // 🔹 Vérifie si l'utilisateur est connecté

    return isAuthenticated ? (
        // ✅ Redirige vers  `/home` si connecté
        <Navigate to={location.state?.from || "/"} replace />
    ) : (
        // ✅ Affiche la route demandée si non connecté
        <Outlet />
    );
};

export default PublicRoutes;
