import useItems from "../../hooks/useItems";
import useAuth from "../../hooks/useAuth";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

const MyItemsPage = () => {
  const { items, loading, error } = useItems();
  const { user } = useAuth();

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  // 🔹 Filtrer les items de l'utilisateur connecté
  const myItems = items ? items.filter((item) => item.user_id === user.id) : [];

  return (
    <VStack spacing={4} p={4}>
      <Text fontSize="2xl" fontWeight="bold">Mes Items</Text>
      {myItems.length ? (
        myItems.map((item) => (
          <Box key={item.id} p={4} bg="gray.100" borderRadius="md">
            <Text fontWeight="bold">{item.name}</Text>
            <Text>{item.description}</Text>
          </Box>
        ))
      ) : (
        <Text color="gray.500">Vous n'avez aucun item</Text>
      )}
    </VStack>
  );
};

export default MyItemsPage;
