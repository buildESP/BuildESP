import {
    Box,
    Text,
    Badge,
    VStack,
    Button,
    HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoChatboxEllipses } from "react-icons/io5";
import { Tooltip } from "../ui/tooltip";
const ExchangeCard = ({ exchange }) => {
    const { item, status, start_date, end_date, id: exchangeId } = exchange;
    const navigate = useNavigate();

    const handleChatClick = () => {
        navigate(`/chat/${exchangeId}`);
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            shadow="md"
            bg="white"
            width="100%"
            _hover={{ bg: "gray.50", transition: "0.2s" }}
        >
            {item ? (
                <>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        {item.name}
                    </Text>

                    <HStack justify="space-between" mb={2}>
                        <Badge
                            colorPalette={
                                status === "Approved"
                                    ? "green"
                                    : status === "Pending"
                                        ? "yellow"
                                        : "red"
                            }
                        >
                            {status}
                        </Badge>

                        {status === "Approved" && (
                            <Tooltip label="Ouvrir le chat" hasArrow>
                                <Button
                                    size="sm"
                                    colorPalette="blue"
                                    variant="outline"
                                    leftIcon={<IoChatboxEllipses />}
                                    onClick={handleChatClick}
                                >
                                    Discuter
                                </Button>
                            </Tooltip>
                        )}
                    </HStack>

                    <VStack align="start" spacing={1} mt={1}>
                        <Text fontSize="sm" color="gray.600">
                            Du {new Date(start_date).toLocaleDateString()} au{" "}
                            {new Date(end_date).toLocaleDateString()}
                        </Text>
                    </VStack>
                </>
            ) : (
                <Text color="gray.500">Objet supprimé</Text>
            )}
        </Box>
    );
};

export default ExchangeCard;
