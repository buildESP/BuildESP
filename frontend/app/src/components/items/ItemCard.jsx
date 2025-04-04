import { Box, Text, Image, Badge, Button, VStack, HStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDeleteData from "../../hooks/useDeleteData";
import useItems from "../../hooks/useItems";

const ItemCard = ({ item }) => {
  const { user } = useAuth();
  const { deleteData, loading } = useDeleteData(`/items`);
  const navigate = useNavigate();
  const { refetch } = useItems();

  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cet item ?")) {
      const success = await deleteData(item.id);
      if (success) {
        refetch();
        navigate("/my-items");
      }
    }
  };

  const isOwner = user && item.user_id === user.id;

  const handleNavigate = () => {
    navigate(`/items/${item.id}`);
  };

  return (
    <Box
      p={4}
      bg="green.50"
      borderRadius="md"
      cursor="pointer"
      onClick={handleNavigate}
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
          <Badge colorScheme={item.status === "Available" ? "green" : "red"}>
            {item.status}
          </Badge>
          {isOwner ? (
            <HStack>
              <Button size="xs" colorScheme="red" onClick={handleDelete} isLoading={loading}>
                Supprimer
              </Button>
              <Button size="xs" colorScheme="orange">
                Indisponible
              </Button>
            </HStack>
          ) : (
            <Button
              size="xs"
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/items/${item.id}`);
              }}
            >
              Emprunter
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default ItemCard;
