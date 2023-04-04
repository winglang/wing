import { IApiClient } from "../cloud";

export class ApiClient implements IApiClient {
  // TODO: does `url` belong inside the inflight class?
  public constructor(public readonly url: string) {}
}
