import {
  ApiRequest,
  ApiResponse,
  IApiEndpointHandlerClient,
} from "../cloud/api";

export class ApiOnRequestHandlerClient {
  private readonly handler: IApiEndpointHandlerClient;
  constructor({ handler }: { handler: IApiEndpointHandlerClient }) {
    this.handler = handler;
  }
  public async handle(request: ApiRequest): Promise<ApiResponse> {
    const apiResponse: ApiResponse = await this.handler.handle(request);
    return apiResponse;
  }
}
