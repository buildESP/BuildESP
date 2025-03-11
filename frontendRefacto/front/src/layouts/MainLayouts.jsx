import SubMenu from "../components/SubMenu";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { Outlet } from "react-router";
import Breadcrumbs from "../components/navigation/Breadcrumbs";
const MainLayout = () => {
  return (
    <>
      
    <Navbar />
    <SubMenu/>
    {/* <Breadcrumbs/> */}
    <Outlet />
    <Footer/>
  

    </>
  );
};

export default MainLayout;
