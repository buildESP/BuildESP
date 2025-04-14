import { Box, Text, Badge, VStack } from "@chakra-ui/react";

const ExchangeCard = ({ exchange }) => {
    const { item, status, start_date, end_date } = exchange;

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            shadow="md"
            bg="white"
            width="100%"
        >
            {item ? (
                <>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        {item.name}
                    </Text>
                    <Badge colorScheme={status === "Accepted" ? "green" : status === "Pending" ? "yellow" : "red"}>
                        {status}
                    </Badge>
                    <VStack align="start" spacing={1} mt={3}>
                        <Text fontSize="sm" color="gray.600">
                            Du {new Date(start_date).toLocaleDateString()} au {new Date(end_date).toLocaleDateString()}
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
