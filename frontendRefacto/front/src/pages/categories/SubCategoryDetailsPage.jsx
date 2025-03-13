import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Box, Spinner, Text, VStack, Image } from "@chakra-ui/react";
import ItemsGallery from "../../components/items/ItemsGallery"; // ✅ Import reusable component

const SubcategoryDetailsPage = () => {
  const { id } = useParams(); // ✅ Get subcategory ID from URL
  const { data: subcategory, loading, error } = useFetchData(`/subcategories/${id}`);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!subcategory) return <Text color="gray.500">Subcategory not found.</Text>;

  return (
    <VStack spacing={6} p={6}>
      {/* ✅ Display subcategory details */}
      <Box p={4} bg="yellow.100" borderRadius="md" w="full" textAlign="center">
        <Image
          src={subcategory.image_url || "https://via.placeholder.com/300"}
          alt={subcategory.name}
          w="300px"
          h="200px"
          objectFit="cover"
          mx="auto"
          borderRadius="md"
        />
        <Text fontSize="2xl" fontWeight="bold">{subcategory.name}</Text>
      </Box>

      {/* ✅ Display items from this subcategory using reusable component */}
      <ItemsGallery items={subcategory.items} title="Items in this Subcategory" />
    </VStack>
  );
};

export default SubcategoryDetailsPage;
