import ApiRequest, { ApiRequestMethod } from "./ApiRequest";

class ApiRequestFactory {
  static createGet(url: string, data?: any): ApiRequest {
    const method = ApiRequestMethod.GET;
    return new ApiRequest(method, url, data);
  }

  static createPost(url: string, data?: any): ApiRequest {
    const method = ApiRequestMethod.POST;
    return new ApiRequest(method, url, data);
  }

  static createPut(url: string, data?: any): ApiRequest {
    const method = ApiRequestMethod.PUT;
    return new ApiRequest(method, url, data);
  }

  static createDelete(url: string, data?: any): ApiRequest {
    const method = ApiRequestMethod.DELETE;
    return new ApiRequest(method, url, data);
  }

  static createPatch(url: string, data?: any): ApiRequest {
    const method = ApiRequestMethod.PATCH;
    return new ApiRequest(method, url, data);
  }
}

export default ApiRequestFactory;
