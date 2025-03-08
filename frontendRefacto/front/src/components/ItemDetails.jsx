import { Box, Image, Text, VStack, Button } from "@chakra-ui/react";

const ItemDetails = ({ item, isOwner, onEdit }) => {
  return (
    <VStack spacing={4}>
      <Image src={item.picture} alt={item.name} w="100%" maxH="300px" objectFit="cover" borderRadius="md" />
      <Text fontSize="2xl" fontWeight="bold">{item.name}</Text>
      <Text>{item.description}</Text>
      <Text color="gray.600">Statut: {item.status}</Text>

      {isOwner && (
        <Button onClick={onEdit} colorScheme="blue">
          Éditer
        </Button>
      )}
    </VStack>
  );
};

export default ItemDetails;
