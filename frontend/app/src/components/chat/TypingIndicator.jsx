import { Text, HStack, Box } from "@chakra-ui/react";



const TypingIndicator = ({ isTyping }) => {
    if (!isTyping) return null;

    return (
        <HStack mb={3} spacing={1} align="center">
            <Text fontSize="sm" color="gray.500">
                ✍️ L'utilisateur écrit
            </Text>
            <HStack spacing={1}>
                {[...Array(3)].map((_, i) => (
                    <Box
                        key={i}
                        w="6px"
                        h="6px"
                        bg="gray.400"
                        borderRadius="full"
                    />
                ))}
            </HStack>
        </HStack>
    );
};

export default TypingIndicator;
