import { Box, Text, Spinner } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";

const ProfileDetails = ({ userData, loading, error }) => {
  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!userData) return <Text color="gray.500">Les données utilisateur n'ont pas été trouvées</Text>;

  return (
    <Box bg="green.50" p={6} borderRadius="md" textAlign="center">
      <Avatar size="xl" src={userData.picture || "https://via.placeholder.com/150"} />
      <Text fontSize="2xl" fontWeight="bold" mt={2}>
        {userData.firstname} {userData.lastname}
      </Text>
      <Text color="green.900">{userData.email}</Text>
      <Text color="green.900">{userData.address || "Pas d'adresse renseignée"}</Text>
      <Text color="green.900">📞 {userData.phone || "Pas de numéro de téléphone"}</Text>
    </Box>
  );
};

export default ProfileDetails;
