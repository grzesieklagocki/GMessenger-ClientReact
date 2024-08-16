import ApiRequest, { ApiRequestType } from "./ApiRequest";

class ApiRequestFactory {
  static createGet(url: string, data?: any): ApiRequest {
    const type = ApiRequestType.GET;
    return new ApiRequest(type, url, data);
  }

  static createPost(url: string, data?: any): ApiRequest {
    const type = ApiRequestType.POST;
    return new ApiRequest(type, url, data);
  }

  static createPut(url: string, data?: any): ApiRequest {
    const type = ApiRequestType.PUT;
    return new ApiRequest(type, url, data);
  }

  static createDelete(url: string, data?: any): ApiRequest {
    const type = ApiRequestType.DELETE;
    return new ApiRequest(type, url, data);
  }

  static createPatch(url: string, data?: any): ApiRequest {
    const type = ApiRequestType.PATCH;
    return new ApiRequest(type, url, data);
  }
}

export default ApiRequestFactory;
