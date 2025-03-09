import { Box, Text, Image, Badge, Button, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // ✅ Correction de l'import

const ItemCard = ({ item }) => {
  return (
    <Box 
      p={4} 
      bg="gray.200" 
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
          <Badge colorScheme={item.status === "Available" ? "green" : "red"}>
            {item.status}
          </Badge>
          <Button size="xs" colorScheme="blue">
            Emprunter
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ItemCard;
