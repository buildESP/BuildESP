import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  console.log("Admin route isAmdin " + isAdmin)
  // 🔄 Attendre que `user` soit bien chargé avant de décider
  if (user === null) return null; 

  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
