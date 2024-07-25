import { IEndpointClient } from "../cloud";

export class EndpointClient implements IEndpointClient {
  public readonly url: string;
  public constructor({ $url }: { $url: string }) {
    this.url = $url;
  }
}
