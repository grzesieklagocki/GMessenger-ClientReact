import Utils from "../../utils/utils";
import ApiMessage, { ApiMessageType } from "../api/ApiMessage";
import ApiRequest from "../api/ApiRequest";
import ApiRequestResponseFactory from "../api/ApiRequestResponseFactory";
import Connection from "../Connection";

class OkResponseMockConnection implements Connection {
  private _onDataReceived: (data: string) => any = () => {};
  private _onConnect: (e: any) => any = () => {};
  private _onDisconnect: (e: any) => any = () => {};
  private _onError: (e: any) => any = () => {};

  constructor(public delay: number) {
    if (delay < 0) throw new Error("Delay must be greater or equal zero");

    this._onConnect(null);
  }

  dispose(): void {
    this._onDisconnect(null);
  }
  sendData(data: string): void {
    Utils.DEBUG("OkResponseMockConnection.sendData", data);

    setTimeout(() => this._onDataReceived(data), this.delay);
  }
  set onDataReceived(callback: (data: string) => any) {
    this._onDataReceived = (data) => {
      Utils.DEBUG(
        "OkResponseMockConnection.onDataReceived",
        "Received data",
        data
      );
      try {
        const message: ApiMessage = JSON.parse(data);

        if (message.type !== ApiMessageType.REQUEST)
          throw new Error("Only requests allowed");

        const request: ApiRequest = message.data as ApiRequest;
        const response = ApiRequestResponseFactory.createOk(
          request.id,
          request.data
        );
        const replyMessage = new ApiMessage(response);
        Utils.DEBUG(
          "OkResponseMockConnection.onDataReceived",
          "Sent response",
          replyMessage
        );
        callback(JSON.stringify(replyMessage));
      } catch (e) {
        Utils.DEBUG("OkResponseMockConnection.onDataReceived", "Error", e);
        this._onError(e);
      }
    };
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

export default OkResponseMockConnection;
