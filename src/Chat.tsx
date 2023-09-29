import React, { useState } from "react";
import socket from "./socket";
import { useChat } from "./useChat";

interface ChatMessage {
  user: string;
  message: string;
}

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const { messages, addMessage } = useChat();

  socket.on("chat-message", (data: ChatMessage) => {
    addMessage(data);
  });

  const sendMessage = () => {
    const chatMessage = { user, message };
    socket.emit("chat-message", chatMessage);
    addMessage(chatMessage);
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Chat</button>
      {isOpen && (
        <div className="bg-white p-4 rounded shadow-md">
          <div>
            {messages.map((msg, idx) => (
              <div key={idx}>
                <strong>{msg.user}:</strong> {msg.message}
              </div>
            ))}
          </div>

          <div>
            <input
              type="text"
              placeholder="Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
