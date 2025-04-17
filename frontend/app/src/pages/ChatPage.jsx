import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";
import useFetchData from "../hooks/useFetchData";
import ChatWindow from "../components/chat/ChatWindow";

const ChatPage = () => {
    const { exchangeId } = useParams();
    const { user, token } = useAuth();
    const socketRef = useRef(null);
    const typingTimeout = useRef(null);

    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const { data: history, loading, error } = useFetchData(`/chats/${exchangeId}/history`, {
        requiresAuth: true,
    });

    // Load historique à l'ouverture
    useEffect(() => {
        if (history) setChat(history);
    }, [history]);

    // Connexion socket
    useEffect(() => {
        const socket = io("http://localhost:3000", {
            auth: { token },
            query: { exchangeId },
        });

        socketRef.current = socket;

        socket.on("receiveMessage", (messageData) => {
            setChat((prev) => [...prev, messageData]);
        });

        socket.on("typing", () => setIsTyping(true));
        socket.on("stopTyping", () => setIsTyping(false));

        return () => {
            socket.disconnect();
        };
    }, [token, exchangeId]);

    const handleSendMessage = () => {
        if (message.trim() === "") return;

        socketRef.current.emit("sendMessage", message);
        setMessage("");
        socketRef.current.emit("stopTyping");
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);
        socketRef.current.emit("typing");

        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            socketRef.current.emit("stopTyping");
        }, 1000);
    };

    return (
        <ChatWindow
            chat={chat}
            message={message}
            setMessage={setMessage}
            onSend={handleSendMessage}
            onTyping={handleTyping}
            isTyping={isTyping}
            userId={user?.id}
            isLoading={loading}
        />
    );
};

export default ChatPage;
