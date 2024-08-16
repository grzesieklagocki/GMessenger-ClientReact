export enum ApiRequestResponseCode {
  OK = 200,
  TIMEOUT = 408,
  INTERNAL_SERVER_ERROR = 500,
}

class ApiRequestResponse {
  constructor(
    public requestId: string | null,
    public code: ApiRequestResponseCode,
    public data?: any
  ) {}
}

export default ApiRequestResponse;
