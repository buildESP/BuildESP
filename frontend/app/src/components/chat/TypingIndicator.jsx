import { Text, HStack, Box, keyframes } from "@chakra-ui/react";

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0) }
  40% { transform: scale(1.0) }
`;

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
                        animation={`${bounce} 1.4s infinite ease-in-out ${i * 0.2}s`}
                    />
                ))}
            </HStack>
        </HStack>
    );
};

export default TypingIndicator;
