import React, { useState } from 'react';
import "./messages.css"

const MessagesC = () => {

    const [selectedChat, setSelectedChat] = useState(1); // ID du chat sélectionné
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Alice', content: 'Bonjour, je suis intéressée par votre offre.', sentByUser: false },
        { id: 2, sender: 'Vous', content: 'Bonjour Alice, merci pour votre message !', sentByUser: true },
        { id: 3, sender: 'Alice', content: 'Est-ce encore disponible ?', sentByUser: false },
    ]);

    const [conversations] = useState([
        { id: 1, name: 'Alice', lastMessage: 'Est-ce encore disponible ?' },
        { id: 2, name: 'Bob', lastMessage: 'Merci pour votre aide !' },
        { id: 3, name: 'Chloé', lastMessage: 'Quand puis-je passer ?' },
        { id: 4, name: 'David', lastMessage: 'Bonne journée !' },
        { id: 5, name: 'Émilie', lastMessage: 'Je vais réfléchir.' },
        { id: 6, name: 'François', lastMessage: 'D’accord, merci.' },
        { id: 7, name: 'Gérard', lastMessage: 'J’ai une autre question.' },
        { id: 8, name: 'Hélène', lastMessage: 'C’est noté, merci.' },
        { id: 9, name: 'Isabelle', lastMessage: 'Parfait, à bientôt.' },
        { id: 10, name: 'Jean', lastMessage: 'Super, merci beaucoup !' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { id: Date.now(), sender: 'Vous', content: newMessage, sentByUser: true }]);
            setNewMessage('');
        }
    };

    return (
        <>
            <div className="messaging-app">
                <div className="sidebar">
                    <h3>Discussions</h3>
                    <ul>
                        {conversations.map((chat) => (
                            <li
                                key={chat.id}
                                className={chat.id === selectedChat ? 'active-chat' : ''}
                                onClick={() => setSelectedChat(chat.id)}
                            >
                                <strong>{chat.name}</strong>
                                <p>{chat.lastMessage}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="chat-box">
                    <div className="messages-container">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message ${message.sentByUser ? 'user-message' : 'other-message'}`}
                            >
                                <p>{message.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="message-input-container">
                        <input
                            type="text"
                            placeholder="Écrivez votre message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Envoyer</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessagesC;