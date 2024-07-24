import { useState } from "react";

function Conversation() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function onTextChange(e) {
    setMessage(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    messages.push(message);
    setMessage("");
  }

  return (
    <form>
      <input type="text" value={message} onChange={onTextChange} />
      <input type="submit" onClick={onSubmit}></input>
      <label>
        {messages.map((msg) => (
          <div>{msg}</div>
        ))}
      </label>
    </form>
  );
}

export default Conversation;
