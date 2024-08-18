import ApiRequestResponse, {
  ApiRequestResponseCode,
} from "./ApiRequestResponse";

class ApiRequestResponseFactory {
  static createOk(requestId: string, data?: any) {
    const code = ApiRequestResponseCode.OK;
    return new ApiRequestResponse(code, requestId, data);
  }

  static createTimeout(requestId: string, data?: any) {
    const code = ApiRequestResponseCode.TIMEOUT;
    return new ApiRequestResponse(code, requestId, data);
  }

  static createInternalServerError(requestId: string, data?: any) {
    const code = ApiRequestResponseCode.INTERNAL_SERVER_ERROR;
    return new ApiRequestResponse(code, requestId, data);
  }
}

export default ApiRequestResponseFactory;
