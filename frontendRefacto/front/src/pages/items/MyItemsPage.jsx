import useItems from "../../hooks/useItems";
import useAuth from "../../hooks/useAuth";
import { Box, Spinner, Text, VStack , HStack} from "@chakra-ui/react";
import ItemsGallery from "../../components/ItemsGallery";

const MyItemsPage = () => {
  const { items, loading, error } = useItems();
  const { user } = useAuth();

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  // 🔹 Filtrer les items de l'utilisateur connecté
  const myItems = items ? items.filter((item) => item.user_id === user.id) : [];

  return (
    <VStack spacing={8} p={4}>
    <ItemsGallery items={myItems} title="Mes Items" />

  </VStack>
  );
};

export default MyItemsPage;
