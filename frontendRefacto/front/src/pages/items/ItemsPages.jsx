import useFetchData from "../../hooks/useFetchData";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

const ItemsPage = () => {
  const { data: items, loading, error } = useFetchData("/items");

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <VStack spacing={4}>
      {items.map((item) => (
        <Box key={item.id} p={4} bg="gray.100" borderRadius="md">
          <Text fontWeight="bold">{item.name}</Text>
          <Text>{item.description}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default ItemsPage;
