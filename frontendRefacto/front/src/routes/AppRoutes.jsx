import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import HomePage from "../pages/homepage";
import ProfilePage from "../pages/profilePage";

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
