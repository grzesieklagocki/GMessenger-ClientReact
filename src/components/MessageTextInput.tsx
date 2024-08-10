import { KeyboardEvent } from "react";

function MessageTextInput({
  placeholder,
  onSubmit,
}: {
  placeholder: string;
  onSubmit: (msg: string) => any;
}) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      onSubmit(target.value);
      target.value = "";
    }
  }

  return (
    <input type="text" placeholder={placeholder} onKeyDown={handleKeyDown} />
  );
}

export default MessageTextInput;
