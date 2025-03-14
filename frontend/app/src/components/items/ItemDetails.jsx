import { Box, Image, Text, VStack, Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import useDeleteData from "../../hooks/useDeleteData";
import useItems from "../../hooks/useItems"
const ItemDetails = ({ item, isOwner, onEdit }) => {


  const navigate = useNavigate();
  const { deleteData, loading } = useDeleteData(`/items/${item.id}`);
  const { refetch } = useItems()

  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cet item ?")) {
      const success = await deleteData();
      if (success) {
        refetch(); 
        navigate("/my-items");
      }
    }
  };


  return (
    <VStack spacing={4}>
      <Image src={item.picture} alt={item.name} w="100%" maxH="300px" objectFit="cover" borderRadius="md" />
      <Text fontSize="2xl" fontWeight="bold">{item.name}</Text>
      <Text>{item.description}</Text>
      <Text color="gray.600">Statut: {item.status}</Text>

      {isOwner ? (
        <HStack>
          <Button onClick={onEdit} colorPalette="blue">
            Éditer
          </Button>
          <Button colorPalette="red" onClick={handleDelete} isLoading={loading}>
            Supprimer l'item
          </Button>
          <Button colorPalette="orange">
            Modifier le status
          </Button>
        </HStack>
      ) : (<Button colorPalette="blue">
        Emprunter
      </Button>)}

    </VStack>
  );
};

export default ItemDetails;
