import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { cloud } from "..";
import {
  ApiRequest,
  ApiResponse,
  DEFAULT_RESPONSE_STATUS,
  parseHttpMethod,
  sanitizeParamLikeObject,
} from "../cloud";

export async function apigwFunctionHandler(
  request: APIGatewayProxyEvent,
  handlerFunction: (
    request: cloud.ApiRequest
  ) => Promise<void | cloud.ApiResponse>,
  headers?: Record<string, string>
) {
  const apiRequest = mapApigatewayEventToCloudApiRequest(request);
  const apiResponse = (await handlerFunction(apiRequest)) ?? {};
  return mapCloudApiResponseToApigatewayResponse(apiResponse, headers);
}

/**
 * Map a Cloud API response to an API Gateway response
 * @param resp Cloud API response
 * @returns API Gateway response
 */
function mapCloudApiResponseToApigatewayResponse(
  resp: ApiResponse,
  corsHeaders?: Record<string, string>
): APIGatewayProxyResult {
  return {
    statusCode: resp.status ?? DEFAULT_RESPONSE_STATUS,
    body: resp.body ?? "",
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...resp.headers,
    },
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
function parseBody(request: APIGatewayProxyEvent): string {
  if (!request.body) return "";

  const contentType = Object.entries(request.headers).find(
    ([key, _]) => key.toLowerCase() === "content-type"
  )?.[1];
  if (contentType === "application/x-www-form-urlencoded") {
    return JSON.stringify(
      Object.fromEntries(new URLSearchParams(request.body))
    );
  }
  return request.body;
}
