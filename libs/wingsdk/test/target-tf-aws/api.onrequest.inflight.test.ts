import { APIGatewayProxyEvent } from "aws-lambda";
import { test, expect, beforeEach, describe, vi } from "vitest";
import { ApiResponse } from "../../src/cloud";
import { ApiOnRequestHandlerClient } from "../../src/target-tf-aws/api.onrequest.inflight";

beforeEach(() => {
  vi.restoreAllMocks();
});
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
      body: { key: "value" },
      headers: { "header-1": "value-1" },
    };
    const requestHandlerClient = new ApiOnRequestHandlerClient({
      handler: {
        handle: async () => {
          return handlerResponse;
        },
      },
    });

    // WHEN
    const response = await requestHandlerClient.handle(
      apiRequestEvent as APIGatewayProxyEvent
    );

    // THEN

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ key: "value" }),
      headers: {
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
      body: { key: "value" },
    };
    const requestHandlerClient = new ApiOnRequestHandlerClient({
      handler: {
        handle: async () => {
          return handlerResponse;
        },
      },
    });

    // WHEN
    const response = await requestHandlerClient.handle(
      apiRequestEvent as APIGatewayProxyEvent
    );

    // THEN

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ key: "value" }),
      headers: undefined,
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
    const requestHandlerClient = new ApiOnRequestHandlerClient({
      handler: {
        handle: async () => {
          return handlerResponse;
        },
      },
    });

    // WHEN
    const response = await requestHandlerClient.handle(
      apiRequestEvent as APIGatewayProxyEvent
    );

    // THEN

    expect(response).toEqual({
      statusCode: 200,
      body: "",
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
    const requestHandlerClient = new ApiOnRequestHandlerClient({
      handler: {
        handle: handlerMock,
      },
    });

    // WHEN
    await requestHandlerClient.handle(apiRequestEvent as APIGatewayProxyEvent);

    // THEN
    expect(handlerMock).toHaveBeenCalledWith({
      body: { foo: "bar" },
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
    const requestHandlerClient = new ApiOnRequestHandlerClient({
      handler: {
        handle: handlerMock,
      },
    });

    // WHEN
    await requestHandlerClient.handle(apiRequestEvent as APIGatewayProxyEvent);

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
    const requestHandlerClient = new ApiOnRequestHandlerClient({
      handler: {
        handle: handlerMock,
      },
    });

    // WHEN
    await requestHandlerClient.handle(apiRequestEvent as APIGatewayProxyEvent);

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
});
