import { URL as NodeUrl, format } from "url";
import { InflightClient } from "../core";

/**
 * The cache mode of the request.
 * It controls how a request will interact with the system's HTTP cache.
 */
export enum RequestCache {
  /**
   * The runtime environment looks for a matching request in its HTTP cache.
   * * If there is a match and it is fresh, it will be returned from the cache.
   * * If there is a match but it is stale, the runtime environment will make a conditional request to the remote server.
   * * If the server indicates that the resource has not changed, it will be returned from the cache.
   * * Otherwise the resource will be downloaded from the server and the cache will be updated.
   * * If there is no match, the runtime environment will make a normal request, and will update the cache with the downloaded resource.
   */
  DEFAULT = "default",
  /**
   * The runtime environment fetches the resource from the remote server without first looking in the cache,
   * and will not update the cache with the downloaded resource.
   */
  NO_STORE = "no-store",
  /**
   * The runtime environment fetches the resource from the remote server without first looking in the cache,
   * but then will update the cache with the downloaded resource.
   */
  RELOAD = "reload",
  /**
   * The runtime environment looks for a matching request in its HTTP cache.
   * * If there is a match, fresh or stale, the runtime environment will make a conditional request to the remote server.
   * * If the server indicates that the resource has not changed, it will be returned from the cache. Otherwise the resource will be downloaded from the server and the cache will be updated.
   * * If there is no match, the runtime environment will make a normal request, and will update the cache with the downloaded resource.
   */
  NO_CACHE = "no-cache",
  /**
   * The runtime environment looks for a matching request in its HTTP cache.
   * * If there is a match, fresh or stale, it will be returned from the cache.
   * * If there is no match, the runtime environment will make a normal request, and will update the cache with the downloaded resource.
   */
  FORCE_CACHE = "force-cache",
}

/**
 * The redirect read-only property that contains the mode for how redirects are handled.
 */
export enum RequestRedirect {
  /**
   * Do not follow redirects automatically. The `Location` response header includes the redirect
   * target.
   */
  MANUAL = "manual",
  /**
   * Follow all redirects incurred when fetching a resource.
   */
  FOLLOW = "follow",
  /**
   * Return a network error when a request is met with a redirect.
   */
  ERROR = "error",
}

/**
 * The request's method
 */
export enum HttpMethod {
  /**
   * GET
   */
  GET = "GET",
  /**
   * PUT
   */
  PUT = "PUT",
  /**
   * DELETE
   */
  DELETE = "DELETE",
  /**
   * PATCH
   */
  PATCH = "PATCH",
  /**
   * POST
   */
  POST = "POST",
  /**
   * OPTIONS
   */
  OPTIONS = "OPTIONS",
  /**
   * HEAD
   */
  HEAD = "HEAD",
  /**
   * CONNECT
   */
  CONNECT = "CONNECT",
  /**
   * TRACE
   */
  TRACE = "TRACE",
}

/**
 * An object containing any custom settings that you want to apply to the request.
 */
export interface RequestOptions {
  /**
   * The request method, e.g., GET, POST. The default is GET.
   * @default GET
   */
  readonly method?: HttpMethod;
  /**
   * Any headers you want to add to your request.
   */
  readonly headers?: Record<string, string>;
  /**
   * Any body that you want to add to your request.
   * Note that a request using the GET or HEAD method cannot have a body.
   */
  readonly body?: string;
  /**
   * The cache mode you want to use for the request.
   * @default RequestCache.DEFAULT
   */
  readonly cache?: RequestCache;
  /**
   * An enum specifying the redirect mode to use: follow, error or manual. The default is follow.
   * @default RequestRedirect.FOLLOW
   */
  readonly redirect?: RequestRedirect;
  /**
   * A string specifying "no-referrer", client, or a URL. The default is "about:client".
   * @default about:client
   */
  readonly referrer?: string;
}
/**
 * The response to a HTTP request.
 */
export interface Response {
  /**
   * The status code of the response. (This will be 200 for a success).
   */
  readonly status: number;
  /**
   * The URL of the response.
   */
  readonly url: string;
  /**
   * A boolean indicating whether the response was successful (status in the range 200 – 299) or not.
   */
  readonly ok: boolean;
  /**
   * The map of header information associated with the response.
   */
  readonly headers: Record<string, string>;
  /**
   * A string representation of the body contents.
   */
  readonly body: string;
}

/**
 * An URL following WHATWG URL Standard.
 */
export interface Url {
  /** The entire URL. */
  readonly href: string;

  /** The URL's protocol. */
  readonly protocol: string;

  /** The URL's host. */
  readonly host: string;

  /** The URL's hostname. */
  readonly hostname: string;

  /** The URL's port. */
  readonly port: string;

  /** The URL's pathname. */
  readonly pathname: string;

  /** The URL's search. */
  readonly search: string;

  /** The URL's fragment. */
  readonly hash: string;

  /** The URL's origin. */
  readonly origin: string;

  /** The URL's username. */
  readonly username: string;

  /** The URL’s password. */
  readonly password: string;
}

/**
 * Options for serializing a WHATWG URL to a String.
 */
export interface FormatUrlOptions {
  /** Whether the formatted URL should include the username and password. */
  readonly auth?: boolean;

