import { describe, expect, it } from "vitest";
import ApiRequestFactory from "./ApiRequestFactory";
import ApiRequest, { ApiRequestMethod } from "./ApiRequest";

describe("Testing ApiRequestFactory static methods is returning instances with correct url's and ApiRequestMethods", () => {
  it("should return ApiRequest instance with method=DELETE and url='test/delete'", () => {
    const request: ApiRequest = ApiRequestFactory.createDelete("test/delete");
    expect(request.method).toBe(ApiRequestMethod.DELETE);
    expect(request.url).toBe("test/delete");
  });
  it("should return ApiRequest instance with method=GET and url='test/get'", () => {
    const request: ApiRequest = ApiRequestFactory.createGet("test/get");
    expect(request.method).toBe(ApiRequestMethod.GET);
    expect(request.url).toBe("test/get");
  });
  it("should return ApiRequest instance with method=PATCH and url='test/patch'", () => {
    const request: ApiRequest = ApiRequestFactory.createPatch("test/patch");
    expect(request.method).toBe(ApiRequestMethod.PATCH);
    expect(request.url).toBe("test/patch");
  });
  it("should return ApiRequest instance with method=POST and url='test/post'", () => {
    const request: ApiRequest = ApiRequestFactory.createPost("test/post");
    expect(request.method).toBe(ApiRequestMethod.POST);
    expect(request.url).toBe("test/post");
  });
  it("should return ApiRequest instance with method=PUT and url='test/put'", () => {
    const request: ApiRequest = ApiRequestFactory.createPut("test/put");
    expect(request.method).toBe(ApiRequestMethod.PUT);
    expect(request.url).toBe("test/put");
  });
});

describe("Testing ApiRequestFactory static methods is returning instances with data=undefined when data is not provided", () => {
  it("should return DELETE ApiRequest instance with data=undefined", () => {
    const request: ApiRequest = ApiRequestFactory.createDelete("");
    expect(request.data).toBeUndefined;
  });
  it("should return GET ApiRequest instance with data=undefined", () => {
    const request: ApiRequest = ApiRequestFactory.createGet("");
    expect(request.data).toBeUndefined;
  });
  it("should return PATCH ApiRequest instance with data=undefined", () => {
    const request: ApiRequest = ApiRequestFactory.createPatch("");
    expect(request.data).toBeUndefined;
  });
  it("should return POST ApiRequest instance with data=undefined", () => {
    const request: ApiRequest = ApiRequestFactory.createPost("");
    expect(request.data).toBeUndefined;
  });
  it("should return PUT ApiRequest instance with data=undefined", () => {
    const request: ApiRequest = ApiRequestFactory.createPut("");
    expect(request.data).toBeUndefined;
  });
});

describe("Testing ApiRequestFactory static methods is returning instances with provided data", () => {
  const data = { a: "testData" };
  it("should return DELETE ApiRequest instance with provided data", () => {
    const request: ApiRequest = ApiRequestFactory.createDelete("", data);
    expect(request.data).toBe(data);
  });
  it("should return GET ApiRequest instance with provided data", () => {
    const request: ApiRequest = ApiRequestFactory.createGet("", data);
    expect(request.data).toBe(data);
  });
  it("should return PATCH ApiRequest instance with provided data", () => {
    const request: ApiRequest = ApiRequestFactory.createPatch("", data);
    expect(request.data).toBe(data);
  });
  it("should return POST ApiRequest instance with provided data", () => {
    const request: ApiRequest = ApiRequestFactory.createPost("", data);
    expect(request.data).toBe(data);
  });
  it("should return PUT ApiRequest instance with provided data", () => {
    const request: ApiRequest = ApiRequestFactory.createPut("", data);
    expect(request.data).toBe(data);
  });
});
