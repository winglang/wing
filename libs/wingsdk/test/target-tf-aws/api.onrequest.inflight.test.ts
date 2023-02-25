import { APIGatewayProxyEvent } from "aws-lambda";
import { ApiResponse } from "../../src/cloud";
import { ApiOnRequestHandlerClient } from "../../src/target-tf-aws/api.onrequest.inflight";

beforeEach(() => {
  jest.restoreAllMocks();
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

    const handlerResponse = {
      status: 200,
      body: new Map().set("key", "value"),
      headers: new Map().set("header-1", "value-1"),
    } as unknown as ApiResponse; // typecast because the actual inflight implementation returns a Map instead of a plain object
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

    const handlerResponse = {
      status: 200,
      body: new Map().set("key", "value"),
    } as unknown as ApiResponse; // typecast because the actual inflight implementation returns a Map instead of a plain object
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

  test("throw error if handler does return invalid body", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({}),
      headers: {},
      path: "/",
      httpMethod: "GET",
    };

    const handlerResponse = {
      status: 200,
      body: {},
    };
    const requestHandlerClient = new ApiOnRequestHandlerClient({
      handler: {
        // @ts-ignore - we want to test the error handling and 'body' is not a Map
        handle: async () => {
          return handlerResponse;
        },
      },
    });

    // WHEN
    let error;
    try {
      await requestHandlerClient.handle(
        apiRequestEvent as APIGatewayProxyEvent
      );
    } catch (e) {
      error = e;
    }

    // THEN

    expect(error).toEqual(new Error("Expected a Map"));
  });

  test("throw error if handler does return invalid headers", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({}),
      headers: {},
      path: "/",
      httpMethod: "GET",
    };

    const handlerResponse = {
      status: 200,
      headers: {},
    };
    const requestHandlerClient = new ApiOnRequestHandlerClient({
      handler: {
        // @ts-ignore - we want to test the error handling and 'body' is not a Map
        handle: async () => {
          return handlerResponse;
        },
      },
    });

    // WHEN
    let error;
    try {
      await requestHandlerClient.handle(
        apiRequestEvent as APIGatewayProxyEvent
      );
    } catch (e) {
      error = e;
    }

    // THEN

    expect(error).toEqual(new Error("Expected a Map"));
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
    };

    const handlerMock = jest.fn().mockResolvedValue({
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
    });
  });

  test("handle missing body", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      body: undefined,
      path: "/",
      httpMethod: "GET",
    };

    const handlerMock = jest.fn().mockResolvedValue({
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
      method: "GET",
      path: "/",
    });
  });

  test("handle missing headers", async () => {
    // GIVEN
    const apiRequestEvent: Partial<APIGatewayProxyEvent> = {
      path: "/",
      httpMethod: "GET",
    };

    const handlerMock = jest.fn().mockResolvedValue({
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
      method: "GET",
      path: "/",
    });
  });
});
