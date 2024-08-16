import Utils from "../../utils/utils";
import Connection from "../Connection";
import ApiMessage, { ApiMessageType } from "./ApiMessage";
import ApiRequest from "./ApiRequest";
import ApiRequestResponse from "./ApiRequestResponse";
import ApiRequestResponseFactory from "./ApiRequestResponseFactory";
import ApiRequestProcessor from "./ApiRequestsProcessor";

class WebsocketApiRequestsProcessor extends ApiRequestProcessor<Connection> {
  private pendingRequests: ApiPendingRequest[] = [];

  constructor(connection: Connection, public maxTimeoutMs: number) {
    super(connection, maxTimeoutMs);

    this.onRequestReceived = (request) => {
      return ApiRequestResponseFactory.createInternalServerError(request.id);
    };
  }

  set onRequestReceived(callback: (req: ApiRequest) => ApiRequestResponse) {
    this.connection.onDataReceived = (data) => {
      try {
        const message: ApiMessage = JSON.parse(data);
        if (message.type == ApiMessageType.REQUEST) {
          const requst = message.data as ApiRequest;
          const response = callback(requst);
          this.send(response);
        } else {
          // if (message.type == ApiMessageType.RESPONSE)
          // when received response for previously sent request (via sendRequest method)
          const response = message.data as ApiRequestResponse;
          if (response.requestId === null)
            throw new Error("Value of 'requestId' cannot be null");

          this.setResponse(response.requestId, response);
        }
      } catch (error) {
        Utils.DEBUG("onRequestReceived error", error);
      }
    };
  }

  sendRequest(request: ApiRequest): Promise<ApiRequestResponse> {
    return new Promise<ApiRequestResponse>((resolve, reject) => {
      let pendingRequest = new ApiPendingRequest(request);
      this.addToPendingRequests(pendingRequest);

      this.send(request);
      let timeout = 0;

      const waitForResponse = () => {
        if (++timeout > this.maxTimeoutMs) {
          this.completePendingRequest(pendingRequest, interval);
          const requestId = pendingRequest.request.id;
          reject(ApiRequestResponseFactory.createTimeout(requestId));
        }
        if (pendingRequest.isCompleted) {
          this.completePendingRequest(pendingRequest, interval);
          resolve(pendingRequest.response as ApiRequestResponse);
        }
      };
      let interval = setInterval(waitForResponse, 1);
    });
  }

  private send(obj: ApiRequest | ApiRequestResponse) {
    const message = new ApiMessage(obj);
    const data = JSON.stringify(message);
    this.connection.sendData(data);
  }

  private setResponse(requestId: string, response: ApiRequestResponse) {
    this.pendingRequests.forEach((req) => {
      if (req.request.id === requestId) req.response = response;
    });
  }

  private addToPendingRequests(request: ApiPendingRequest) {
    this.pendingRequests.push(request);
  }

  private removeFromPendingRequests(request: ApiPendingRequest) {
    this.pendingRequests.splice(this.pendingRequests.indexOf(request), 1);
  }

  private completePendingRequest(request: ApiPendingRequest, interval: number) {
    clearInterval(interval);
    this.removeFromPendingRequests(request);
  }
}

class ApiPendingRequest {
  response: ApiRequestResponse | null = null;

  get isCompleted(): boolean {
    return this.response !== null;
  }

  constructor(public request: ApiRequest) {}
}

export default WebsocketApiRequestsProcessor;
