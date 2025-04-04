import HeroSection from "../components/HeroSection";
import CategoriesGallery from "../components/CategoriesGallery";
import { Box, Skeleton, Text } from "@chakra-ui/react";
import ItemsGallery from "@/components/items/ItemsGallery";
import useFetchData from "@/hooks/useFetchData";
import useSearch from "@/hooks/useSearch";


const HomePage = () => {
  const { data: items, loading, error } = useFetchData("/items");
  const { searchTerm, handleSearchChange } = useSearch();

  if (loading) return <Skeleton />;
  if (error) return <Text color="red.500">{error}</Text>;

  // Filter items based on searchTerm (optional)
  const filteredItems = items?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <HeroSection />
      {/* Using SearchInput component with useSearch */}
      {/* <SearchInput value={searchTerm} onChange={handleSearchChange} /> */}
      <CategoriesGallery />
      <ItemsGallery items={filteredItems} title="Objets du Voisinage" />
    </Box>
  );
};

export default HomePage;
