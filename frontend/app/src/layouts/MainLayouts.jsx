import SubMenu from "../components/navigation/SubMenu";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
/**
 * @component MainLayout
 * @description Structure de mise en page principale avec Navbar, SubMenu, et Footer.
 * @returns {JSX.Element} Layout principal pour l'application.
 */
const MainLayout = () => {


  return (
    <Box display="flex" flexDirection="column" minH="100vh" bg="yellow.50">

      {/* 🔹 Navbar fixée en haut */}
      <Box position="fixed" top="0" w="100%" zIndex="10">
        <Navbar />
      </Box>

      {/* 🔹 Contenu principal avec un padding-top pour éviter que la Navbar ne cache */}
      <Box display="flex" flexDirection="column" flex="1" pt={{ base: "3rem", md: "4rem" }}>

        <SubMenu />
        {/* <Breadcrumbs/> */}

        {/* 🔹 Outlet pour le contenu dynamique */}
        <Box flex="1" bg="yellow.50" px={{ base: "2", md: "4" }}>
          <Outlet />
        </Box>
      </Box>

      {/* 🔹 Footer toujours en bas */}
      <Box mt="auto">
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
