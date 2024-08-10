import Connection from "./Connection";

class ConnectionManager implements Connection {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
  setConnectionStrategy(connection: Connection): void {
    this.connection = connection;
  }
  dispose(): void {
    this.connection.dispose();
  }
  sendData(data: string): void {
    this.connection.sendData(data);
  }
  set onDataReceived(callback: (data: string) => void) {
    this.connection.onDataReceived = callback;
  }
  set onConnect(callback: (e: any) => void) {
    this.connection.onConnect = callback;
  }
  set onDisconnect(callback: (e: any) => void) {
    this.connection.onDisconnect = callback;
  }
  set onError(callback: (e: any) => void) {
    this.connection.onError = callback;
  }
}

export default ConnectionManager;
