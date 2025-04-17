import {
    Box,
    VStack,
    Text,
    HStack,
    Input,
    Button,
    Spinner,
} from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({
    chat,
    message,
    onSend,
    onTyping,
    isTyping,
    userId,
    isLoading,
    exchange
}) => {
    return (
        <Box p={4} maxW="600px" mx="auto">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
                💬 Discussion autour de : <strong>{exchange?.item?.name || "objet"}</strong>
            </Text>
            <Text fontSize="sm" mb={4} color="gray.600">
                {exchange?.borrow_user?.firstname} {exchange?.borrow_user?.lastname} vs {exchange?.lender_user?.firstname} {exchange?.lender_user?.lastname}
            </Text>

            {isLoading ? (
                <Spinner />
            ) : (
                <VStack spacing={3} align="stretch" mb={4}>
                    {chat.map((msg, idx) => {
                        const isMine = msg.sender_id === userId;

                        const sender =
                            msg.sender_id === exchange?.borrow_user?.id
                                ? exchange?.borrow_user
                                : exchange?.lender_user;

                        const senderName = `${sender?.firstname || ""} ${sender?.lastname || ""}`;
                        const avatarUrl = sender?.avatar || "";

                        return (
                            <HStack
                                key={idx}
                                alignSelf={isMine ? "flex-end" : "flex-start"}
                                spacing={2}
                                alignItems="flex-start"
                                maxW="100%"
                            >
                                {!isMine && (
                                    <Avatar name={senderName} src={avatarUrl} size="sm" />
                                )}

                                <Box
                                    bg={isMine ? "blue.100" : "gray.200"}
                                    p={3}
                                    borderRadius="md"
                                    boxShadow="sm"
                                    maxW="70%"
                                >
                                    <Text fontWeight="bold" fontSize="xs" mb={1} color="gray.600">
                                        {senderName}
                                    </Text>
                                    <Text fontSize="sm">{msg.message}</Text>
                                    <Text fontSize="xs" color="gray.500" mt={1} textAlign="right">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </Text>
                                </Box>

                                {isMine && (
                                    <Avatar name={senderName} src={avatarUrl} size="sm" />
                                )}
                            </HStack>
                        );
                    })}
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
