import { Image, Text, VStack, Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import useDeleteData from "../../hooks/useDeleteData";
import useItems from "../../hooks/useItems";
import DialogComponents from "../../components/DialogComponents.jsx";
import useAuth from "../../hooks/useAuth";

/**
 * Composant pour afficher les détails d'un objet et gérer les actions (emprunt, suppression, etc.).
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.item - L'objet à afficher.
 * @param {boolean} props.isOwner - Indique si l'utilisateur actuel est le propriétaire de l'objet.
 * @param {Function} props.onEdit - Fonction à exécuter pour éditer l'objet.
 * @returns {JSX.Element} - Le composant de détails de l'objet.
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

    return (
        <VStack spacing={4} align="stretch">
            <Image
                src={item.picture}
                alt={item.name}
                w="100%"
                maxH="300px"
                objectFit="cover"
                borderRadius="md"
            />
            <Text fontSize="2xl" fontWeight="bold">{item.name}</Text>
            <Text>{item.description}</Text>
            <Text color="gray.600">Statut: {item.status}</Text>

            {isOwner ? (
                <HStack spacing={3}>
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
                    <Button colorPalette="orange">
                        Modifier le statut
                    </Button>
                </HStack>
            ) : (
                item.status === "Available" && user?.id !== item.user_id ? (
                    <DialogComponents item={item} />
                ) : (
                    <Text color="gray.500" fontStyle="italic">
                        {!user || user.id === item.user_id
                            ? "Vous ne pouvez pas emprunter votre propre objet"
                            : "Cet objet n'est pas disponible pour le moment"}
                    </Text>
                )
            )}
        </VStack>
    );
};

export default ItemDetails;