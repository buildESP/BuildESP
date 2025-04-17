import { Box, Heading, SimpleGrid, Text, Spinner } from "@chakra-ui/react";
import useFetchData from "../hooks/useFetchData";
import useAuth from "../hooks/useAuth";
import ExchangeCard from "../components/exchanges/ExchangeCard";

const ExchangesPage = () => {
    const { user } = useAuth();
    const { data: exchanges, loading, error } = useFetchData("/exchanges", { requiresAuth: true });

    console.log(exchanges)
    if (loading) return <Spinner />;
    if (error) return <Text color="red.500">{error}</Text>;

    const myBorrowings = exchanges.filter(
        exchange => exchange.borrow_user_id === user.id && exchange.status === "Pending"
    );

    const myLendings = exchanges.filter(
        exchange => exchange.lender_user_id === user.id && exchange.status === "Approved"
    );

    return (
        <Box my={8} p={4}>
            <Heading size="lg" mb={6}>
                Mes Échanges
            </Heading>

            <Box mb={8}>
                <Heading size="md" mb={4}>
                    📚 Mes emprunts en cours
                </Heading>
                {myBorrowings.length === 0 ? (
                    <Text color="gray.500">Vous n'avez pas encore emprunté d'objets.</Text>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} spacing={6}>
                        {myBorrowings.map(exchange => (
                            <ExchangeCard key={exchange.id} exchange={exchange} />
                        ))}
                    </SimpleGrid>
                )}
            </Box>

            <Box>
                <Heading size="md" mb={4}>
                    🤝 Mes prêts en cours
                </Heading>
                {myLendings.length === 0 ? (
                    <Text color="gray.500">Vous n'avez pas encore prêté d'objets.</Text>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                        {myLendings.map(exchange => (
                            <ExchangeCard key={exchange.id} exchange={exchange} />
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </Box>
    );
};

export default ExchangesPage;
