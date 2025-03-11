import SubMenu from "../components/SubMenu";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Breadcrumbs from "../components/navigation/Breadcrumbs";
const MainLayout = () => {
  return (
          <Box display="flex" flexDirection="column" minH="100vh">

    <Navbar />
    <SubMenu/>
    {/* <Breadcrumbs/> */}
    <Box flex="1">
        <Outlet />
      </Box>
          <Footer/>
  
</Box>
  );
};

export default MainLayout;
