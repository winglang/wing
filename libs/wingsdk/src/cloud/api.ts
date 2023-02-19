import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Inflight, Resource } from "../core";
import { Code } from "../core/inflight";

/**
 * Global identifier for `Api`.
 */

export const API_TYPE = "wingsdk.cloud.Api";

/**
 * Properties for `Api`.
 */

export interface ApiProps {}
/**
 * The OpenAPI spec.
 */
// TODO: This should be a type from the OpenAPI spec. We can either use a external package or define it ourselves.
export type OpenApiSpec = any;

/**
 * The OpenAPI spec extension for a route.
 * TODO: Unsure how to type this.
 * */
export type OpenApiSpecExtension = any;

/**
 * Functionality shared between all `Api` implementations.
 */

export abstract class ApiBase extends Resource {
  public readonly stateful = true;
  private apiSpec: any = {
    openapi: "3.0.3",
    paths: {},
  };
  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id);

    if (!scope) {
      return;
    }

    props;

    this.display.title = "Api";
    this.display.description = "A REST API endpoint";
  }
  /**
   * Add a inflight handler to the api for GET requests on the given route.
   * @param route The route to handle GET requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   */
  public abstract get(
    route: string,
    inflight: Inflight,
    props?: ApiGetProps
  ): void;

  /**
   * Add a route to the api spec.
   * @param route The route to add.
   * @param method The method to add.
   * @param apiSpecExtension The extension to add to the api spec for this route and method.
   *
   * @internal
   * */
  public _addToSpec(
    route: string,
    method: string,
    apiSpecExtension: OpenApiSpecExtension
  ) {
    if (this.apiSpec.paths[route]?.[method.toLowerCase()]) {
      throw new Error(
        `Endpoint for path '${route}' and method '${method}' already exists`
      );
    }
    const operationId = `${method.toLowerCase()}${
      route === "/" ? "" : route.replace("/", "-")
    }`;
    this.apiSpec.paths[route] = {
      [method.toLowerCase()]: {
        operationId: operationId,
        responses: {
          "200": {
            description: "200 response",
            content: {},
          },
        },
        ...apiSpecExtension,
      },
    };
  }

  /**
   * Return the api spec.
   * @internal */
  public _getApiSpec(): OpenApiSpec {
    return this.apiSpec;
  }
}

/**
 * Options for Api get endpoint.
 */
export interface ApiGetProps {}

/**
 * Options for Api post endpoint.
 */
export interface ApiPostProps {}

/**
 * Base implementation of `cloud.Api`.
 */
export class Api extends ApiBase {
  constructor(scope: Construct, id: string, props: ApiProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(API_TYPE, scope, id, props) as Api;
  }

  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }

  /**
   *  Add a inflight to handle GET requests to a route.
   *
   * @param route
   * @param inflight
   * @param props
   */
  public get(route: string, inflight: Inflight, props?: ApiGetProps): void {
    route;
    inflight;
    props;
    throw new Error("Method not implemented.");
  }

  /**
   *  Add a inflight to handle POST requests to a route.
   *
   * @param route
   * @param inflight
   * @param props
   */
  public post(route: string, inflight: Inflight, props?: ApiPostProps): void {
    route;
    inflight;
    props;
    throw new Error("Method not implemented.");
  }
}

// TODO: this should be used once #1484 is fixed
// /**
//  * Allowed HTTP methods for a endpoint.
//  */
// export enum HttpMethod {
//   /** Get */
//   GET = "GET",
//   /** Head */
//   HEAD = "HEAD",
//   /** Post */
//   POST = "POST",
//   /** Put */
//   PUT = "PUT",
//   /** Delete */
//   DELETE = "DELETE",
//   /** Connect */
//   CONNECT = "Connect",
//   /** Options */
//   OPTIONS = "OPTIONS",
//   /** Patch */
//   PATCH = "PATCH",
// }

/**
 * Json type representation.
 */
// TODO: this should come from a shared package
export interface Json {
  [key: string]: Json | Json[] | string | number | boolean | null;
}

/**
 * Shape of a request to an inflight handler.
 */
export interface ApiRequest {
  /** The request's HTTP method. */
  readonly method: string;
  /** The request's path. */
  readonly path: string;
  /** The request's query string. */
  readonly query?: string;
  /** The path variables. */
  readonly vars?: Record<string, string>;
  /** The request's body. */
  readonly body?: Json;
  /** The request's headers. */
  readonly headers: Record<string, string>;
}

/**
 * Shape of a response from a inflight handler.
 */
export interface ApiResponse {
  /** The response's status code. */
  readonly status: number;
  /** The response's body. */
  readonly body?: any;
  /** The response's headers. */
  readonly headers: Record<string, string>;
}

/**
 * Inflight client for `IApiEndpointHandler`.
 */
export interface IApiEndpointHandlerClient {
  /**
   * Inflight that will be called when a request is made to the endpoint.
   * @inflight
   */
  handle(request: ApiRequest): Promise<ApiResponse>;
}
