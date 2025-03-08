import useAuth from "../hooks/useAuth";
import useFetchData from "../hooks/useFetchData";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";

const ProfilePage = () => {
  const { user } = useAuth(); // ✅ Get logged-in user
  const { data: userData, loading, error } = useFetchData(`/users/${user?.id}`, {requiresAuth: true}); // ✅ Fetch user data

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!userData) return <Text color="gray.500">User data not found.</Text>;

  return (
    <VStack spacing={6} p={6} align="stretch">
      {/* ✅ User Info Section */}
      <Box bg="gray.100" p={6} borderRadius="md" textAlign="center">
        <Avatar size="xl" src={userData.picture || "https://via.placeholder.com/150"} />
        <Text fontSize="2xl" fontWeight="bold" mt={2}>
          {userData.firstname} {userData.lastname}
        </Text>
        <Text color="gray.600">{userData.email}</Text>
        <Text color="gray.600">{userData.address || "No address provided"}</Text>
        <Text color="gray.600">📞 {userData.phone || "No phone number"}</Text>
      </Box>


    </VStack>
  );
};

export default ProfilePage;
