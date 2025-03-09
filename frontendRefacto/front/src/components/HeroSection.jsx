import { Link as RouterLink } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <Box
      bg="green.50"
      py={16}
      px={8}
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >

      <Heading as="h1" size="xl" color="green.900" mb={4}>
        Share & Borrow Tools with Your Neighbors
      </Heading>
      <Text fontSize="lg" color="gray.600" maxW="600px" mb={6}>
        Neighborrow is a platform where you can lend and borrow tools and devices 
        from your neighborhood. Save money, reduce waste, and connect with your community!
      </Text>
      {user ? (
        <Button as={RouterLink} to="/add-item" colorScheme="blue" size="lg">
          Add an Item
        </Button>
      ) : (
        <Button as={RouterLink} to="/login" colorScheme="teal" size="lg">
          Get Started
        </Button>
      )}
    </Box>
  );
};

export default HeroSection;
