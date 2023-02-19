import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import type {
  ApiRequest,
  ApiResponse,
  IApiEndpointHandlerClient,
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
    body: JSON.stringify(Object.fromEntries(resp.body)),
    headers: resp.headers,
  };
}

/**
 * Map an API Gateway event to a Cloud API request
 * @param request API Gateway event
 * @returns Cloud API request
 */
function mapApigatewayEventToCloudApiRequest(request: APIGatewayProxyEvent) {
  return {
    path: request.path,
    body: JSON.parse(request.body || "{}"),
    headers: request.headers as Record<string, string>,
    method: request.httpMethod.toUpperCase(),
  };
}
