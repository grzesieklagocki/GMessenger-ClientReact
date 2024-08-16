import Utils from "../../utils/utils";
import ApiRequest from "./ApiRequest";
import ApiRequestResponse from "./ApiRequestResponse";

export enum ApiMessageType {
  REQUEST = "request",
  RESPONSE = "response",
}

class ApiMessage {
  type: ApiMessageType;

  constructor(public data: ApiRequest | ApiRequestResponse) {
    Utils.DEBUG("ApiMessage.constructor", "Trying to create object...", data);
    if (data instanceof ApiRequest) this.type = ApiMessageType.REQUEST;
    else if (data instanceof ApiRequestResponse)
      this.type = ApiMessageType.RESPONSE;
    else throw new Error("Unsupported data type");
    Utils.DEBUG("ApiMessage.constructor", "Created object", this);
  }
}

export default ApiMessage;
