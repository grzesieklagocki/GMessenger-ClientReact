import { useCallback, useEffect, useRef, useState } from "react";
import MessageTextInput from "./MessageTextInput";
import WebSocketConnection from "../connection/WebSocketConnection";

function Conversation() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const server = useRef();
  const addMessage = useCallback((msg) => {
    setMessages((messages) => [...messages, msg]);
  }, []);

  useEffect(() => {
    server.current = new WebSocketConnection("localhost", 8080);
    server.current.onMessageReceive = addMessage;

    return () => server.current.close();
  }, [addMessage]);

  useEffect(() => {
    if (!message) return;

    addMessage(message);
    server.current.sendMessage(message);

    setMessage("");
  }, [message, addMessage]);

  return (
    <div>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <MessageTextInput
        placeholder="Type message..."
        onSubmit={(msg) => setMessage(msg)}
      />
    </div>
  );
}

export default Conversation;
