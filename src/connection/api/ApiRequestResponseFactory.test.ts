import { describe, it, expect } from "vitest";
import ApiRequestResponseFactory from "./ApiRequestResponseFactory";
import ApiRequestResponse, {
  ApiRequestResponseCode,
} from "./ApiRequestResponse";

describe("Testing ApiRequestResponseFactory static methods is returning instances with correct codes and requestId's", () => {
  it("should return ApiRequestResponse instance with code=500 and url='r/id'", () => {
    const response: ApiRequestResponse =
      ApiRequestResponseFactory.createInternalServerError("r/id");
    expect(response.code).toBe(ApiRequestResponseCode.INTERNAL_SERVER_ERROR);
    expect(response.requestId).toBe("r/id");
  });
  it("should return ApiRequestResponse instance with code=200 and url='r/id'", () => {
    const response: ApiRequestResponse =
      ApiRequestResponseFactory.createOk("r/id");
    expect(response.code).toBe(ApiRequestResponseCode.OK);
    expect(response.requestId).toBe("r/id");
  });
  it("should return ApiRequestResponse instance with code=408 and url='r/id'", () => {
    const response: ApiRequestResponse =
      ApiRequestResponseFactory.createTimeout("r/id");
    expect(response.code).toBe(ApiRequestResponseCode.TIMEOUT);
    expect(response.requestId).toBe("r/id");
  });
});

describe("Testing ApiRequestResponseFactory static methods is returning instances with data=undefined when data is not provided", () => {
  it("should return InternaServerError ApiRequestResponse instance with data=undefined", () => {
    const response: ApiRequestResponse =
      ApiRequestResponseFactory.createInternalServerError("");
    expect(response.data).toBeUndefined;
  });
  it("should return OK ApiRequestResponse instance with data=undefined", () => {
    const response: ApiRequestResponse = ApiRequestResponseFactory.createOk("");
    expect(response.data).toBeUndefined;
  });
  it("should return Timeout ApiRequestResponse instance with data=undefined", () => {
    const response: ApiRequestResponse =
      ApiRequestResponseFactory.createTimeout("");
    expect(response.data).toBeUndefined;
  });
});

describe("Testing ApiRequestResponseFactory static methods is returning instances with provided data", () => {
  const data = { a: "testData" };
  it("should return InternaServerError ApiRequestResponse instance with provided data", () => {
    const response: ApiRequestResponse =
      ApiRequestResponseFactory.createInternalServerError("", data);
    expect(response.data).toBe(data);
  });
  it("should return OK ApiRequestResponse instance with provided data", () => {
    const response: ApiRequestResponse = ApiRequestResponseFactory.createOk(
      "",
      data
    );
    expect(response.data).toBe(data);
  });
  it("should return Timeout ApiRequestResponse instance with provided data", () => {
    const response: ApiRequestResponse =
      ApiRequestResponseFactory.createTimeout("", data);
    expect(response.data).toBe(data);
  });
});
