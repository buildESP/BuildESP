import HeroSection from "../components/HeroSection";
import CategoriesGallery from "../components/CategoriesGallery";
import { Box, Skeleton } from "@chakra-ui/react";
import ItemsGallery from "@/components/items/ItemsGallery";
import useFetchData from "@/hooks/useFetchData";
const HomePage = () => {

  const { data: items, loading, error } = useFetchData("/items");

  if (loading) return <Skeleton />;
  if (error) return <Text color="red.500">{error}</Text>;


  return (
    <Box>
      <HeroSection />
      <CategoriesGallery />
      <ItemsGallery items={items} title="Objets du Voisinage"/>
    </Box>
  );
};

export default HomePage;
