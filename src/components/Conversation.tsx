import { useCallback, useEffect, useRef, useState } from "react";
import MessageTextInput from "./MessageTextInput";
import WebsocketApiRequestsProcessor from "../connection/api/WebsocketApiRequestsProcessor";
import OkResponseMockConnection from "../connection/mocks/OkResponderMockConnection";
import ApiRequestFactory from "../connection/api/ApiRequestFactory";
import ApiRequestsProcessor from "../connection/api/ApiRequestsProcessor";
import Connection from "../connection/Connection";

function Conversation() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const connection = useRef<ApiRequestsProcessor<Connection> | null>(null);
  const addMessage = useCallback((msg: string) => {
    setMessages((messages) => [...messages, msg]);
  }, []);

  useEffect(() => {
    connection.current = new WebsocketApiRequestsProcessor(
      new OkResponseMockConnection(50),
      100
    );
    //connection.current.onRequestReceived = addMessage;

    // return () => connection.current?.dispose();
  }, [addMessage]);

  useEffect(() => {
    if (message.trim() === "") return;

    addMessage(message);
    sendMessage();
    setMessage("");
  }, [message, addMessage]);

  const sendMessage = async () => {
    const response = await connection.current?.sendRequest(
      ApiRequestFactory.createPost("test", message)
    );
    addMessage(JSON.stringify(response));
  };

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
