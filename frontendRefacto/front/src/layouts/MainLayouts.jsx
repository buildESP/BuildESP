import SubMenu from "../components/SubMenu";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <>
      
    <Navbar />
    <SubMenu/>
    <Outlet />
    <Footer/>
  

    </>
  );
};

export default MainLayout;
