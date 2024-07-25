import { Construct } from "constructs";
import { Endpoint } from "./endpoint";
import { FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { AbstractMemberError } from "../core/errors";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Node, Resource, Duration, IInflight } from "../std";

/**
 * Global identifier for `Api`.
 */

export const API_FQN = fqnForType("cloud.Api");

/**
 * List of inflight operations available for `Api`.
 * @internal
 */
export enum ApiInflightMethods {}

/**
 * Cors Options for `Api`.
 */
export interface ApiCorsOptions {
  /**
   * The allowed origin.
   * @example "https://example.com"
   * @default - "*"
   */
  readonly allowOrigin?: string;

  /**
   * The list of allowed methods.
   * @example [HttpMethod.GET, HttpMethod.POST]
   * @default - [HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH, HttpMethod.DELETE, HttpMethod.HEAD, HttpMethod.OPTIONS]
   */
  readonly allowMethods?: Array<HttpMethod>;

  /**
   * The list of allowed headers.
   * @example ["Content-Type"]
   * @default - ["Content-Type", "Authorization"]
   */
  readonly allowHeaders?: Array<string>;

  /**
   * The list of exposed headers.
   * @example ["Content-Type"]
   * @default - []
   */
  readonly exposeHeaders?: Array<string>;

  /**
   * Whether to allow credentials.
   * @default - false
   */
  readonly allowCredentials?: boolean;

  /**
   * How long the browser should cache preflight request results.
   * @default - 300 seconds
   */
  readonly maxAge?: Duration;
}

/**
 * Options for `Api`.
 */

export interface ApiProps {
  /**
   * Options for configuring the API's CORS behavior across all routes.
   * Options can also be overridden on a per-route basis. (not yet implemented)
   * When enabled this will add CORS headers with default options.
   * Can be customized by passing `corsOptions`
   * @example true
   * @default - false, CORS configuration is disabled
   */
  readonly cors?: boolean;

  /**
   * Options for configuring the API's CORS behavior across all routes.
   * Options can also be overridden on a per-route basis. (not yet implemented)
   *
   * @example { allowOrigin: "https://example.com" }
   * @default - Default CORS options are applied when `cors` is set to `true`
   *  allowOrigin: "*",
   *  allowMethods: [
   *   HttpMethod.GET,
   *   HttpMethod.POST,
   *   HttpMethod.PUT,
   *   HttpMethod.DELETE,
   *   HttpMethod.HEAD,
   *   HttpMethod.OPTIONS,
   *  ],
   *  allowHeaders: ["Content-Type", "Authorization"],
   *  exposeHeaders: [],
   *  allowCredentials: false,
   *
   */
  readonly corsOptions?: ApiCorsOptions;
}
/**
 * The OpenAPI spec.
 */
// TODO: This should be a type from the OpenAPI spec. We can either use a external package or define it ourselves.
export type OpenApiSpec = any;

/**
 * The OpenAPI spec extension for a route.
 * @see https://spec.openapis.org/oas/v3.0.3
 * */
export type OpenApiSpecExtension = any;

/**
 * The OpenAPI spec for CORS headers.
 * */
export type OpenApiCorsHeaders = Record<string, { schema: { type: string } }>;

/**
 * Type definition for default CORS headers.
 * @property {string} "Access-Control-Allow-Origin" - Specifies the origin that is allowed to access the resource. See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin}
 * @property {string} "Access-Control-Expose-Headers" - Lists the headers that the client can access. See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers}
 * @property {string} "Access-Control-Allow-Credentials" - Indicates whether the response to the request can be exposed when the credentials flag is true. See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials}
 */
type CorsDefaultResponseHeaders = { [key: string]: string };

/**
 * Type definition for CORS option headers.
 * @property {string} "Access-Control-Allow-Origin" - Specifies the origin that is allowed to access the resource. See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin}
 * @property {string} "Access-Control-Allow-Headers" - Specifies the headers that are allowed in a request. See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers}
 * @property {string} "Access-Control-Allow-Methods" - Specifies the methods that are allowed in a request. See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods}
 * @property {string} "Access-Control-Max-Age" - Indicates how long the results of a preflight request can be cached. See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age}
 */
type CorsOptionsResponseHeaders = { [key: string]: string };

/**
 * Type definition for CORS headers which includes default and options headers.
 */
export interface CorsHeaders {
  /**
   * Default CORS response headers.
   */
  readonly defaultResponse: CorsDefaultResponseHeaders;

  /**
   * CORS options response headers.
   */
  readonly optionsResponse: CorsOptionsResponseHeaders;
}

