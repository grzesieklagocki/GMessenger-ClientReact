interface Connection {
  dispose(): void;
  sendData(data: string): void;

  set onDataReceived(callback: (data: string) => any);
  set onConnect(callback: (e: any) => any);
  set onDisconnect(callback: (e: any) => any);
  set onError(callback: (e: any) => any);
}

export default Connection;
