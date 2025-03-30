import useFetchData from "../hooks/useFetchData";
import {
  Box,
  Text,
  Image,
  HStack,
  Skeleton,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";

const CategoriesGallery = () => {
  const { data: categories, loading, error } = useFetchData("/categories");

  if (loading) return <Skeleton height="250px" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box py={10} px={6}>
      <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center">
        Categories
      </Text>

      <Box
        overflowX="auto"
        overflowY="visible" 

        css={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollSnapType: 'x mandatory',
        }}
      >
        <HStack spacing={4} minW="max-content" px={2}>
          {/* Card "Tendance en ce moment" */}
          <Box
            minW="200px"
            h="280px"
            borderRadius="xl"
            bgGradient="to-br"
            gradientFrom="yellow.100"
            gradientTo="green.100"
            p={5}
            scrollSnapAlign="start"
            flexShrink={0}
            boxShadow="md"
          >
            <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2}>
              Ça circule en ce moment            </Text>
            <Icon as={FaFire} boxSize={6} color="orange.500" />
          </Box>

          {/* Dynamic Category Cards */}
          {categories.map((category) => (
            <Box
              key={category.id}
              as={Link}
              to={`/categories/${category.id}`}
              position="relative"
              minW="200px"
              h="280px"
              borderRadius="xl"
              overflow="hidden"
              flexShrink={0}
              scrollSnapAlign="start"
              boxShadow="md"
              _hover={{ transform: "scale(1.03)", transition: "0.3s ease" }}
            >
              <Image
                src={category.image_url}
                alt={category.name}
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
                bgGradient="linear(to-t, rgba(0,0,0,0.6), transparent)"
              >
                <Text color="white" fontSize="lg" fontWeight="bold">
                  {category.name}
                </Text>
              </Box>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default CategoriesGallery;
