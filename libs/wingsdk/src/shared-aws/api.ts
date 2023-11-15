import { IResource } from "../std";

/**
 * A shared interface for AWS api.
 */
export interface IAwsApi {
  /**
   * Get internal AWS ApiGateway
   */
  innerAwsApi(): any;

  /**
   * Get internal AWS ApiGatewayStage
   */
  innerAwsStage(): any;
}

/**
 * A helper class for working with AWS apis.
 */
export class Api {
  /**
   * If the api is an AWS RestApi, return a helper interface for
   * working with it.
   * @param api The cloud.Api.
   */
  public static from(api: IResource): IAwsApi | undefined {
    if (this.isAwsApi(api)) {
      return api;
    }
    return undefined;
  }

  private static isAwsApi(obj: any): obj is IAwsApi {
    return (
      typeof obj.innerAwsApi === "function" &&
      typeof obj.innerAwsStage === "function"
    );
  }
}
