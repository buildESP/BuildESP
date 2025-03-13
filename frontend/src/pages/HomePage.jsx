import HeroSection from "../components/HeroSection";
import CategoriesGallery from "../components/CategoriesGallery";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <CategoriesGallery />
    </Box>
  );
};

export default HomePage;
