function MessageTextInput({ placeholder, onSubmit }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSubmit(e.target.value);
      e.target.value = "";
    }
  }

  return (
    <input type="text" placeholder={placeholder} onKeyDown={handleKeyDown} />
  );
}

export default MessageTextInput;
