import { useState } from "react";
import { VStack, Text, Spinner, Button } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useFetchData from "../hooks/useFetchData";
import ProfileDetails from "../components/ProfileDetails";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import BorrowHistory from "../components/BorrowHistory";

const ProfilePage = () => {
  const { user } = useAuth();
  const { data: rawUserData, loading, error, refetch } = useFetchData(`/users/${user?.id}`, { requiresAuth: true });
  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  const userData = rawUserData ? { ...rawUserData, password: "" } : null;

  return (
      <VStack spacing={6} p={6} align="stretch">
        {!isEditing && userData && (
            <>
              <ProfileDetails userData={userData} />
              <Button onClick={() => setIsEditing(true)} colorPalette="teal">
                Edit Profile
              </Button>

              {/* ✅ Affiche l'historique des emprunts */}
              <BorrowHistory />
            </>
        )}

        {isEditing && userData && (
            <ProfileUpdateForm userData={userData} onSuccess={() => {
              setIsEditing(false);
              refetch();
            }}
                               onCancel={() => setIsEditing(false)}
            />
        )}
      </VStack>
  );
};

export default ProfilePage;
