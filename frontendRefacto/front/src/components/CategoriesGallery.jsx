import useFetchData from "../hooks/useFetchData";
import { Grid, GridItem, Box, Image, Text, Spinner, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CategoriesGallery = () => {
  const { data: categories, loading, error } = useFetchData("/categories");

  if (loading) return <Skeleton />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box py={10} px={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
      Categories
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} spacing={6}>
        {categories.map((category) => (
          <GridItem key={category.id} as={Link} to={`/categories/${category.id}`}>
            <Box
              bg="gray.100"
              borderRadius="md"
              overflow="hidden"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              {/* <Image
                src={category.image_url}
                alt={category.name}
                w="100%"
                h="200px"
                objectFit="cover"
              /> */}
              <Text fontSize="lg" fontWeight="bold" textAlign="center" py={3}>
                {category.name}
              </Text>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CategoriesGallery;
