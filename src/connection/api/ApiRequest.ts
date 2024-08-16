export enum ApiRequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

class ApiRequest {
  public id: string;
  public static nextNumber: number = 0;

  constructor(
    public method: ApiRequestMethod,
    public url: string,
    public data?: any
  ) {
    this.id = `${ApiRequest.nextNumber++}:${Date.now()}`;
  }
}

export default ApiRequest;
