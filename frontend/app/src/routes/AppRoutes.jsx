import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import PrivateRoute from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import AdminRoute from "./AdminRoute";
import CategoriesPage from "../pages/categories/CategoriesPage";
import MyNeighborsPage from "../pages/MyNeighborsPage";
import CategoryDetailsPage from "../pages/categories/CategoryDetailsPage";
import SubcategoryDetailsPage from "../pages/categories/SubCategoryDetailsPage";
import MyItemsPage from "../pages/items/MyItemsPage";
import RegisterPage from "../pages/RegisterPage";
import AddItemPage from "../pages/items/AddItemsPages";
import ItemDetailsPage from "../pages/items/ItemsDetailsPages";
import MyNeighborsItemsPages from "../pages/items/MyNeighborsItemsPage";
import AdminPage from "@/pages/AdminPage";
import ConditionOfUs from "@/pages/ConditionOfUs";
/**
 * @component AppRoutes
 * @description Gère la configuration des routes de l'application avec React Router.
 * @returns {JSX.Element} Composant contenant toutes les routes de l'application.
 */
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Layout principal (Navbar, Footer...) */}
        <Route path="/" element={<MainLayout />}>

          {/* 🏠 Page d'accueil */}
          <Route index element={<HomePage />} />
          
           {/* ⚖️Pages légales */}
          <Route path="condition-of-us" element={<ConditionOfUs />} />
           

          {/* 📂 Pages de catégories et sous-catégories */}
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:id" element={<CategoryDetailsPage />} />
          <Route path="subcategories/:id" element={<SubcategoryDetailsPage />} />

          {/* 👥 Pages de voisins */}
          <Route path="my-neighbors" element={<MyNeighborsPage />} />
          <Route path="my-neighbors/:id" element={<MyNeighborsItemsPages />} />

          {/* 🚪 Routes accessibles uniquement aux utilisateurs non connectés */}
          <Route element={<PublicRoutes />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          </Route>

          {/* 🔒 Routes protégées nécessitant une authentification */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="my-items" element={<MyItemsPage />} />
            <Route path="items/:id" element={<ItemDetailsPage />} />
            <Route path="add-item" element={<AddItemPage />} />
          </Route>


          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
