import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SubcategoriesList = ({ subcategories }) => {
  // ✅ Ensure subcategories is always an array
  if (!subcategories || subcategories.length === 0) {
    return <Text color="gray.500">No subcategories available.</Text>;
  }

  return (
    <Box w="full">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Subcategories
      </Text>
      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={4}>
        {subcategories.map((sub) => (
          <GridItem key={sub.id} p={4} bg="gray.200" borderRadius="md" as={Link} to={`/subcategories/${sub.id}`}>
            <Text fontWeight="bold">{sub.name}</Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default SubcategoriesList;
