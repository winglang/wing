import { IResource } from "../std";

/**
 * A shared interface for AWS api.
 */
export interface IAwsApi {
  /**
   * RestApi id
   */
  restApiId(): string;

  /**
   * RestApi arn
   */
  restApiArn(): string;

  /**
   * RestApi arn
   */
  restApiExecutionArn(): string;

  /**
   * RestApi stage name
   */
  stageName(): string;

  /**
   * Invoke URL
   */
  invokeUrl(): string;

  /**
   * restApi deployment id
   */
  deploymentId(): string;
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
      typeof obj.restApiId === "function" &&
      typeof obj.restApiArn === "function" &&
      typeof obj.restApiExecutionArn === "function" &&
      typeof obj.stageName === "function" &&
      typeof obj.invokeUrl === "function" &&
      typeof obj.deploymentId === "function"
    );
  }
}
