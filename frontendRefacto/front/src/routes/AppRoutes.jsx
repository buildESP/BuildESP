import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoutes"; 
import PublicRoutes from "./PublicRoutes";
import CategoriesPage from "../pages/categories/CategoriesPage";
import CategoryDetailsPage from "../pages/categories/CategoryDetailsPage";
import SubcategoryDetailsPage from "../pages/categories/SubCategoryDetailsPage";
import MyItemsPage from "../pages/items/MyItemsPage";
import RegisterPage from "../pages/RegisterPage";
import AddItemPage from "../pages/items/AddItemsPages";
import ItemDetailsPage from "../pages/items/ItemsDetailsPages";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:id" element={<CategoryDetailsPage />} /> 
            <Route path="subcategories/:id" element={<SubcategoryDetailsPage />} />
          <Route element={<PublicRoutes />}> {/* ✅ Empêche l'accès à login si connecté */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRoute />}> {/* ✅ Routes protégées */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="my-items" element={<MyItemsPage />} />
            <Route path="items/:id" element={<ItemDetailsPage />} />

            <Route path="add-item" element={<AddItemPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