/**
 * Functionality shared between all `Api` implementations.
 * @inflight `@winglang/sdk.cloud.IApiClient`
 * @abstract
 */

export class Api extends Resource {
  /** @internal */
  public static _methods = [];

  /**
   * Converts input path to a valid OpenAPI path (replaces `:` based path params with `{}`)
   * @param path The path to convert (assumes path is valid)
   * @returns OpenAPI path
   */
  public static renderOpenApiPath(path: string) {
    return path.replace(/\/:([A-Za-z0-9_-]+)/g, "/{$1}");
  }

  /**
   * Generates an object containing default CORS response headers and OPTIONS response headers.
   * @param corsOptions The CORS options to generate the headers from.
   * @returns An object containing default CORS response headers and OPTIONS response headers.
   */
  public static renderCorsHeaders(
    corsOptions?: ApiCorsOptions
  ): CorsHeaders | undefined {
    if (corsOptions == undefined) {
      return;
    }

    const {
      allowOrigin = "*",
      allowHeaders = [],
      allowMethods = [],
      exposeHeaders = [],
      allowCredentials = false,
      maxAge = Duration.fromMinutes(5),
    } = corsOptions;

    const defaultHeaders: CorsDefaultResponseHeaders = {
      "Access-Control-Allow-Origin": allowOrigin || "*",
      "Access-Control-Expose-Headers": exposeHeaders.join(",") || "",
      "Access-Control-Allow-Credentials": allowCredentials ? "true" : "false",
    };

    const optionsHeaders: CorsOptionsResponseHeaders = {
      "Access-Control-Allow-Origin": allowOrigin || "*",
      "Access-Control-Allow-Headers": allowHeaders.join(",") || "",
      "Access-Control-Allow-Methods": allowMethods.join(",") || "",
      "Access-Control-Max-Age": maxAge.seconds.toString(),
    };

    return {
      defaultResponse: defaultHeaders,
      optionsResponse: optionsHeaders,
    };
  }

  /**
   * The base URL of the API endpoint.
   */
  public get url(): string {
    return this._endpoint.url;
  }

  /**
   * The Endpoint of the API.
   * @abstract
   * @internal
   */
  protected get _endpoint(): Endpoint {
    throw new AbstractMemberError();
  }

  // https://spec.openapis.org/oas/v3.0.3
  private apiSpec: any = {
    paths: {},
  };

  private corsDefaultValues: ApiCorsOptions = {
    allowOrigin: "*",
    allowMethods: [
      HttpMethod.GET,
      HttpMethod.POST,
      HttpMethod.PUT,
      HttpMethod.DELETE,
      HttpMethod.HEAD,
      HttpMethod.OPTIONS,
    ],
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposeHeaders: [],
    allowCredentials: false,
    maxAge: Duration.fromMinutes(5),
  };

  /**
   * CORS options for api
   */
  protected corsOptions?: ApiCorsOptions;

  /** @internal */
  public [INFLIGHT_SYMBOL]?: IApiClient;

  constructor(scope: Construct, id: string, props: ApiProps = {}) {
    if (new.target === Api) {
      return Resource._newFromFactory(API_FQN, scope, id, props);
    }

    super(scope, id);

    this.corsOptions = props.cors ? this._cors(props.corsOptions) : undefined;

    Node.of(this).title = "Api";
    Node.of(this).description = "A REST API endpoint";
  }

  /**
   * Add a inflight handler to the api for GET requests on the given path.
   * @param path The path to handle GET requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   * @abstract
   */
  public get(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiGetOptions
  ): void {
    path;
    inflight;
    props;
    throw new AbstractMemberError();
  }

  /**
   * Add a inflight handler to the api for POST requests on the given path.
   * @param path The path to handle POST requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   * @abstract
   */
  public post(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiPostOptions
  ): void {
    path;
    inflight;
    props;
    throw new AbstractMemberError();
  }

  /**
   * Add a inflight handler to the api for PUT requests on the given path.
   * @param path The path to handle PUT requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   * @abstract
   */
  public put(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiPutOptions
  ): void {
    path;
    inflight;
    props;
    throw new AbstractMemberError();
  }

  /**
   * Add a inflight handler to the api for DELETE requests on the given path.
   * @param path The path to handle DELETE requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   * @abstract
   */
  public delete(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiDeleteOptions
  ): void {
    path;
    inflight;
    props;
    throw new AbstractMemberError();
  }

  /**
   * Add a inflight handler to the api for PATCH requests on the given path.
   * @param path The path to handle PATCH requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   * @abstract
   */
  public patch(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiPatchOptions
  ): void {
    path;
    inflight;
    props;
    throw new AbstractMemberError();
  }

