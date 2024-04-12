import type {
  ApiRequest,
  IApiEndpointHandlerClient,
  IFunctionHandlerClient,
} from "../cloud";
import { Json } from "../std";

export class ApiOnRequestHandlerClient implements IFunctionHandlerClient {
  private readonly handler: IApiEndpointHandlerClient;
  constructor({ handler }: { handler: IApiEndpointHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event?: Json) {
    if (!event) {
      throw new Error("invalid API request event");
    }
    let req = event as unknown as ApiRequest;
    const response = await this.handler.handle(req);
    if (!response) {
      return undefined;
    } else {
      return response as Json;
    }
  }
}
