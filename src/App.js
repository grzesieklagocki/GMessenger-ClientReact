import "./App.css";
import React, { Component } from "react";

var message = "";
var messages = ["Initial message"];

class MessagesView extends Component {
  state = { message, messages };

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.message}
          onChange={(e) => {
            this.setState({ message: e.target.value });
          }}
        />
        <input
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            this.state.messages.push(this.state.message);
            this.setState({ message: "" });
          }}
        ></input>
        <label>
          {messages.map((msg) => (
            <div>{msg}</div>
          ))}
        </label>
      </form>
    );
  }
}

function App() {
  return (
    <div className="App">
      <MessagesView message={message} messages={messages} />
    </div>
  );
}

export default App;
