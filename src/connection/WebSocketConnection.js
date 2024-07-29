class WebSocketConnection {
  constructor(url, port, onMessageReceive) {
    this.connect(url, port, onMessageReceive);
  }

  connect(url, port, onMessageReceive) {
    this.websocket = new WebSocket(`ws://${url}:${port}`);
    this.websocket.addEventListener("message", (e) => onMessageReceive(e.data));
  }

  close() {
    this.websocket.close();
  }

  sendMessage(message) {
    this.websocket.send(message);
  }
}

export default WebSocketConnection;
