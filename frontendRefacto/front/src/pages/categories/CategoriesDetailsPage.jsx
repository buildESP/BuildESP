import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Box, Spinner, Text } from "@chakra-ui/react";

const CategoryDetailPage = () => {
  const { id } = useParams(); 
  const { data: category, loading, error } = useFetchData(`/categories/${id}`);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4} bg="gray.100" borderRadius="md">
      <Text fontWeight="bold">{category.name}</Text>
      <Text>{category.description}</Text>
    </Box>
  );
};

export default CategoryDetailPage;
