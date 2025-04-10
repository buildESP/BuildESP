
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

  return (
    <Box p={4} bg="green.50" borderRadius="md" _hover={{ transform: "scale(1.03)", transition: "0.2s ease-in-out" }}>
      {/* ✅ Wrap only the image and title in a Link */}
      <Link to={`/items/${item.id}`}>
        <Image
          src={item.picture || "https://via.placeholder.com/150"}
          alt={item.name}
          w="100%"
          h="150px"
          objectFit="cover"
          borderRadius="md"
        />
        <Text fontWeight="bold" mt={2}>{item.name}</Text>
      </Link>

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
            <Link to={`/items/${item.id}`}>
              <Button size="xs" colorPalette="blue">
                Emprunter
              </Button>
            </Link>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default ItemCard;
