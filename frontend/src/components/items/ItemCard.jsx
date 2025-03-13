import { Box, Text, Image, Badge, Button, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDeleteData from "../../hooks/useDeleteData";
import { useNavigate } from "react-router-dom";
import useItems from "../../hooks/useItems";
const ItemCard = ({ item }) => {

  const { user } = useAuth();
  const { deleteData, loading } = useDeleteData(`/items/${item.id}`);
  const navigate = useNavigate();

  const { refetch } = useItems();
  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cet item ?")) {
      const success = await deleteData();
      if (success) {
        refetch(); 
        navigate("/my-items");
      }
    }
  };

  const isOwner = user && item.user_id === user.id;


  return (
    <Box
      p={4}
      bg="green.50"
      borderRadius="md"
      as={Link}
      to={`/items/${item.id}`}
      _hover={{ transform: "scale(1.03)", transition: "0.2s ease-in-out" }}
    >
      <Image
        src={item.picture || "https://via.placeholder.com/150"}
        alt={item.name}
        w="100%"
        h="150px"
        objectFit="cover"
        borderRadius="md"
      />
      <VStack align="start" mt={2} spacing={2}>
        <Text fontWeight="bold">{item.name}</Text>
        <Text fontSize="sm" color="gray.600">
          {item.description || "No description available."}
        </Text>
        <HStack justify="space-between" w="full">
          <Badge colorPalette={item.status === "Available" ? "green" : "red"}>
            {item.status}
          </Badge>
          {isOwner ? (
            <HStack>
              <Button size="xs" colorPalette="red" onClick={handleDelete} isLoading={loading}>
                Supprimer
              </Button>
              <Button size="xs" colorPalette="orange">
                Indisponible
              </Button>
            </HStack>
          ) : (
            <Button size="xs" colorPalette="blue" as={Link} to={`/items/${item.id}`}>
              Emprunter
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default ItemCard;
