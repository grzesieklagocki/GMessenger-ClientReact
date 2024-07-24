import { useState } from "react";
import MessageTextInput from "./MessageTextInput";

function Conversation() {
  const [messages, setMessages] = useState([]);

  function handleSendMessage(text) {
    setMessages([...messages, text]); // add latest message
    console.log("Wysłano:", text);
  }

  return (
    <div>
      <MessageTextInput onMessageSend={handleSendMessage} />
      {messages.map((msg) => (
        <div>{msg}</div>
      ))}
    </div>
  );
}

export default Conversation;
