import { Box, Text, Grid, GridItem, Image, Badge, Button,  HStack } from "@chakra-ui/react";
import { Link } from "react-router";
import ItemCard from "./ItemCard";

const ItemsGallery = ({ items, title = "Items" }) => {
  if (!items || items.length === 0) {
    return <Text color="gray.500">No items available.</Text>;
  }

  return (
    <Box w="full">
      <HStack py={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {title}
      </Text>
          <Button as={Link} to="/add-item" colorPalette="green" size="lg">
              Ajouter un Item
              </Button>
      </HStack>
      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={4}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} /> 

        ))}
      </Grid>
    </Box>
  );
};

export default ItemsGallery;
