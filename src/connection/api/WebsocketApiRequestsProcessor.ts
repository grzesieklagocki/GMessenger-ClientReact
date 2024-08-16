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
        Utils.DEBUG(
          "WebsocketApiRequestProcessor.onRequestReceived",
          "Received string",
          data
        );
        const message: ApiMessage = JSON.parse(data);
        if (message.type == ApiMessageType.REQUEST) {
          const requst = message.data as ApiRequest;
          const response = callback(requst);
          Utils.DEBUG(
            "WebsocketApiRequestProcessor.onRequestReceived",
            "Sent response on request",
            requst
          );
          this.send(response);
        } else {
          // if (message.type == ApiMessageType.RESPONSE)
          // when received response for previously sent request (via sendRequest method)
          const response = message.data as ApiRequestResponse;
          if (response.requestId === null)
            throw new Error("Value of 'requestId' cannot be null");

          Utils.DEBUG(
            "WebsocketApiRequestProcessor.onRequestReceived",
            "Received response on request",
            response
          );
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

      Utils.DEBUG("WebsocketApiRequestsProcessor.sendRequest", "Sent", request);
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
    Utils.DEBUG("WebsocketApiRequestProcessor.send", message, data);
    this.connection.sendData(data);
  }

  private setResponse(requestId: string, response: ApiRequestResponse) {
    Utils.DEBUG(
      "WebsocketApiRequestsProcessor.setResponse",
      "Before",
      this.pendingRequests
    );
    this.pendingRequests.forEach((req) => {
      if (req.request.id === requestId) req.response = response;
    });
    Utils.DEBUG(
      "WebsocketApiRequestsProcessor.setResponse",
      "After",
      this.pendingRequests
    );
  }

  private addToPendingRequests(request: ApiPendingRequest) {
    this.pendingRequests.push(request);
    Utils.DEBUG(
      "WebsocketApiRequestsProcessor.sendRequest",
      "Added to pendingRequests",
      request,
      this.pendingRequests
    );
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
