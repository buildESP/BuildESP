import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import {
    DialogRoot,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
} from "../ui/dialog";
import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import NotificationItem from "./NotificationItem"; // 👈 Nouveau composant

const NotificationsDialog = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const { data: exchanges, refetch } = useFetchData("/exchanges", { requiresAuth: true });
    const navigate = useNavigate();

    const pendingRequests = exchanges?.filter(
        (exchange) => exchange.lender_user_id === user?.id && exchange.status === "Pending"
    ) || [];

    return (
        <DialogRoot open={isOpen} onOpenChange={(e) => (e.open ? null : onClose())}>
            <DialogContent maxW="lg">
                <DialogHeader>
                    <DialogTitle>Demandes d'emprunt reçues</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <VStack spacing={4} align="stretch">
                        {pendingRequests.length === 0 ? (
                            <Text color="gray.500">Aucune nouvelle demande.</Text>
                        ) : (
                            pendingRequests.map((exchange) => (
                                <NotificationItem
                                    key={exchange.id}
                                    exchange={exchange}
                                    refetch={refetch}
                                    navigate={navigate}
                                />
                            ))
                        )}
                        <Button variant="outline" mt={4} onClick={onClose}>
                            Fermer
                        </Button>
                    </VStack>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};

export default NotificationsDialog;
