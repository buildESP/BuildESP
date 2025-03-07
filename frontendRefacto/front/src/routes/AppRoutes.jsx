import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import HomePage from "../pages/homepage";
import ProfilePage from "../pages/profilePage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoutes"; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}> {/* ✅ Routes protégées */}
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
