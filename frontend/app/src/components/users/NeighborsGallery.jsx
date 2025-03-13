import {

    Text,
    SimpleGrid,
    Box
} from "@chakra-ui/react";
import UserCard from "./UserCard";

const NeighborGallery = ({ users }) => {
    if (!users || users.length === 0) {
        return <Text color="gray.500">Aucun voisin disponible.</Text>;
    }

    return (
   
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} gap={4}>
                {users.map((user) => (
                    <UserCard user={user} />
                ))}
            </SimpleGrid>
    );
};

export default NeighborGallery;
