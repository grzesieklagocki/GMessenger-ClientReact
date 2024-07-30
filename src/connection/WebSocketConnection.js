import Utils from "../utils/utils";

class WebSocketConnection {
  host;
  port;
  get url() {
    return this.host && this.port ? `ws://${this.host}:${this.port}` : null;
  }

  get onConnect() {
    return this.websocket.onopen;
  }
  set onConnect(callback) {
    this.websocket.onopen = (e) => {
      Utils.DEBUG(`Connected to server (${this.url})`, e);
      callback(e);
    };
  }

  get onDisconnect() {
    return this.websocket.onclose;
  }
  set onDisconnect(callback) {
    this.websocket.onclose = (e) => {
      Utils.DEBUG(`Disconnected from server: (${this.url})`, e);
      callback(e);
    };
  }

  get onMessageReceive() {
    return this.websocket.onmessage;
  }
  set onMessageReceive(callback) {
    this.websocket.onmessage = (e) => {
      Utils.DEBUG(`Received message from server (${this.url}): "${e.data}"`, e);
      callback(e.data);
    };
  }

  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.websocket = new WebSocket(this.url);
    this.#initDefaultEventHandlers();
  }

  // for add DEBUG calls inside eventHandlers
  #initDefaultEventHandlers() {
    this.onConnect = () => {};
    this.onDisconnect = () => {};
    this.onMessageReceive = () => {};
  }

  close() {
    this.websocket.close();
  }

  sendMessage(message) {
    this.websocket.send(message);
  }
}

export default WebSocketConnection;
