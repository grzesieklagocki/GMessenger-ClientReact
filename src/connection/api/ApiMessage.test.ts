import { describe, expect, it } from "vitest";
import ApiRequest, { ApiRequestMethod } from "./ApiRequest";
import ApiMessage, { ApiMessageType } from "./ApiMessage";
import ApiRequestResponse, {
  ApiRequestResponseCode,
} from "./ApiRequestResponse";

describe("Testing ApiMessage", () => {
  const request = new ApiRequest(ApiRequestMethod.DELETE, "");
  const response = new ApiRequestResponse(
    ApiRequestResponseCode.INTERNAL_SERVER_ERROR,
    request.id
  );

  
  const requestMessage = new ApiMessage(request);
  const responseMessage = new ApiMessage(response);

  it("should return correct 'type'", () => {
    expect(requestMessage.type).toBe(ApiMessageType.REQUEST);
    expect(responseMessage.type).toBe(ApiMessageType.RESPONSE);
  });
  it("should get ApiResquest object from 'data' property if 'type==ApiMessageType.REQUEST'", () => {
    expect(requestMessage.data).not.toBeUndefined();
    expect(requestMessage.data).toBeInstanceOf(ApiRequest);
    expect(requestMessage.data).not.toBeInstanceOf(ApiRequestResponse);
    expect(requestMessage.data).toBe(request);
  });
  it("should get ApiResquestResponse object from 'data' property if 'type==ApiMessageType.RESPONSE'", () => {
    expect(responseMessage.data).not.toBeUndefined();
    expect(responseMessage.data).toBeInstanceOf(ApiRequestResponse);
    expect(responseMessage.data).not.toBeInstanceOf(ApiRequest);
    expect(responseMessage.data).toBe(response);
  });
  it("should throw error if 'data' is not ApiRequest or ApiRequestResponse", () => {
    const invalidData = {};
    expect(() => new ApiMessage(invalidData as any)).toThrowError("data type");
  });
});
