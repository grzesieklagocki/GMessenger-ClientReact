import Utils from "../utils/utils";

class WebSocketConnection {
  host: string;
  port: number;
  get url(): string {
    return this.host && this.port ? `ws://${this.host}:${this.port}` : "";
  }
  websocket: WebSocket | null = null;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    this.websocket = new WebSocket(this.url);
    console.log("hello");
    this.#initDefaultEventHandlers();
  }

  // for add DEBUG calls inside eventHandlers
  #initDefaultEventHandlers() {
    this.onConnect = () => {};
    this.onDisconnect = () => {};
    this.onMessageReceive = () => {};
  }

  set onConnect(callback: (e: Event) => any) {
    if (this.websocket === null) throw Error("Websocket is null");

    this.websocket.onopen = (e) => {
      Utils.DEBUG(`Connected to server (${this.url})`, e);
      callback(e);
    };
  }

  set onDisconnect(callback: (e: CloseEvent) => any) {
    if (this.websocket === null) throw Error("Websocket is null");

    this.websocket.onclose = (e) => {
      Utils.DEBUG(`Disconnected from server: (${this.url})`, e);
      callback(e);
    };
  }

  set onMessageReceive(callback: (e: string) => any) {
    if (this.websocket === null) throw Error("Websocket is null");

    this.websocket.onmessage = (e) => {
      Utils.DEBUG(`Received message from server (${this.url}): "${e.data}"`, e);
      callback(e.data);
    };
  }

  close() {
    this.websocket?.close();
  }

  sendMessage(message: string) {
    this.websocket?.send(message);
  }
}

export default WebSocketConnection;
