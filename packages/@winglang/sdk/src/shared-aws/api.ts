import type { APIGatewayProxyEvent } from "aws-lambda";
import * as cloud from "../cloud";
import { InflightClient, lift } from "../core";
import { ResourceNames, CaseConventions } from "../shared/resource-names";
import { IInflightHost } from "../std";
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
 * Base class for AWS API.
 */
export abstract class Api extends cloud.Api implements IAwsApi {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("api", "api.inflight"),
      "ApiClient",
    );
  }

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

  public abstract get restApiArn(): string;
  public abstract get restApiId(): string;
  public abstract get restApiName(): string;
  public abstract get stageName(): string;
  public abstract get invokeUrl(): string;
  public abstract get deploymentId(): string;

  public onLift(host: IInflightHost, ops: string[]): void {
    host.addEnvironment(this.urlEnvName(), this.url);
    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $url: `process.env["${this.urlEnvName()}"]`,
    };
  }

  private urlEnvName(): string {
    return ResourceNames.generateName(this, {
      disallowedRegex: /[^a-zA-Z0-9_]/,
      sep: "_",
      case: CaseConventions.UPPERCASE,
    });
  }

  public abstract get(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiGetOptions,
  ): void;
  public abstract post(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiPostOptions,
  ): void;
  public abstract put(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiPutOptions,
  ): void;
  public abstract delete(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiDeleteOptions,
  ): void;
  public abstract patch(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiPatchOptions,
  ): void;
  public abstract options(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiOptionsOptions,
  ): void;
  public abstract head(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiHeadOptions,
  ): void;
  public abstract connect(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiConnectOptions,
  ): void;
}

/**
 * A helper class for working with AWS api endpoint handlers.
 */
export class ApiEndpointHandler {
  /**
   * Returns a `cloud.Function` handler for handling requests from a `cloud.Api`.
   * @param handler The `onRequest` handler.
   * @param headers HTTP response headers to add to all responses (used by CORS)
   * @returns The `cloud.Function` handler.
   */
  public static toFunctionHandler(
    handler: cloud.IApiEndpointHandler,
    headers?: Record<string, string>,
  ): cloud.IFunctionHandler {
    return lift({
      handler,
      headers: headers ?? {},
    }).inflight(async (ctx, request) => {
      const {
        apigwFunctionHandler,
        // eslint-disable-next-line @typescript-eslint/no-require-imports
      } = require("@winglang/sdk/lib/shared-aws/api-util.js");
      return apigwFunctionHandler(
        request as unknown as APIGatewayProxyEvent,
        ctx.handler,
        ctx.headers,
      );
    });
  }
}
