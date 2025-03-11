import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import SubcategoriesList from "../../components/SubCategoriesList";

const CategoryDetailPage = () => {
  const { id } = useParams(); 
  const { data: category, loading, error } = useFetchData(`/categories/${id}`);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <VStack spacing={6} p={6}>
      <Box p={4} bg="green.300" borderRadius="md" w="full">
        <Text fontSize="2xl" fontWeight="bold">{category.name}</Text>
        <Text>{category.description || "No description available."}</Text>
      </Box>

      {/* ✅ Ensure subcategories exist before passing them */}
      {category.subcategories && (
        <SubcategoriesList subcategories={category.subcategories} />
      )}
    </VStack>
  );
};

export default CategoryDetailPage;