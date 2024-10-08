import Utils from "../utils/utils";
import Connection from "./Connection";

class SimpleWebsocketConnection implements Connection {
  private websocket: WebSocket | null = null;
  get url(): string {
    return this.host && this.port ? `ws://${this.host}:${this.port}` : "";
  }

  constructor(private host: string, private port: number) {
    this.websocket = new WebSocket(this.url);
    Utils.DEBUG(`Connecting to server... (${this.url})`);
    this.initDefaultEventHandlers();
  }

  // for add DEBUG calls inside eventHandlers
  private initDefaultEventHandlers() {
    this.onConnect = () => {};
    this.onDisconnect = () => {};
    this.onDataReceived = () => {};
    this.onError = () => {};
  }

  dispose() {
    Utils.DEBUG(`Closing connection... (${this.url})`);
    this.websocket?.close();
    this.websocket = null;
  }

  sendData(message: string) {
    Utils.DEBUG(`Sent message to server (${this.url}): "${message}"`);
    this.websocket?.send(message);
  }

  set onDataReceived(callback: (e: string) => any) {
    if (this.websocket === null) throw Error("Websocket is null");

    this.websocket.onmessage = (e) => {
      Utils.DEBUG(`Received message from server (${this.url}): "${e.data}"`, e);
      callback(e.data);
    };
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
      this.websocket = null;
    };
  }

  set onError(callback: (e: Event) => any) {
    if (this.websocket === null) throw Error("Websocket is null");

    this.websocket.onerror = (e) => {
      Utils.DEBUG(`Error with server connection: (${this.url})`, e);
      callback(e);
    };
  }
}

export default SimpleWebsocketConnection;
