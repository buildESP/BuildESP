import { Image, Text, VStack, Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import useDeleteData from "../../hooks/useDeleteData";
import useItems from "../../hooks/useItems";
import DialogComponents from "../../components/DialogComponents.jsx";
import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import { toast } from "react-toastify";
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogActionTrigger,
    DialogCloseTrigger
} from "../../components/ui/dialog";

const ItemDetails = ({ item, isOwner, onEdit }) => {
    const navigate = useNavigate();
    const { deleteData: deleteItem, loading: loadingItem } = useDeleteData(`/items`);
    const { deleteData: deleteExchange, loading: loadingExchange } = useDeleteData(`/exchanges`);
    const { refetch } = useItems(); // Refetch des items
    const { user } = useAuth();
    const { data: exchanges, refetch: refetchExchanges } = useFetchData('/exchanges', { requiresAuth: true });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const myExchange = exchanges?.find(
        (exchange) => exchange.item_id === item.id && exchange.borrow_user_id === user?.id
    );

    const handleDeleteRequest = async () => {
        if (!myExchange) return;

        const success = await deleteExchange(myExchange.id);
        if (success) {
            toast.success("Demande d'emprunt supprimée avec succès !");
            await refetchExchanges(); // 🔄 On recharge les échanges
            await refetch();           // 🔄 On recharge aussi les items (important pour l'item.status)
        } else {
            toast.error("Erreur lors de la suppression de la demande.");
        }
        setIsDialogOpen(false);
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
            <Text color="gray.600">Statut : {item.status}</Text>

            {isOwner ? (
                <HStack spacing={3}>
                    <Button onClick={onEdit} colorScheme="blue">
                        Éditer
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={async () => {
                            if (window.confirm("Voulez-vous vraiment supprimer cet item ?")) {
                                const success = await deleteItem(item.id);
                                if (success) {
                                    await refetch();
                                    navigate("/my-items");
                                }
                            }
                        }}
                        isLoading={loadingItem}
                    >
                        Supprimer
                    </Button>
                </HStack>
            ) : (
                item.status === "Available" && user?.id !== item.user_id ? (
                    myExchange ? (
                        <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button colorScheme="red" variant="solid" isLoading={loadingExchange}>
                                    Supprimer ma demande d'emprunt
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Confirmer la suppression</DialogTitle>
                                </DialogHeader>
                                <DialogBody>
                                    <Text>Voulez-vous vraiment annuler votre demande d'emprunt pour <b>{item.name}</b> ?</Text>
                                </DialogBody>
                                <DialogFooter>
                                    <DialogCloseTrigger asChild>
                                        <Button variant="outline">Annuler</Button>
                                    </DialogCloseTrigger>
                                    <DialogActionTrigger asChild>
                                        <Button colorScheme="red" onClick={handleDeleteRequest}>
                                            Oui, annuler
                                        </Button>
                                    </DialogActionTrigger>
                                </DialogFooter>
                            </DialogContent>
                        </DialogRoot>
                    ) : (
                        <DialogComponents item={item} />
                    )
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
