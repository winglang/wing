import { IEndpointClient } from "../cloud";

export class EndpointClient implements IEndpointClient {
  public constructor(public readonly url: string) {}
}
