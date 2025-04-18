import { Box, Text } from "@chakra-ui/react";

const MessageBubble = ({ message, isMine }) => {
    return (
        <Box
            alignSelf={isMine ? "flex-end" : "flex-start"}
            bg={isMine ? "blue.100" : "gray.200"}
            color={isMine ? "blue.900" : "gray.900"}
            p={3}
            borderRadius="lg"
            maxW="75%"
            boxShadow="sm"
        >
            <Text fontSize="sm">{message.message}</Text>
            <Text fontSize="xs" color="gray.500" mt={1} textAlign="right">
                {new Date(message.timestamp).toLocaleTimeString()}
            </Text>
        </Box>
    );
};

export default MessageBubble;
