import { useCallback, useEffect, useRef, useState } from "react";
import MessageTextInput from "./MessageTextInput";
import WebsocketApiRequestsProcessor from "../connection/api/WebsocketApiRequestsProcessor";
import OkResponseMockConnection from "../connection/mocks/OkResponderMockConnection";
import ApiRequest, { ApiRequestType } from "../connection/api/ApiRequest";

function Conversation() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const connection = useRef<WebsocketApiRequestsProcessor | null>(null);
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
    const sendMessage = async () => {
      const response = await connection.current?.sendRequest(
        new ApiRequest(ApiRequestType.POST, "test", message)
      );
      addMessage(JSON.stringify(response));
    };
    sendMessage();

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
