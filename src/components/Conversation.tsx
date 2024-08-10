import { useCallback, useEffect, useRef, useState } from "react";
import MessageTextInput from "./MessageTextInput";
import WebSocketConnection from "../connection/WebSocketConnection";
import ConnectionManager from "../connection/ConnectionManager";

function Conversation() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const server = useRef<ConnectionManager | null>(null);
  const addMessage = useCallback((msg: string) => {
    setMessages((messages) => [...messages, msg]);
  }, []);

  useEffect(() => {
    server.current = new ConnectionManager(
      new WebSocketConnection("localhost", 8080)
    );
    server.current.onDataReceived = addMessage;

    return () => server.current?.dispose();
  }, [addMessage]);

  useEffect(() => {
    if (message.trim() === "") return;

    addMessage(message);
    server.current?.sendData(message);

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
