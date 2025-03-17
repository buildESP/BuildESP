import useItems from "../../hooks/useItems";
import { Box, Spinner, Text, VStack , HStack, Skeleton} from "@chakra-ui/react";
import ItemsGallery from "../../components/items/ItemsGallery";
import EmptyItemsHero from "../../components/items/EmptyItemsHero";
import { useParams } from "react-router";

const MyNeighborsItemsPages = () => {
  const { items, loading, error } = useItems();
  const { id: neighborId } = useParams(); 

  if (loading) return <Skeleton />;
  if (error) return <Text color="red.500">{error}</Text>;

  const neighborItems = items ? items.filter((item) => item.user_id === Number(neighborId)) : [];

  return (
    <VStack spacing={8} p={4}>
      <Text fontSize="2xl" fontWeight="bold">Item de {neighborId} </Text>

      {neighborItems.length > 0 ? (
        <ItemsGallery items={neighborItems} />
      ) : (
        <EmptyItemsHero /> 
      )}
    </VStack>
  );
};

export default MyNeighborsItemsPages;
