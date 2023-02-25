import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import type {
  ApiRequest,
  ApiResponse,
  IApiEndpointHandlerClient,
  Json,
} from "../cloud/api";

export class ApiOnRequestHandlerClient {
  private readonly handler: IApiEndpointHandlerClient;
  constructor({ handler }: { handler: IApiEndpointHandlerClient }) {
    this.handler = handler;
  }
  public async handle(
    request: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    const apiRequest: ApiRequest = mapApigatewayEventToCloudApiRequest(request);
    const apiResponse: ApiResponse = await this.handler.handle(apiRequest);
    const apiGatewayResponse: APIGatewayProxyResult =
      mapCloudApiResponseToApigatewayResponse(apiResponse);
    return apiGatewayResponse;
  }
}

/**
 * Map a Cloud API response to an API Gateway response
 * @param resp Cloud API response
 * @returns API Gateway response
 */
function mapCloudApiResponseToApigatewayResponse(resp: ApiResponse) {
  return {
    statusCode: resp.status,
    body: resp.body ? JSON.stringify(convertMapToObject(resp.body)) : "",
    headers: convertMapToObject(resp.headers),
  };
}

/**
 * Converts the inflight return value to a JSON object
 * @param map A map of key-value pairs
 * @returns An object with the same key-value pairs
 */
function convertMapToObject(map: Json | undefined) {
  if (!map) {
    return undefined;
  }
  if (!(map instanceof Map)) {
    // the inflight returns a Map instead of a plain object
    throw new Error("Expected a Map");
  }
  return Object.fromEntries(map);
}

/**
 * Map an API Gateway event to a Cloud API request
 * @param request API Gateway event
 * @returns Cloud API request
 */
function mapApigatewayEventToCloudApiRequest(
  request: APIGatewayProxyEvent
): ApiRequest {
  const query = {
    ...request.queryStringParameters,
    ...request.multiValueQueryStringParameters,
  };
  return {
    path: request.path,
    body: request.body ? JSON.parse(request.body) : "",
    headers: request.headers as Record<string, string>,
    method: request.httpMethod.toUpperCase(),
    query: Object.keys(query).length > 0 ? JSON.stringify(query) : undefined,
    vars: request.pathParameters
      ? (request.pathParameters as Record<string, string>)
      : undefined,
  };
}
