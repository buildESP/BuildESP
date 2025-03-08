import { Box, Text, Grid, GridItem, Image, Badge } from "@chakra-ui/react";

const ItemsGallery = ({ items, title = "Items" }) => {
  if (!items || items.length === 0) {
    return <Text color="gray.500">No items available.</Text>;
  }

  return (
    <Box w="full">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {title}
      </Text>
      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={4}>
        {items.map((item) => (
          <GridItem key={item.id} p={4} bg="gray.200" borderRadius="md">
            <Image
              src={item.picture || "https://via.placeholder.com/150"}
              alt={item.name}
              w="100%"
              h="150px"
              objectFit="cover"
              borderRadius="md"
            />
            <Text fontWeight="bold" mt={2}>{item.name}</Text>
            <Text fontSize="sm" color="gray.600">{item.description || "No description available."}</Text>
            <Badge mt={2} colorScheme={item.status === "Available" ? "green" : "red"}>
              {item.status}
            </Badge>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemsGallery;
