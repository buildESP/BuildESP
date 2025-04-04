import { Box, Text, Grid, GridItem, Image, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SubcategoriesList = ({ subcategories, categoryName }) => {
  if (!subcategories || subcategories.length === 0) {
    return <Text color="gray.500">Aucune sous-catégorie disponible.</Text>;
  }

  return (
    <Box w="full" py={6} px={4}>


      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        justifyContent="center" 
        alignItems="start"
      >
        {subcategories.map((sub) => (
          <Box
            key={sub.id}
            as={Link}
            to={`/subcategories/${sub.id}`}
            position="relative"
            w="100%"
            maxW="250px"
            h="280px"
            borderRadius="xl"
            overflow="hidden"
            flexShrink={0}
            boxShadow="md"
            _hover={{ transform: "scale(1.03)", transition: "0.3s ease" }}
          >
            <Image
              src={sub.image_url}
              fallbackSrc="https://via.placeholder.com/300x200?text=Sous-catégorie"
              alt={sub.name}
              objectFit="cover"
              w="100%"
              h="100%"
            />

            <Box
              position="absolute"
              bottom="0"
              left="0"
              w="100%"
              px={4}
              py={3}
              bgGradient="linear(to-t, blackAlpha.700, transparent)"
              backdropFilter="blur(6px)"
            >
              <Text color="white" fontSize="lg" fontWeight="bold">
                {sub.name}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default SubcategoriesList