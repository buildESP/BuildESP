import React, { useState } from 'react';
import { Box, Text, Spinner, VStack, Button, HStack, Image, Badge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // 👈 import pour redirection
import useFetchData from '../hooks/useFetchData';
import useAuth from '../hooks/useAuth';

const BorrowHistory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: exchanges, loading, error } = useFetchData('/exchanges', { requiresAuth: true });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    if (loading) return <Spinner />;
    if (error) return <Text color="red.500">{error}</Text>;

    const userExchanges = exchanges?.filter(exchange => exchange.borrow_user_id === user.id) || [];

    const totalPages = Math.ceil(userExchanges.length / itemsPerPage);
    const displayedExchanges = userExchanges.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (userExchanges.length === 0) {
        return <Text>Vous n'avez emprunté aucun objet.</Text>;
    }

    return (
        <Box my={8}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Historique de vos emprunts
            </Text>

            <VStack spacing={6}>
                {displayedExchanges.map(exchange => (
                    <Box
                        key={exchange.id}
                        display="flex"
                        flexDirection={{ base: "column", md: "row" }}
                        border="1px solid #E2E8F0"
                        borderRadius="md"
                        overflow="hidden"
                        shadow="md"
                        width="100%"
                        maxW="4xl"
                        mx="auto"
                        bg="white"
                    >
                        {exchange.item ? (
                            <>
                                <Image
                                    objectFit="cover"
                                    width={{ base: "100%", md: "200px" }}
                                    height="200px"
                                    src={exchange.item.picture}
                                    alt={exchange.item.name}
                                />
                                <Box p={4} flex="1">
                                    <Text fontWeight="bold" fontSize="xl" mb={2}>
                                        {exchange.item.name}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                        Du {new Date(exchange.start_date).toLocaleDateString()} au {new Date(exchange.end_date).toLocaleDateString()}
                                    </Text>
                                    <HStack spacing={2} mt={4}>
                                        <Badge colorScheme={exchange.status === 'Accepted' ? 'green' : 'yellow'}>
                                            {exchange.status}
                                        </Badge>
                                    </HStack>

                                    <Button
                                        size="sm"
                                        mt={4}
                                        variant="outline"
                                        colorScheme="blue"
                                        onClick={() => navigate(`/items/${exchange.item.id}`)}
                                    >
                                        Voir l'objet
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box
                                    bg="gray.100"
                                    width={{ base: "100%", md: "200px" }}
                                    height="200px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text color="gray.500">Objet supprimé</Text>
                                </Box>
                                <Box p={4} flex="1">
                                    <Text fontWeight="bold" fontSize="xl" color="gray.600" mb={2}>
                                        Objet supprimé
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        Du {new Date(exchange.start_date).toLocaleDateString()} au {new Date(exchange.end_date).toLocaleDateString()}
                                    </Text>
                                    <HStack spacing={2} mt={4}>
                                        <Badge colorScheme="red">Indisponible</Badge>
                                    </HStack>
                                    <Button size="sm" mt={4} variant="outline" isDisabled>
                                        Objet supprimé
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                ))}
            </VStack>

            {/* Pagination buttons */}
            {totalPages > 1 && (
                <HStack justify="center" mt={8}>
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        isDisabled={currentPage === 1}
                    >
                        Précédent
                    </Button>
                    <Text fontWeight="bold">
                        Page {currentPage} / {totalPages}
                    </Text>
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        isDisabled={currentPage === totalPages}
                    >
                        Suivant
                    </Button>
                </HStack>
            )}
        </Box>
    );
};

export default BorrowHistory;
