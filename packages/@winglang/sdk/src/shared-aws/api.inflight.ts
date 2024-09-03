import { IApiClient } from "../cloud";

export class ApiClient implements IApiClient {
  public readonly url: string;
  public constructor({ $url }: { $url: string }) {
    this.url = $url;
  }
}
