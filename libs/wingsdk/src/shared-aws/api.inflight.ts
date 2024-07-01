import { IApiClient } from "../cloud";

export class ApiClient implements IApiClient {
  public constructor(public readonly url: string) {}
}
