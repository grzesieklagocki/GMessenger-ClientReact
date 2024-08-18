import { describe, expect, it } from "vitest";
import ApiRequest, { ApiRequestMethod } from "./ApiRequest";

describe("Testing ApiRequestMethod enum", () => {
  const values = Object.values(ApiRequestMethod);

  it("should be strings", () => {
    values.forEach((v) => expect(v).toBeTypeOf("string"));
  });
  it("should have correct values (match HTTP request convention)", () => {
    expect(ApiRequestMethod.DELETE).toBe("DELETE");
    expect(ApiRequestMethod.GET).toBe("GET");
    expect(ApiRequestMethod.PATCH).toBe("PATCH");
    expect(ApiRequestMethod.POST).toBe("POST");
    expect(ApiRequestMethod.PUT).toBe("PUT");
  });
  it("should ensure that all enum values are tested", () => {
    const expectedValues = ["DELETE", "GET", "PATCH", "POST", "PUT"];
    values.forEach((v) =>
      expect(expectedValues.includes(v.toString())).toBe(true)
    );
  });
});

describe("Testing ApiRequest instance creation", () => {
  it("ensure that all 'id' values starts with unique number (in order of instance creation)", () => {
    const first = new ApiRequest(ApiRequestMethod.GET, "");
    const second = new ApiRequest(ApiRequestMethod.POST, "/");
    const third = new ApiRequest(ApiRequestMethod.DELETE, "not important");
    const fourth = new ApiRequest(ApiRequestMethod.POST, "!");

    expect(first.id[0]).toBe("0");
    expect(second.id[0]).toBe("1");
    expect(third.id[0]).toBe("2");
    expect(fourth.id[0]).toBe("3");
  });
  it("should return correct request 'method'", () => {
    const del = new ApiRequest(ApiRequestMethod.DELETE, "");
    const get = new ApiRequest(ApiRequestMethod.GET, "");
    const patch = new ApiRequest(ApiRequestMethod.PATCH, "");
    const post = new ApiRequest(ApiRequestMethod.POST, "");
    const put = new ApiRequest(ApiRequestMethod.PUT, "");

    expect(del.method).toBe(ApiRequestMethod.DELETE);
    expect(del.method).toBe("DELETE");
    expect(get.method).toBe(ApiRequestMethod.GET);
    expect(get.method).toBe("GET");
    expect(patch.method).toBe(ApiRequestMethod.PATCH);
    expect(patch.method).toBe("PATCH");
    expect(post.method).toBe(ApiRequestMethod.POST);
    expect(post.method).toBe("POST");
    expect(put.method).toBe(ApiRequestMethod.PUT);
    expect(put.method).toBe("PUT");
  });
  it("should return correct request 'url'", () => {
    const first = new ApiRequest(ApiRequestMethod.GET, "");
    const second = new ApiRequest(ApiRequestMethod.POST, "/not empty");
    const third = new ApiRequest(ApiRequestMethod.DELETE, "not/important/url");
    const fourth = new ApiRequest(ApiRequestMethod.POST, " ! .");

    expect(first.url).toBe("");
    expect(second.url).toBe("/not empty");
    expect(third.url).toBe("not/important/url");
    expect(fourth.url).toBe(" ! .");
  });

  const data = { name: "Grzegorz", workerId: 2620, studentId: 7716 };

  it("should return correct 'data'", () => {
    const noDataRequest = new ApiRequest(ApiRequestMethod.GET, "");
    const nullDataRequest = new ApiRequest(ApiRequestMethod.GET, "", null);
    const primitiveDataRequest = new ApiRequest(ApiRequestMethod.GET, "", 7716);
    const dataRequest = new ApiRequest(ApiRequestMethod.GET, "", data);

    expect(noDataRequest.data).toBeUndefined();
    expect(nullDataRequest.data).toBeNull();
    expect(primitiveDataRequest.data).toBe(7716);
    expect(dataRequest.data).toEqual({
      name: "Grzegorz",
      workerId: 2620,
      studentId: 7716,
    });
    expect(dataRequest.data.name).toBe("Grzegorz");
    expect(dataRequest.data.workerId).toBe(2620);
    expect(dataRequest.data.studentId).toBe(7716);
  });
  it("should be the same object after JSON serialize and deserialize back", () => {
    const request = new ApiRequest(ApiRequestMethod.PATCH, "my/url", data);
    const serialized = JSON.stringify(request);
    const deserialized: ApiRequest = JSON.parse(serialized);

    expect(deserialized).toEqual(request);
    expect(deserialized.id).toBe(request.id);
    expect(deserialized.method).toBe(request.method);
    expect(deserialized.method).toBe(ApiRequestMethod.PATCH);
    expect(deserialized.url).toBe(request.url);
    expect(deserialized.url).toBe("my/url");
    expect(deserialized.data).toEqual(request.data);
    expect(deserialized.data).toEqual({
      name: "Grzegorz",
      workerId: 2620,
      studentId: 7716,
    });
  });
});
