import { APIGatewayProxyEvent } from "aws-lambda";
import { test, expect, beforeEach, describe, vi } from "vitest";
import { ApiResponse } from "../../src/cloud";
import { apigwFunctionHandler } from "../../src/shared-aws/api-util";

beforeEach(() => {
  vi.restoreAllMocks();
});

const makeRequest = async (event: APIGatewayProxyEvent): Promise<any> => {};

describe("ApiResponseMapper", () => {
  test("map'cloud.ApiResponse' response to 'APIGatewayProxyResult", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({}),
      headers: {},
      path: "/",
      httpMethod: "GET",
    };
    const handlerResponse: ApiResponse = {
      status: 200,
      body: JSON.stringify({ key: "value" }),
      headers: { "header-1": "value-1" },
    };

    // WHEN
    const response = await apigwFunctionHandler(
      apiRequestEvent as APIGatewayProxyEvent,
      async () => handlerResponse,
      {}
    );

    // THEN

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ key: "value" }),
      headers: {
        "Content-Type": "application/json",
        "header-1": "value-1",
      },
    });
  });

  test("handle missing headers", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({}),
      headers: {},
      path: "/",
      httpMethod: "GET",
    };

    const handlerResponse: ApiResponse = {
      status: 200,
      body: JSON.stringify({ key: "value" }),
    };

    // WHEN
    const response = await apigwFunctionHandler(
      apiRequestEvent as APIGatewayProxyEvent,
      async () => handlerResponse
    );

    // THEN

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ key: "value" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("handle missing body", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({}),
      headers: {},
      path: "/",
      httpMethod: "GET",
    };

    const handlerResponse = {
      status: 200,
    };

    // WHEN
    const response = await apigwFunctionHandler(
      apiRequestEvent as APIGatewayProxyEvent,
      async () => handlerResponse
    );

    // THEN

    expect(response).toEqual({
      statusCode: 200,
      body: "",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("api response returns Content-Type header from inflight`", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({}),
      headers: {},
      path: "/",
      httpMethod: "GET",
    };

    const handlerResponse: ApiResponse = {
      status: 200,
      body: JSON.stringify({ key: "value" }),
      headers: {
        "Content-Type": "application/octet-stream",
      },
    };

    // WHEN
    const response = await apigwFunctionHandler(
      apiRequestEvent as APIGatewayProxyEvent,
      async () => handlerResponse
    );

    // THEN
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ key: "value" }),
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  });

  test("inject cors response headers", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({}),
      headers: {},
      path: "/",
      httpMethod: "GET",
    };

    const handlerResponse: ApiResponse = {
      status: 200,
      body: JSON.stringify({ key: "value" }),
    };

    // WHEN
    const response = await apigwFunctionHandler(
      apiRequestEvent as APIGatewayProxyEvent,
      async () => handlerResponse,
      {
        "Access-Control-Allow-Origin": "*",
      }
    );

    // THEN

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ key: "value" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  });
});

describe("ApiRequest", () => {
  test("map 'APIGatewayProxyEvent' to 'cloud.ApiRequest'", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({ foo: "bar" }),
      headers: {
        "header-1": "value-1",
      },
      path: "/",
      httpMethod: "GET",
      pathParameters: {
        "path-param-1": "value-1",
      },
      queryStringParameters: {
        key: "value",
      },
      multiValueQueryStringParameters: {
        multi: ["value1", "value2"],
      },
    };

    const handlerMock = vi.fn().mockResolvedValue({
      status: 200,
    });

    // WHEN
    await apigwFunctionHandler(
      apiRequestEvent as APIGatewayProxyEvent,
      handlerMock
    );

    // THEN
    expect(handlerMock).toHaveBeenCalledWith({
      body: JSON.stringify({ foo: "bar" }),
      headers: { "header-1": "value-1" },
      method: "GET",
      path: "/",
      vars: { "path-param-1": "value-1" },
      query: { key: "value", multi: "value1,value2" },
    });
  });

  test("handle missing body", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: undefined,
      path: "/",
      httpMethod: "GET",
    };

    const handlerMock = vi.fn().mockResolvedValue({
      status: 200,
    });

    // WHEN
    await apigwFunctionHandler(
      apiRequestEvent as APIGatewayProxyEvent,
      handlerMock
    );

    // THEN
    expect(handlerMock).toHaveBeenCalledWith({
      body: "",
      headers: undefined,
      method: "GET",
      path: "/",
      query: {},
      vars: {},
    });
  });

  test("handle missing headers", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      path: "/",
      httpMethod: "GET",
    };

    const handlerMock = vi.fn().mockResolvedValue({
      status: 200,
    });

    // WHEN
    await apigwFunctionHandler(
      apiRequestEvent as APIGatewayProxyEvent,
      handlerMock
    );

    // THEN
    expect(handlerMock).toHaveBeenCalledWith({
      body: "",
      headers: undefined,
      method: "GET",
      path: "/",
      query: {},
      vars: {},
    });
  });

  test("handle body as urlencoded form", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      path: "/",
      httpMethod: "POST",
      body: "foo=bar&bar=baz",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    const handlerMock = vi.fn().mockResolvedValue({
      status: 200,
    });

    // WHEN
    await apigwFunctionHandler(
      apiRequestEvent as APIGatewayProxyEvent,
      handlerMock
    );

    // THEN
    expect(handlerMock).toHaveBeenCalledWith({
      body: JSON.stringify({ foo: "bar", bar: "baz" }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      path: "/",
      query: {},
      vars: {},
    });
  });
});
