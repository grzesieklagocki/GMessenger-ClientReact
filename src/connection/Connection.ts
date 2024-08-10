interface Connection {
  dispose(): void;
  sendData(data: string): void;

  set onDataReceived(callback: (data: string) => void);
  set onConnect(callback: (e: any) => void);
  set onDisconnect(callback: (e: any) => void);
  set onError(callback: (e: any) => void);
}

export default Connection;
