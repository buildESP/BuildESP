import useFetchData from "../../hooks/useFetchData";
import { Box, Spinner, Text, HStack } from "@chakra-ui/react";

const CategoriesPage = () => {
  const { data: categories, loading, error } = useFetchData("/categories");

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <HStack spacing={4}>
      {categories.map((category) => (
        <Box key={category.id} p={4} bg="gray.100" borderRadius="md">
          <Text fontWeight="bold">{category.name}</Text>
        </Box>
      ))}
    </HStack>
  );
};

export default CategoriesPage;
