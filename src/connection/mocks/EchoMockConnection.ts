import Connection from "../Connection";

class EchoMockConnection implements Connection {
  private _onDataReceived: (data: string) => any;
  private _onConnect: (e: any) => any;
  private _onDisconnect: (e: any) => any;
  private _onError: (e: any) => any;

  constructor(...params: any[]) {
    params;
    this._onDataReceived = () => {};
    this._onConnect = () => {};
    this._onDisconnect = () => {};
    this._onError = () => {};
    setTimeout(() => {
      this._onConnect("Connected to EchoMockConnection");
    }, 50);
  }

  dispose(): void {
    this._onDisconnect("EchoMockConnection: Disconnected");
  }
  sendData(data: string): void {
    if (data === "error") this._onError(data);

    this._onDataReceived(`From EchoMockConnection: ${data}`);
  }
  set onDataReceived(callback: (data: string) => any) {
    this._onDataReceived = callback;
  }
  set onConnect(callback: (e: any) => any) {
    this._onConnect = callback;
  }
  set onDisconnect(callback: (e: any) => any) {
    this._onDisconnect = callback;
  }
  set onError(callback: (e: any) => any) {
    this._onError = callback;
  }
}

export default EchoMockConnection;
