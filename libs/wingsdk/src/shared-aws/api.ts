import { cloud } from "..";

/**
 * The stage name for the API, used in its url.
 * @see https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html
 */
export const STAGE_NAME = "prod";

/**
 * A shared interface for AWS api.
 */
export interface IAwsApi {
  /**
   * RestApi arn
   */
  readonly restApiArn: string;

  /**
   * RestApi id
   */
  readonly restApiId: string;

  /**
   * RestApi id
   */
  readonly restApiName: string;

  /**
   * RestApi stage name
   */
  readonly stageName: string;

  /**
   * Invoke URL
   */
  readonly invokeUrl: string;

  /**
   * RestApi deployment id
   */
  readonly deploymentId: string;
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
  public static from(api: cloud.Api): IAwsApi | undefined {
    if (this.isAwsApi(api)) {
      return api;
    }
    return undefined;
  }

  private static isAwsApi(obj: any): obj is IAwsApi {
    return (
      typeof obj.restApiArn === "string" &&
      typeof obj.restApiId === "string" &&
      typeof obj.restApiName === "string" &&
      typeof obj.stageName === "string" &&
      typeof obj.invokeUrl === "string" &&
      typeof obj.deploymentId === "string"
    );
  }
}
