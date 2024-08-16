import ApiRequestResponse, {
  ApiRequestResponseCode,
} from "./ApiRequestResponse";

class ApiRequestResponseFactory {
  static createOk(requestId: string, data?: any) {
    const code = ApiRequestResponseCode.OK;
    return new ApiRequestResponse(requestId, code, data);
  }

  static createTimeout(requestId: string, data?: any) {
    const code = ApiRequestResponseCode.TIMEOUT;
    return new ApiRequestResponse(requestId, code, data);
  }

  static createInternalServerError(requestId: string, data?: any) {
    const code = ApiRequestResponseCode.INTERNAL_SERVER_ERROR;
    return new ApiRequestResponse(requestId, code, data);
  }
}

export default ApiRequestResponseFactory;
