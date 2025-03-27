import { Link as RouterLink } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <Box
      bgGradient="to-br"
      gradientFrom="green.200"
      gradientTo="yellow.50"
      py={16}
      px={8}
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >

      <Heading as="h1" size="xl" color="green.900" mb={4}>
        Partagez et empruntez des outils avec vos voisins      </Heading>
      <Text fontSize="lg" color="green.800" maxW="600px" mb={6}>
        Neighborrow est une plateforme où vous pouvez prêter et emprunter des outils et équipements dans votre quartier. Économisez de l'argent, réduisez les déchets et créez du lien avec votre communauté !

      </Text>
      {user ? (
        <Button as={RouterLink} to="/add-item" colorPalette="teal" size="lg">
          Partager un objet        </Button>
      ) : (
        <Button as={RouterLink} to="/login" colorPalette="teal" size="lg">
          Emprunter un objet        </Button>
      )}
    </Box>
  );
};

export default HeroSection;
