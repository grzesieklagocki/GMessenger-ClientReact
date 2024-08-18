import { describe, expect, it } from "vitest";
import ApiRequestResponse, {
  ApiRequestResponseCode,
} from "./ApiRequestResponse";
import ApiRequest, { ApiRequestMethod } from "./ApiRequest";

describe("Testing ApiRequestResponseCode enum", () => {
  const values = Object.values(ApiRequestResponseCode);

  it("should be numbers", () => {
    values.forEach((v) => expect(Number(v)).toBeTypeOf("number"));
  });
  it("should have correct values (match HTTP request convention)", () => {
    expect(ApiRequestResponseCode.OK).toEqual(200);
    expect(ApiRequestResponseCode.TIMEOUT).toEqual(408);
    expect(ApiRequestResponseCode.INTERNAL_SERVER_ERROR).toEqual(500);
  });
  it("should ensure that all enum values are tested", () => {
    const expectedValues = [200, 408, 500];
    values.forEach((v) => {
      if (!isNaN(Number(v)))
        expect(expectedValues.includes(Number(v))).toBe(true);
    });
  });
});

describe("Testing ApiRequestResponse instance creation", () => {
  it("should return correct response 'code'", () => {
    const ok = new ApiRequestResponse(ApiRequestResponseCode.OK, null);
    const timeout = new ApiRequestResponse(
      ApiRequestResponseCode.TIMEOUT,
      null
    );
    const internalServerError = new ApiRequestResponse(
      ApiRequestResponseCode.INTERNAL_SERVER_ERROR,
      null
    );

    expect(ok.code).toBe(ApiRequestResponseCode.OK);
    expect(ok.code).toEqual(200);
    expect(timeout.code).toBe(ApiRequestResponseCode.TIMEOUT);
    expect(timeout.code).toEqual(408);
    expect(internalServerError.code).toBe(
      ApiRequestResponseCode.INTERNAL_SERVER_ERROR
    );
    expect(internalServerError.code).toEqual(500);
  });

  const data = { name: "Grzegorz", workerId: 2620, studentId: 7716 };

  it("should return correct 'requestId'", () => {
    const nullRequestIdResponse = new ApiRequestResponse(
      ApiRequestResponseCode.OK,
      null
    );
    const emptyRequestIdResponse = new ApiRequestResponse(
      ApiRequestResponseCode.OK,
      ""
    );
    const fakeRequestIdResponse = new ApiRequestResponse(
      ApiRequestResponseCode.OK,
      "1:21312s543513421321"
    );
    const request = new ApiRequest(ApiRequestMethod.PUT, "URL", data);
    const realRequestIdResponse = new ApiRequestResponse(
      ApiRequestResponseCode.OK,
      request.id
    );

    expect(nullRequestIdResponse.requestId).toBeNull;
    expect(emptyRequestIdResponse.requestId).toBe("");
    expect(fakeRequestIdResponse.requestId).toBe("1:21312s543513421321");
    expect(realRequestIdResponse.requestId).toBe(request.id);
  });
  it("should return correct 'data'", () => {
    const noDataResponse = new ApiRequestResponse(
      ApiRequestResponseCode.OK,
      ""
    );
    const nullDataResponse = new ApiRequestResponse(
      ApiRequestResponseCode.OK,
      "",
      null
    );
    const primitiveDataResponse = new ApiRequestResponse(
      ApiRequestResponseCode.OK,
      "",
      7716
    );
    const dataResponse = new ApiRequestResponse(
      ApiRequestResponseCode.OK,
      "",
      data
    );

    expect(noDataResponse.data).toBeUndefined();
    expect(nullDataResponse.data).toBeNull();
    expect(primitiveDataResponse.data).toBe(7716);
    expect(dataResponse.data).toEqual({
      name: "Grzegorz",
      workerId: 2620,
      studentId: 7716,
    });
    expect(dataResponse.data.name).toBe("Grzegorz");
    expect(dataResponse.data.workerId).toBe(2620);
    expect(dataResponse.data.studentId).toBe(7716);
  });
  it("should be the same object after JSON serialize and deserialize back", () => {
    const request = new ApiRequest(ApiRequestMethod.PUT, "URL", {
      ...data,
      isSleeping: false,
    });
    const response = new ApiRequestResponse(
      ApiRequestResponseCode.INTERNAL_SERVER_ERROR,
      request.id,
      data
    );
    const serialized = JSON.stringify(response);
    const deserialized: ApiRequestResponse = JSON.parse(serialized);

    expect(deserialized).toEqual(response);
    expect(deserialized.requestId).toBe(response.requestId);
    expect(deserialized.code).toBe(response.code);
    expect(deserialized.code).toBe(
      ApiRequestResponseCode.INTERNAL_SERVER_ERROR
    );
    expect(deserialized.data).toEqual(response.data);
    expect(deserialized.data).toEqual({
      name: "Grzegorz",
      workerId: 2620,
      studentId: 7716,
    });
  });
});