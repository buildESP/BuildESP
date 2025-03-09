import useItems from "../../hooks/useItems";
import useAuth from "../../hooks/useAuth";
import { Box, Spinner, Text, VStack , HStack} from "@chakra-ui/react";
import ItemsGallery from "../../components/items/ItemsGallery";
import EmptyItemsHero from "../../components/items/EmptyItemsHero";

const MyItemsPage = () => {
  const { items, loading, error } = useItems();
  const { user } = useAuth();

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!user) return <Text color="red.500">Utilisateur non connecté.</Text>;

  const myItems = items ? items.filter((item) => item.user_id === user.id) : [];

  return (
    <VStack spacing={8} p={4}>
      <Text fontSize="2xl" fontWeight="bold">Mes Items</Text>

      {myItems.length > 0 ? (
        <ItemsGallery items={myItems} />
      ) : (
        <EmptyItemsHero /> 
      )}
    </VStack>
  );
};

export default MyItemsPage;
