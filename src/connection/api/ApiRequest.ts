export enum ApiRequestType {
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
    public type: ApiRequestType,
    public url: string,
    public data?: any
  ) {
    this.id = `${ApiRequest.nextNumber++}:${Date.now()}`;
  }
}

export default ApiRequest;
