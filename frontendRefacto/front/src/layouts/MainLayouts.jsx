import SubMenu from "../components/SubMenu";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Breadcrumbs from "../components/navigation/Breadcrumbs";
const MainLayout = () => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh" bg="yellow.50">
    <Navbar />
    
    <Box display="flex" flexDirection="column" flex="1" pt={{ base: "3rem", md: "4rem" }}>
      <SubMenu />
      {/* <Breadcrumbs/> */}
      <Box bg="yellow.50" flex="1"> 
        <Outlet />
      </Box>
    </Box>

    <Footer />
  </Box>
);
};

export default MainLayout;
