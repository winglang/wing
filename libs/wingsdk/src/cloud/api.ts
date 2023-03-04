import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App, Inflight, Resource } from "../core";

/**
 * Global identifier for `Api`.
 */

export const API_FQN = fqnForType("cloud.Api");

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

export abstract class Api extends Resource {
  /**
   * Creates a new cloud.Api instance through the app.
   * @internal
   */
  public static _newApi(
    scope: Construct,
    id: string,
    props: ApiProps = {}
  ): Function {
    return App.of(scope).newAbstract(API_FQN, scope, id, props);
  }

  public readonly stateful = true;
  private apiSpec: any = {
    openapi: "3.0.3",
    paths: {},
  };
  constructor(scope: Construct, id: string, props: ApiProps = {}) {
    super(scope, id);

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
    const pathParams = route.match(/{(.*?)}/g);
    const pathParameters: any[] = [];
    if (pathParams) {
      pathParams.forEach((param) => {
        const paramName = param.replace("{", "").replace("}", "");
        pathParameters.push({
          name: paramName,
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        });
      });
    }
    const methodSpec = {
      [method.toLowerCase()]: {
        operationId: operationId,
        responses: {
          "200": {
            description: "200 response",
            content: {},
          },
        },
        parameters: pathParameters,
        ...apiSpecExtension,
      },
    };
    this.apiSpec.paths[route] = {
      ...this.apiSpec.paths[route],
      ...methodSpec,
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
 * Options for Api put endpoint.
 */
export interface ApiPutProps {}

/**
 * Options for Api put endpoint.
 */
export interface ApiDeleteProps {}

/**
 * Options for Api patch endpoint.
 */
export interface ApiPatchProps {}

/**
 * Options for Api patch endpoint.
 */
export interface ApiOptionsProps {}

/**
 * Options for Api patch endpoint.
 */
export interface ApiHeadProps {}

/**
 * Options for Api patch endpoint.
 */
export interface ApiConnectProps {}

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
export type Json = any;
//  {
//   [key: string]: Json | Json[] | string | number | boolean | null;
// }

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

export type Body = Map<string, string | number> | Map<string, Body>;

/**
 * Shape of a response from a inflight handler.
 */
export interface ApiResponse {
  /** The response's status code. */
  readonly status: number;
  /** The response's body. */
  readonly body?: Json;
  /** The response's headers. */
  readonly headers?: Record<string, string>;
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