  /** Whether the formatted URL should include the fragment identifier. */
  readonly fragment?: boolean;

  /** Whether the formatted URL should include the search query. */
  readonly search?: boolean;

  /** Whether the formatted URL should represent Unicode characters for the host component. */
  readonly unicode?: boolean;
}

/**
 * Default options to attach to any request
 */
const defaultOptions: RequestOptions = {
  method: HttpMethod.GET,
  headers: {},
  cache: RequestCache.DEFAULT,
  redirect: RequestRedirect.FOLLOW,
};

/**
 * The Http class is used for calling different HTTP methods and requesting and sending information online,
 *  as well as testing public accessible resources
 * @inflight
 */
export class Util {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }
  /**
   * Executes a HTTP request to a specified URL and provides a formatted response.
   * This method allows various HTTP methods based on the provided options.
   * @throws Only throws if there is a networking error
   * @param url The target URL for the request.
   * @param options Optional parameters for customizing the HTTP request.
   * @inflight
   * @returns the formatted response of the call
   */
  public static async fetch(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    const res = await fetch(url, { ...defaultOptions, ...options });
    return this._formatResponse(res);
  }
  /**
   * Executes a GET request to a specified URL and provides a formatted response.
   * @param url The target URL for the GET request.
   * @param options Optional parameters for customizing the GET request.
   * @inflight
   * @returns the formatted response of the call
   */
  public static async get(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: HttpMethod.GET,
    });
  }
  /**
   * Executes a POST request to a specified URL and provides a formatted response.
   * @param url The target URL for the POST request.
   * @param options Optional parameters for customizing the POST request.
   * @inflight
   * @returns the formatted response of the call
   */
  public static async post(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: HttpMethod.POST,
    });
  }
  /**
   * Executes a PUT request to a specified URL and provides a formatted response.
   * @param url The target URL for the PUT request.
   * @param options ptional parameters for customizing the PUT request.
   * @inflight
   * @returns the formatted response of the call
   */
  public static async put(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: HttpMethod.PUT,
    });
  }
  /**
   * Executes a PATCH request to a specified URL and provides a formatted response.
   * @param url The target URL for the PATCH request.
   * @param options Optional parameters for customizing the PATCH request.
   * @inflight
   * @returns the formatted response of the call
   */
  public static async patch(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: HttpMethod.PATCH,
    });
  }

  /**
   * Executes a DELETE request to a specified URL and provides a formatted response.
   * @param url The target URL for the DELETE request.
   * @param options  Optional parameters for customizing the DELETE request.
   * @inflight
   * @returns the formatted response of the call
   */
  public static async delete(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: HttpMethod.DELETE,
    });
  }

  /**
   * Executes a CONNECT request to a specified URL and provides a formatted response.
   * @param url The target URL for the CONNECT request.
   * @param options Optional parameters for customizing the CONNECT request.
   * @inflight
   * @returns the formatted response of the call
   */
  public static async connect(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: HttpMethod.CONNECT,
    });
  }

  /**
   * Executes a TRACE request to a specified URL and provides a formatted response.
   * @param url The target URL for the TRACE request.
   * @param options Optional parameters for customizing the TRACE request.
   * @inflight
   * @returns the formatted response of the call
   */
  public static async trace(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: HttpMethod.TRACE,
    });
  }

  /**
   * Parses the input URL String using WHATWG URL API and returns an URL Struct.
   * @param urlString The URL String to be parsed.
   * @throws Will throw an error if the input String is not a valid URL.
   * @inflight
   * @returns An URL Struct.
   */
  public static parseUrl(urlString: string): Url {
    try {
      const nodeUrl = new NodeUrl(urlString);
      return {
        href: nodeUrl.href,
        protocol: nodeUrl.protocol,
        host: nodeUrl.host,
        hostname: nodeUrl.hostname,
        port: nodeUrl.port,
        pathname: nodeUrl.pathname,
        search: nodeUrl.search,
        hash: nodeUrl.hash,
        origin: nodeUrl.origin,
        username: nodeUrl.username,
        password: nodeUrl.password,
      };
    } catch (error) {
      throw new Error(`Invalid URL: ${urlString}`);
    }
  }

  /**
   * Serializes an URL Struct to a String.
   * @param url The URL Struct to be formatted.
   * @throws Will throw an error if the input URL has invalid fields.
   * @inflight
   * @returns A formatted URL String.
   */
  public static formatUrl(url: Url, options?: FormatUrlOptions): string {
    try {
      const nodeUrl = new NodeUrl(url.href);
      return format(nodeUrl, options);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to format URL Struct: ${error.message}`);
      } else {
        throw new Error(
          "Unable to format URL Struct: An unknown error occurred"
        );
      }
    }
  }

  private static async _formatResponse(
    response: globalThis.Response
  ): Promise<Response> {
    // convert Headers object into a plain JS object
    const headers: Record<string, string> = {};
    response.headers?.forEach((val: string, key: string) => {
      headers[key] = val;
    });

    return {
      status: response.status,
      url: response.url,
      ok: response.ok,
      headers: headers,
      body: await response.text(),
    };
  }
  private constructor() {}
}
