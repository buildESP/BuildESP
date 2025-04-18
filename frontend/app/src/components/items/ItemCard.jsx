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
  const displayStatus = item.status === "Available" ? "Disponible" : "Indisponible";
  const statusColor = item.status === "Available" ? "green" : "orange";

  return (
    <Box
      p={4}
      borderRadius="xl"
      bg="rgba(220, 252, 231, 0.3)"
      backdropFilter="blur(10px)"
      boxShadow="0 8px 24px rgba(18, 74, 40, 0.1)"
      border="1px solid #bbf7d0"
      _hover={{
        transform: "scale(1.03)",
        transition: "0.3s ease-in-out",
        boxShadow: "0 12px 36px rgba(18, 74, 40, 0.2)",
      }}
    >
      <Link to={`/items/${item.id}`}>
        <Image
          src={item.picture || "https://via.placeholder.com/150"}
          alt={item.name}
          w="100%"
          h="150px"
          objectFit="cover"
          borderRadius="md"
        />
      </Link>

      <VStack align="start" mt={2} spacing={2}>
        {/* 🧾 Nom + statut */}
        <HStack justify="space-between" w="full">
          <Text fontWeight="bold">{item.name}</Text>
          <Badge colorPalette={statusColor}>{displayStatus}</Badge>
        </HStack>
        {/* 🛠️ Actions pour le propriétaire en dessous du titre */}
        {isOwner && (
          <HStack spacing={2}>
            <Button
              size="xs"
              variant="surface"
              colorPalette="red"
              onClick={handleDelete}
              isLoading={loading}
            >
              Supprimer
            </Button>
            {/* <Button size="xs" variant="surface" colorPalette="orange">
              Indisponible
            </Button> */}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default ItemCard;
