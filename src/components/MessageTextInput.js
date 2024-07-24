function MessageTextInput({ onMessageSend }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onMessageSend(e.target.value);
      e.target.value = "";
    }
  }

  return <input type="text" onKeyDown={handleKeyDown} />;
}

export default MessageTextInput;
