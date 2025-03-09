import useAuth from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
    const {isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to={location.state?.from || "/my-items"} replace /> : <Outlet />;
};

export default PublicRoutes;