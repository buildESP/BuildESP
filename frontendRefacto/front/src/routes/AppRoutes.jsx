import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/profilePage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoutes"; 
import PublicRoutes from "./PublicRoutes";
import CategoriesPage from "../pages/categories/CategoriesPage";
import MyItemsPage from "../pages/items/MyItemsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
            <Route path="categories" element={<CategoriesPage />} />
          <Route element={<PublicRoutes />}> {/* ✅ Empêche l'accès à login si connecté */}
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}> {/* ✅ Routes protégées */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="my-items" element={<MyItemsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