  /**
   * Add a inflight handler to the api for OPTIONS requests on the given path.
   * @param path The path to handle OPTIONS requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   * @abstract
   */
  public options(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiOptionsOptions
  ): void {
    path;
    inflight;
    props;
    throw new AbstractMemberError();
  }

  /**
   * Add a inflight handler to the api for HEAD requests on the given path.
   * @param path The path to handle HEAD requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   * @abstract
   */
  public head(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiHeadOptions
  ): void {
    path;
    inflight;
    props;
    throw new AbstractMemberError();
  }

  /**
   * Add a inflight handler to the api for CONNECT requests on the given path.
   * @param path The path to handle CONNECT requests for.
   * @param inflight The function to handle the request.
   * @param props Options for the route.
   * @abstract
   */
  public connect(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiConnectOptions
  ): void {
    path;
    inflight;
    props;
    throw new AbstractMemberError();
  }
  /**
   * Validating path:
   * if has `:` prefix - the part following that prefix is only letter, digit or _, not empty and placed before and after "/"
   * @param path
   * @throws if the path is invalid
   * @internal
   */
  protected _validatePath(path: string) {
    if (
      !/^((\/\:[a-zA-Z0-9_\-]+|\/[a-zA-Z0-9_\-\.]*)*(?:\?[^#]*)?)?$/g.test(path)
    ) {
      throw new Error(
        `Invalid path ${path}. Url parts can only contain alpha-numeric chars, "-", "_" and ".". Params can only contain alpha-numeric chars and "_".`
      );
    }
  }

  /**
   * Returns CORS configuration. If props are provided, they will have precedence over defaults.
   * @param props
   * @returns ApiCorsOptions
   * @internal
   */
  protected _cors(props?: ApiCorsOptions): ApiCorsOptions {
    return {
      ...this.corsDefaultValues,
      ...props,
    };
  }

  /**
   * Checks if two given paths are siblings.
   * @param pathA
   * @param pathB
   * @returns A boolean value indicating if provided paths are siblings.
   * @internal
   */

  protected _arePathsSiblings(pathA: string, pathB: string): boolean {
    const partsA = pathA.split("/");
    const partsB = pathB.split("/");

    let shorter = partsA.length < partsB.length ? partsA : partsB;

    for (let i = 0; i < shorter.length; i++) {
      const partA = partsA[i];
      const partB = partsB[i];
      if (
        (!partA.match(/^:.+?$/) || !partB.match(/^:.+?$/)) &&
        partA[i] !== partB[i]
      ) {
        return false;
      }

      if (
        partA.match(/^:.+?$/) &&
        partB.match(/^:.+?$/) &&
        partA[i] !== partB[i]
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if two given paths are ambiguous.
   * @param pathA
   * @param pathB
   * @returns A boolean value indicating if provided paths are ambiguous.
   * @internal
   */
  protected _arePathsAmbiguous(pathA: string, pathB: string): boolean {
    const partsA = pathA.split("/");
    const partsB = pathB.split("/");

    if (partsA.length !== partsB.length) {
      return false;
    }

    for (let i = 0; i < partsA.length; i++) {
      const partA = partsA[i];
      const partB = partsB[i];

      if (partA !== partB && !partA.match(/^:.+?$/) && !partB.match(/^:.+?$/)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks if provided path and method are ambigous with paths and methods already defined in the api spec.
   * @param path Path to be checked
   * @param method HTTP method
   * @returns A boolean value indicating if provided path and method are ambiguous.
   * @internal
   */
  protected _findAmbiguousPath(
    path: string,
    method: string
  ): string | undefined {
    const existingPaths = Object.keys(this.apiSpec.paths);

    return existingPaths.find(
      (existingPath) =>
        !!this.apiSpec.paths[existingPath][method.toLowerCase()] &&
        this._arePathsAmbiguous(existingPath, path)
    );
  }

  /**
   * Checks if provided path is a sibling of paths already defined in the api spec- i.e "/:username" and "/:id".
   * @param path Path to be checked
   * @returns A boolean value indicating if provided path has a sibling.
   * @internal
   */
  private _findSiblingPath(path: string): string | undefined {
    const existingPaths = Object.keys(this.apiSpec.paths);

    return existingPaths.find((existingPath) =>
      this._arePathsSiblings(existingPath, path)
    );
  }

  /**
   * Generates the OpenAPI schema for CORS headers based on the provided CORS options.
   * @param corsOptions The CORS options to generate the schema from.
   * @returns An object representing the OpenAPI schema for CORS headers.
   */
  private _corsOpenApiSchema(corsOptions?: ApiCorsOptions): OpenApiCorsHeaders {
    const corsHeaders: OpenApiCorsHeaders = {};
    if (corsOptions) {
      const corsHeaderSchema = {
        schema: {
          type: "string",
        },
      };
      corsHeaders["Access-Control-Allow-Origin"] = corsHeaderSchema;
      corsHeaders["Access-Control-Allow-Methods"] = corsHeaderSchema;
      corsHeaders["Access-Control-Allow-Headers"] = corsHeaderSchema;
      corsHeaders["Access-Control-Max-Age"] = corsHeaderSchema;
    }
    return corsHeaders;
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
    apiSpecExtension: OpenApiSpecExtension,
    corsOptions?: ApiCorsOptions
  ) {
    if (this.apiSpec.paths[path]?.[method.toLowerCase()]) {
      throw new Error(
        `Endpoint for path '${path}' and method '${method}' already exists`
      );
    }
    const ambiguousPath = this._findAmbiguousPath(path, method);
    if (!!ambiguousPath) {
      throw new Error(
        `Endpoint for path '${path}' and method '${method}' is ambiguous - it conflicts with existing endpoint for path '${ambiguousPath}'`
      );
    }
    const siblingPath = this._findSiblingPath(path);
    if (!!siblingPath) {
      throw new Error(
        `Endpoint for path '${path}' and method '${method}' conflicts with existing sibling endpoint for path '${siblingPath}'- try to match the parameter names to avoid this error.`
      );
    }
    const operationId = `${method.toLowerCase()}${
      path === "/" ? "" : path.replace("/", "-")
    }`;
    const pathParams = path.match(/:([A-Za-z0-9_-]+)/g);
    const pathParameters: any[] = [];
    if (pathParams) {
      pathParams.forEach((param) => {
        const paramName = param.replace(":", "");
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
    const corsOpenApiSchema = this._corsOpenApiSchema(corsOptions);
    const methodSpec = {
      [method.toLowerCase()]: {
        operationId: operationId,
        responses: {
          "200": {
            description: "200 response",
            content: {},
            ...(Object.keys(corsOpenApiSchema).length > 0
              ? { headers: corsOpenApiSchema }
              : {}),
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
   * Return the OpenAPI spec for this Api.
   * @internal */
  public _getOpenApiSpec(): OpenApiSpec {
    // Convert our paths to valid OpenAPI paths
    let paths: { [key: string]: any } = {};
    Object.keys(this.apiSpec.paths).forEach((key) => {
      paths[Api.renderOpenApiPath(key)] = this.apiSpec.paths[key];
    });

    // https://spec.openapis.org/oas/v3.0.3
    return {
      ...this.apiSpec,
      openapi: "3.0.3",
      paths: paths,
    };
  }
}

/**
 * Base options for Api endpoints.
 */
export interface ApiEndpointOptions extends FunctionProps {}

/**
 * Options for Api get endpoint.
 */
export interface ApiGetOptions extends ApiEndpointOptions {}

/**
 * Options for Api post endpoint.
 */
export interface ApiPostOptions extends ApiEndpointOptions {}

/**
 * Options for Api put endpoint.
 */
export interface ApiPutOptions extends ApiEndpointOptions {}

/**
 * Options for Api put endpoint.
 */
export interface ApiDeleteOptions extends ApiEndpointOptions {}

/**
 * Options for Api patch endpoint.
 */
export interface ApiPatchOptions extends ApiEndpointOptions {}

/**
 * Options for Api patch endpoint.
 */
export interface ApiOptionsOptions extends ApiEndpointOptions {}

/**
 * Options for Api patch endpoint.
 */
export interface ApiHeadOptions extends ApiEndpointOptions {}

/**
 * Options for Api patch endpoint.
 */
export interface ApiConnectOptions extends ApiEndpointOptions {}

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

export const DEFAULT_RESPONSE_STATUS = 200;

/**
 * Shape of a response from a inflight handler.
 */
export interface ApiResponse {
  /**
   * The response's status code.
   * @default 200
   **/
  readonly status?: number;

  /**
   * The response's body.
   * @default - no body
   **/
  readonly body?: string;
  /**
   * The response's headers.
   * @default {}
   **/
  readonly headers?: Record<string, string>;
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * one of the `Api` request preflight methods.
 *
 * @inflight `@winglang/sdk.cloud.IApiEndpointHandlerClient`
 */
export interface IApiEndpointHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IApiEndpointHandlerClient["handle"];
}

/**
 * Inflight client for `IApiEndpointHandler`.
 */
export interface IApiEndpointHandlerClient {
  /**
   * Inflight that will be called when a request is made to the endpoint.
   * @inflight
   */
  handle(request: ApiRequest): Promise<ApiResponse | undefined>;
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
