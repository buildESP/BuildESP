import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EmptyItemsHero = () => {
  const navigate = useNavigate();

  return (
    <VStack
      spacing={6}
      p={8}
      textAlign="center"
      bg="gray.50"
      borderRadius="md"
      shadow="md"
    >
      <Heading size="lg">Aucun objet disponible</Heading>
      <Text color="gray.600" maxW="lg">
        Vous n’avez encore ajouté aucun objet. Commencez dès maintenant et partagez vos outils ou objets avec la communauté !
      </Text>
      <Button colorScheme="blue" size="lg" onClick={() => navigate("/add-item")}>
        Ajouter un objet
      </Button>
    </VStack>
  );
};

export default EmptyItemsHero;
