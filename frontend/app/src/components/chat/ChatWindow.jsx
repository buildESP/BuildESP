import {
    Box,
    HStack,
    Input,
    Button,
    Image,
    Text,
    VStack,
    Spinner,
    Flex,
    Card,
    IconButton
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

import TypingIndicator from "./TypingIndicator";
import { Avatar } from "../ui/avatar";
import { LuArrowLeft } from "react-icons/lu";
const ChatWindow = ({
    chat,
    message,
    onSend,
    onTyping,
    isTyping,
    userId,
    isLoading,
    exchange,
}) => {
    const item = exchange?.item;
    const borrower = exchange?.borrow_user;
    const lender = exchange?.lender_user;
    const chatBoxRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({
                top: chatBoxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chat]);


    return (
        <Box maxW="700px" mx="auto" my={8} >
            <Card.Root height="80vh" display="flex" flexDirection="column" overflow="hidden">
                {/* Header */}
                <Card.Header borderBottomWidth="1px" bg="teal.50">
                    <HStack spacing={4}>
                        <IconButton 
                            onClick={() => navigate(-1)}
                             variant="ghost"
                        ><LuArrowLeft /></IconButton>
                        <Image
                            src={item?.picture}
                            alt={item?.name}
                            boxSize="50px"
                            m={2}
                            objectFit="cover"
                            borderRadius="md"
                        />
                        <Box>
                            <Text fontWeight="bold">{item?.name || "Objet"}</Text>
                            <Text fontSize="sm" color="gray.500">
                                {lender?.firstname} {lender?.lastname}
                            </Text>
                        </Box>
                    </HStack>
                </Card.Header>

                {/* Body (Chat) */}
                <Card.Body px={4} py={2} flex="1" ref={chatBoxRef}
                    overflowY="auto" bg="gray.50">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <VStack spacing={4} align="stretch">
                            {chat.map((msg, idx) => {
                                const isMine = msg.sender_id === userId;
                                const sender = msg.sender_id === borrower?.id ? borrower : lender;
                                const senderName = `${sender?.firstname} ${sender?.lastname}`;
                                const avatarUrl = sender?.picture;

                                return (
                                    <Flex key={idx} justify={isMine ? "flex-end" : "flex-start"}>
                                        <HStack spacing={2} align="flex-start">
                                            {!isMine && <Avatar name={senderName} src={avatarUrl} size="sm" />}
                                            <Box
                                                bg={isMine ? "teal.500" : "gray.100"}
                                                color={isMine ? "white" : "gray.800"}
                                                px={4}
                                                py={2}
                                                borderRadius="2xl"
                                                maxW="70%"
                                            >
                                                <Text fontSize="sm">{msg.message}</Text>
                                                <Text fontSize="xs" mt={1} textAlign="right" opacity={0.6}>
                                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                                </Text>
                                            </Box>
                                            {isMine && <Avatar name={senderName} src={avatarUrl} size="sm" />}
                                        </HStack>
                                    </Flex>
                                );
                            })}
                        </VStack>
                    )}
                </Card.Body>
                <TypingIndicator isTyping={isTyping} name={`${borrower?.firstname} ${borrower?.lastname}`} />

                {/* Footer (Input) */}
                <Card.Footer borderTopWidth="1px" bg="teal.50">
                    <HStack m={4}
                        w="full">
                        <Input
                            value={message}
                            onChange={onTyping}
                            placeholder="Écris ton message..."
                            onKeyDown={(e) => e.key === "Enter" && onSend()}
                            borderRadius="2xl"
                            bg="gray.50"
                        />
                        <Button colorScheme="purple" borderRadius="2xl" px={5} onClick={onSend}>
                            Envoyer
                        </Button>
                    </HStack>
                </Card.Footer>
            </Card.Root>
        </Box>
    );
};

export default ChatWindow;
