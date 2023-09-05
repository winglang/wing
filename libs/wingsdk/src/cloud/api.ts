import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core";
import { IResource, Node, Resource } from "../std";

/**
 * Global identifier for `Api`.
 */

export const API_FQN = fqnForType("cloud.Api");

/**
 * Options for `Api`.
 */

export interface ApiProps {}
/**
 * The OpenAPI spec.
 */
// TODO: This should be a type from the OpenAPI spec. We can either use a external package or define it ourselves.
export type OpenApiSpec = any;

/**
 * The OpenAPI spec extension for a route.
 * see https://spec.openapis.org/oas/v3.0.3
 * */
export type OpenApiSpecExtension = any;

/**
 * Functionality shared between all `Api` implementations.
 * @inflight  `@winglang/sdk.cloud.IApiClient`
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
  ): Api {
    return App.of(scope).newAbstract(API_FQN, scope, id, props);
  }

  /**
   * The base URL of the API endpoint.
   */
  public abstract readonly url: string;

  // https://spec.openapis.org/oas/v3.0.3
  private apiSpec: any = {
    openapi: "3.0.3",
    paths: {},
  };

  constructor(scope: Construct, id: string, props: ApiProps = {}) {
    super(scope, id);

    props;

    Node.of(this).title = "Api";
    Node.of(this).description = "A REST API endpoint";
  }

  /** @internal */
  public _getInflightOps(): string[] {
    return [];
  }

  /**
   * Add a inflight handler to the api for GET requests on the given path.
   * @param path The path to handle GET requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   */
  public abstract get(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiGetProps
  ): void;

  /**
   * Add a inflight handler to the api for POST requests on the given path.
   * @param path The path to handle POST requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   */
  public abstract post(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiPostProps
  ): void;

  /**
   * Add a inflight handler to the api for PUT requests on the given path.
   * @param path The path to handle PUT requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   */
  public abstract put(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiPutProps
  ): void;

  /**
   * Add a inflight handler to the api for DELETE requests on the given path.
   * @param path The path to handle DELETE requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   */
  public abstract delete(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiDeleteProps
  ): void;

  /**
   * Add a inflight handler to the api for PATCH requests on the given path.
   * @param path The path to handle PATCH requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   */
  public abstract patch(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiPatchProps
  ): void;

  /**
   * Add a inflight handler to the api for OPTIONS requests on the given path.
   * @param path The path to handle OPTIONS requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   */
  public abstract options(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiOptionsProps
  ): void;

  /**
   * Add a inflight handler to the api for HEAD requests on the given path.
   * @param path The path to handle HEAD requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   */
  public abstract head(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiHeadProps
  ): void;

  /**
   * Add a inflight handler to the api for CONNECT requests on the given path.
   * @param path The path to handle CONNECT requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   */
  public abstract connect(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiConnectProps
  ): void;
  /**
   * Validating path:
   * if has curly brackets pairs- the part that inside the brackets is only letter, digit or _, not empty and placed before and after "/"
   * @param path
   * @throws if the path is invalid
   * @internal
   */
  protected _validatePath(path: string) {
    if (
      !/^(\/[a-zA-Z0-9_\-]+(\/\{[a-zA-Z0-9_\-]+\}|\/[a-zA-Z0-9_\-]+)*(?:\?[^#]*)?)?$|^(\/\{[a-zA-Z0-9_\-]+\})*\/?$/g.test(
        path
      )
    ) {
      throw new Error(
        `Invalid path ${path}. Url cannot contain ":", params contains only alpha-numeric chars or "_".`
      );
    }
  }

  /**
   * Add a route to the api spec.
   * @param path The path to add.
   * @param method The method to add.
   * @param apiSpecExtension The extension to add to the api spec for this route and method.
   *
   * @internal
   * */
  public _addToSpec(
    path: string,
    method: string,
    apiSpecExtension: OpenApiSpecExtension
  ) {
    if (this.apiSpec.paths[path]?.[method.toLowerCase()]) {
      throw new Error(
        `Endpoint for path '${path}' and method '${method}' already exists`
      );
    }
    const operationId = `${method.toLowerCase()}${
      path === "/" ? "" : path.replace("/", "-")
    }`;
    const pathParams = path.match(/{(.*?)}/g);
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
    this.apiSpec.paths[path] = {
      ...this.apiSpec.paths[path],
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

/**
 * Inflight methods and members of `cloud.Api`.
 */
export interface IApiClient {}

/**
 * Allowed HTTP methods for a endpoint.
 */
export enum HttpMethod {
  /** Get */
  GET = "GET",
  /** Head */
  HEAD = "HEAD",
  /** Post */
  POST = "POST",
  /** Put */
  PUT = "PUT",
  /** Delete */
  DELETE = "DELETE",
  /** Connect */
  CONNECT = "CONNECT",
  /** Options */
  OPTIONS = "OPTIONS",
  /** Patch */
  PATCH = "PATCH",
}

/**
 * Shape of a request to an inflight handler.
 */
export interface ApiRequest {
  /** The request's HTTP method. */
  readonly method: HttpMethod;
  /** The request's path. */
  readonly path: string;
  /** The request's query string values. */
  readonly query: Record<string, string>;
  /** The path variables. */
  readonly vars: Record<string, string>;
  /** The request's body. */
  readonly body?: string;
  /** The request's headers. */
  readonly headers?: Record<string, string>;
}

/**
 * Shape of a response from a inflight handler.
 */
export interface ApiResponse {
  /** The response's status code. */
  readonly status: number;
  /** The response's body. */
  readonly body?: string;
  /** The response's headers. */
  readonly headers?: Record<string, string>;
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * one of the `Api` request preflight methods.
 *
 * @inflight `@winglang/sdk.cloud.IApiEndpointHandlerClient`
 */
export interface IApiEndpointHandler extends IResource {}

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

/**
 * Parse an HTTP method string to an HttpMethod enum
 * @param method HTTP method string
 * @returns HttpMethod enum
 * @throws Error if the method is not supported
 */
export function parseHttpMethod(method: string): HttpMethod {
  switch (method) {
    case "GET":
      return HttpMethod.GET;
    case "POST":
      return HttpMethod.POST;
    case "PUT":
      return HttpMethod.PUT;
    case "HEAD":
      return HttpMethod.HEAD;
    case "DELETE":
      return HttpMethod.DELETE;
    case "CONNECT":
      return HttpMethod.CONNECT;
    case "OPTIONS":
      return HttpMethod.OPTIONS;
    case "PATCH":
      return HttpMethod.PATCH;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
}

/**
 * Convert an object with multi-valued parameters to a an object with
 * single-valued parameters.
 */
export function sanitizeParamLikeObject(
  obj: Record<string, string | string[] | undefined>
) {
  const newObj: Record<string, string> = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (Array.isArray(value)) {
      newObj[key] = value.join(",");
    } else if (typeof value === "string") {
      newObj[key] = value;
    }
  });
  return newObj;
}
