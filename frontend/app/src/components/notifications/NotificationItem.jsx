import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import usePutData from "../../hooks/usePutData";

const NotificationItem = ({ exchange, refetch, navigate }) => {
    const { putData, loading } = usePutData(`/exchanges/${exchange.id}`);

    const handleAccept = async () => {
        await putData(
            { ...exchange, status: "Approved" },
            exchange,
            "Demande acceptée !",
            "Erreur lors de l'acceptation"
        );
        refetch();
    };

    const handleDecline = async () => {
        await putData(
            { ...exchange, status: "Declined" },
            exchange,
            "Demande refusée.",
            "Erreur lors du refus"
        );
        refetch();
    };

    return (
        <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
        >
            <Stack spacing={2}>
                <Text>
                    <strong>Objet :</strong> {exchange.item?.name || "Objet supprimé"}
                </Text>
                <Text>
                    <strong>Demandeur :</strong> {exchange.borrow_user?.firstname} {exchange.borrow_user?.lastname}
                </Text>

                <HStack spacing={2} mt={2}>
                    <Button
                        size="sm"
                        colorScheme="red"
                        flex="1"
                        onClick={handleDecline}
                        leftIcon={<LuX />}
                        isLoading={loading}
                    >
                        Refuser
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="green"
                        flex="1"
                        onClick={handleAccept}
                        leftIcon={<LuCheck />}
                        isLoading={loading}
                    >
                        Accepter
                    </Button>
                </HStack>

                {exchange.item && (
                    <Button
                        variant="link"
                        colorScheme="blue"
                        size="sm"
                        onClick={() => navigate(`/items/${exchange.item.id}`)}
                    >
                        Voir l'objet
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default NotificationItem;
