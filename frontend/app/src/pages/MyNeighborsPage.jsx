import useFetchData from "../hooks/useFetchData";
import { Box, Skeleton, Text, SimpleGrid, Image, Badge, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NeighborGallery from "../components/users/NeighborsGallery"

const MyNeighborsPage = () => {
    const { data: users, loading, error } = useFetchData("/users", { requiresAuth: true });

    if (loading) return <Skeleton height="200px" />;
    if (error) return <Text color="red.500">{error}</Text>;

    return (
        <Box p={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Mes Voisins
            </Text>
            <NeighborGallery users={users} />

        </Box>
    );
};

export default MyNeighborsPage;
