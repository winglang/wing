import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  ApiRequest,
  ApiResponse,
  IApiEndpointHandlerClient,
  parseHttpMethod,
  sanitizeParamLikeObject,
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
function mapCloudApiResponseToApigatewayResponse(
  resp: ApiResponse
): APIGatewayProxyResult {
  return {
    statusCode: resp.status,
    body: resp.body ? JSON.stringify(resp.body) : "",
    headers: resp.headers,
  };
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
    body: parseBody(request),
    headers: request.headers as Record<string, string>,
    method: parseHttpMethod(request.httpMethod),
    query: sanitizeParamLikeObject(query),
    vars: sanitizeParamLikeObject(request.pathParameters ?? {}),
  };
}

/**
 * Parse body to JSON or empty string
 * @param body body
 * @returns JSON body
 */
function parseBody(request: APIGatewayProxyEvent) {
  if (!request.body) return "";

  const contentType = Object.entries(request.headers).find(
    ([key, _]) => key.toLowerCase() === "content-type"
  )?.[1];
  if (contentType === "application/x-www-form-urlencoded") {
    return Object.fromEntries(new URLSearchParams(request.body));
  }
  return JSON.parse(request.body);
}
