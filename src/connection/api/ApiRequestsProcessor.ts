import Connection from "../Connection";
import ApiRequest from "./ApiRequest";
import ApiRequestResponse from "./ApiRequestResponse";

abstract class ApiRequestProcessor<ConnectionType extends Connection> {
  constructor(
    protected connection: ConnectionType,
    public maxTimeoutMs: number
  ) {}

  abstract set onRequestReceived(
    callback: (req: ApiRequest) => ApiRequestResponse
  );

  abstract sendRequest(request: ApiRequest): Promise<ApiRequestResponse>;
}

export default ApiRequestProcessor;
