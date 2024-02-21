import type {
  ApiRequest,
  IApiEndpointHandlerClient,
  IFunctionHandlerClient,
} from "../cloud";

export class ApiOnRequestHandlerClient implements IFunctionHandlerClient {
  private readonly handler: IApiEndpointHandlerClient;
  constructor({ handler }: { handler: IApiEndpointHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event?: string) {
    if (!event) {
      throw new Error("invalid API request event");
    }
    let req = JSON.parse(event) as ApiRequest;
    const response = await this.handler.handle(req);
    if (!response) {
      return undefined;
    } else {
      return JSON.stringify(response);
    }
  }
}
