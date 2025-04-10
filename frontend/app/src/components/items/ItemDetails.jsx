import {
    Box,
    Image,
    Text,
    HStack,
    Button,
    Stack,
    Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import useDeleteData from "../../hooks/useDeleteData";
import useItems from "../../hooks/useItems";
import DialogComponents from "../../components/DialogComponents.jsx";
import useAuth from "../../hooks/useAuth";
import { Avatar } from "../ui/avatar";
/**
 * Composant pour afficher les détails d'un objet dans un layout responsive propre.
 */
const ItemDetails = ({ item, isOwner, onEdit }) => {
    const navigate = useNavigate();
    const { deleteData, loading } = useDeleteData(`/items`);
    const { refetch } = useItems();
    const { user } = useAuth();

    const handleDelete = async () => {
        if (window.confirm("Voulez-vous vraiment supprimer cet item ?")) {
            const success = await deleteData(item.id);
            if (success) {
                await refetch();
                navigate("/my-items");
            }
        }
    };

    // 🧠 Vérifie si l'objet est dispo selon son statut + exchanges
    const latestExchange = item.exchanges?.[item.exchanges.length - 1];
    const isUnavailable = latestExchange?.status === "Unavailable";
    const displayStatus = isUnavailable || item.status !== "Available"
        ? "Indisponible"
        : "Disponible";


    const statusColor = displayStatus === "Disponible" ? "green" : "red";

    return (
        <Box
        maxW="6xl"
        mx="auto"
        p={{ base: 4, md: 6 }}
        borderRadius="lg"
        bg="rgba(255, 255, 204, 0.25)" // soft yellow with transparency
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 0, 0.3)"
      >
            {/* Layout principal : image + texte à droite */}
            <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: 8, md: 12 }} // ✅ plus d'espace entre image et texte
                gap="8"
                align="start"
            >
                {/* 📸 Image */}
                <Box flex="1" maxW={{ base: "100%", md: "50%" }}>
                    <Image
                        src={item.picture}
                        alt={item.name}
                        w="100%"
                        h={{ base: "250px", md: "350px" }}
                        objectFit="cover"
                        borderRadius="md"
                    />
                    {/* 🎯 Boutons d'action en dessous sur mobile/desktop */}
                    <HStack mt={6} spacing={4}>
                        {isOwner ? (
                            <>
                                <Button onClick={onEdit} colorPalette="blue">
                                    Éditer
                                </Button>
                                <Button
                                    colorPalette="red"
                                    onClick={handleDelete}
                                    isLoading={loading}
                                >
                                    Supprimer
                                </Button>
                            </>
                        ) : item.status === "Available" && user?.id !== item.user_id ? (
                            <DialogComponents item={item} />
                        ) : (
                            <Text color="gray.500" fontStyle="italic">
                                {user?.id === item.user_id
                                    ? "Vous ne pouvez pas emprunter votre propre objet"
                                    : "Cet objet n'est pas disponible pour le moment"}
                            </Text>
                        )}
                    </HStack>
                </Box>

                {/* 📝 Détails item */}
                <Box flex="1" w="full">
                    <Text fontSize="2xl" color="yellow.900" fontWeight="bold" mb={2}>
                        {item.name}
                    </Text>
                    <Text mb={4} color="yellow.900">{item.description}</Text>
                    <HStack>
                        <Text  color="yellow.900" fontWeight="bold">Statut :</Text>
                        <Badge
                            colorPalette={
                                statusColor}
                        >
                            {displayStatus}
                        </Badge>
                    </HStack>

                    {/* 🧍 Info user */}
                    <Box mt={10} p={4} borderWidth="1px" borderRadius="md">
                        <HStack spacing={4}>
                            <Avatar src={item.user.picture} name={item.user.firstname} />
                            <Box>
                                <Text  color="yellow.900" fontWeight="bold">
                                    {item.user.firstname} {item.user.lastname}
                                </Text>
                                <Text fontSize="sm" color="yellow.800">
                                    {item.user.email}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    Note : {item.user.rating}
                                </Text>
                            </Box>
                        </HStack>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default ItemDetails;
