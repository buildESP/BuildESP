import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Box, Spinner, Text, Image, HStack } from "@chakra-ui/react";

const CategoryDetailsPage = () => {
  const { id } = useParams(); // ✅ Get category ID from URL
  const { data: category, loading, error } = useFetchData(`/categories/${id}`);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!category) return <Text color="gray.500">Category not found.</Text>;

  return (
    <HStack spacing={4} p={6}>
      <Image src={category.image_url} alt={category.name} w="300px" h="200px" objectFit="cover" />
      <Text fontSize="2xl" fontWeight="bold">{category.name}</Text>
      <Text>{category.description || "No description available."}</Text>
    </HStack>
  );
};

export default CategoryDetailsPage;