import {
    Box,
    VStack,
    Text,
    HStack,
    Input,
    Button,
    Spinner,
} from "@chakra-ui/react";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({
                        chat,
                        message,
                        setMessage,
                        onSend,
                        onTyping,
                        isTyping,
                        userId,
                        isLoading,
                    }) => {
    return (
        <Box p={4} maxW="600px" mx="auto">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                💬 Discussion
            </Text>

            {isLoading ? (
                <Spinner />
            ) : (
                <VStack spacing={3} align="stretch" mb={4}>
                    {chat.map((msg, idx) => (
                        <Box
                            key={idx}
                            alignSelf={msg.sender_id === userId ? "flex-end" : "flex-start"}
                            bg={msg.sender_id === userId ? "blue.100" : "gray.200"}
                            p={3}
                            borderRadius="md"
                            maxW="70%"
                            boxShadow="sm"
                        >
                            <Text fontSize="sm">{msg.message}</Text>
                            <Text fontSize="xs" color="gray.500" mt={1}>
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </Text>
                        </Box>
                    ))}
                </VStack>
            )}

            <TypingIndicator isTyping={isTyping} />

            <HStack>
                <Input
                    value={message}
                    onChange={onTyping}
                    placeholder="Écris ton message ici..."
                    onKeyDown={(e) => e.key === "Enter" && onSend()}
                />
                <Button colorPalette="blue" onClick={onSend}>
                    Envoyer
                </Button>
            </HStack>
        </Box>
    );
};

export default ChatWindow;
