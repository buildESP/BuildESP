import {
    Box,
    Text,
    Badge,
    Button,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useDeleteData from "../../hooks/useDeleteData";
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogActionTrigger,
} from "../ui/dialog";

const ExchangeCard = ({ exchange, onRefetch }) => {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { deleteData, loading } = useDeleteData("/exchanges");

    const handleCardClick = () => {
        navigate(`/items/${exchange.item.id}`);
    };

    const handleCancelExchange = async () => {
        const success = await deleteData(exchange.id);
        if (success) {
            toast.success("Échange annulé/terminé avec succès.");
            if (onRefetch) await onRefetch();
        } else {
            toast.error("Erreur lors de l'annulation de l'échange.");
        }
        setIsDialogOpen(false);
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            shadow="md"
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
            onClick={handleCardClick}
        >
            <VStack align="start" spacing={2}>
                <Text fontWeight="bold">{exchange.item?.name || "Objet inconnu"}</Text>

                {exchange.status === "Approved" && (
                    <Badge colorPalette="green">Approuvé</Badge>
                )}

                <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            size="sm"
                            colorPalette="red"
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsDialogOpen(true);
                            }}
                            isLoading={loading}
                        >
                            Annuler / Terminer
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader style={{ position: "relative" }}>
                            <DialogTitle>Confirmer l'action</DialogTitle>

                            {/* ✕ Fermer en haut */}
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsDialogOpen(false)}
                                style={{
                                    position: "absolute",
                                    top: "0.5rem",
                                    right: "0.5rem",
                                    fontSize: "1.2rem",
                                    lineHeight: "1",
                                }}
                                aria-label="Fermer"
                            >
                                ✕
                            </Button>
                        </DialogHeader>

                        <DialogBody>
                            <Text>
                                Voulez-vous vraiment annuler ou terminer cet échange pour{" "}
                                <strong>{exchange.item?.name}</strong> ?
                            </Text>
                        </DialogBody>

                        <DialogFooter>
                            <DialogActionTrigger asChild>
                                <Button colorPalette="red" onClick={handleCancelExchange}>
                                    Oui, confirmer
                                </Button>
                            </DialogActionTrigger>
                        </DialogFooter>
                    </DialogContent>
                </DialogRoot>
            </VStack>
        </Box>
    );
};

export default ExchangeCard;
