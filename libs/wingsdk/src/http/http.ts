import { Code, InflightClient } from "../core";

/**
 * RequestCache-
 * The cache read-only property that contains the cache mode of the request.
 * It controls how the request will interact with the browser's HTTP cache.

 */
export enum RequestCache {
  /**
   * The browser looks for a matching request in its HTTP cache.
   * If there is a match and it is fresh, it will be returned from the cache.
   * If there is a match but it is stale, the browser will make a conditional request to the remote server.
   * If the server indicates that the resource has not changed, it will be returned from the cache.
   * Otherwise the resource will be downloaded from the server and the cache will be updated.
   * If there is no match, the browser will make a normal request, and will update the cache with the downloaded resource.
   */
  DEFAULT = "default",
  /**
   * The browser fetches the resource from the remote server without first looking in the cache,
   * and will not update the cache with the downloaded resource.
   */
  NO_STORE = "no-store",
  /**
   * The browser fetches the resource from the remote server without first looking in the cache,
   * but then will update the cache with the downloaded resource.
   */
  RELOAD = "reload",
  /**
   * The browser looks for a matching request in its HTTP cache.
   * If there is a match, fresh or stale, the browser will make a conditional request to the remote server.
   * If the server indicates that the resource has not changed, it will be returned from the cache. Otherwise the resource will be downloaded from the server and the cache will be updated.
   * If there is no match, the browser will make a normal request, and will update the cache with the downloaded resource.
   */
  NO_CACHE = "no-cache",
  /**
   * The browser looks for a matching request in its HTTP cache.
   * If there is a match, fresh or stale, it will be returned from the cache.
   * If there is no match, the browser will make a normal request, and will update the cache with the downloaded resource.
   */
  FORCE_CACHE = "force-cache",
}
/**
 * The redirect read-only property that contains the mode for how redirects are handled.
 */
export enum RequestRedirect {
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
export enum HttpMethods {
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
}
/**
 * An object containing any custom settings that you want to apply to the request.
 */
export interface RequestOptions {
  /**
   * The request method, e.g., GET, POST. The default is GET.
   */
  readonly method?: HttpMethods;
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
   */
  readonly cache?: RequestCache;
  /**
   * he redirect mode to use: follow, error. The default is follow.
   */
  readonly redirect?: RequestRedirect;
  /**
   * A string specifying "no-referrer", client, or a URL. The default is "about:client".
   */
  readonly referrer?: string;
}
/**
 * Represents the response to a request.
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
   * The Headers object associated with the response.
   */
  readonly headers: Record<string, string>;
  /**
   * A string represents the body contents.
   */
  readonly body: string;
}
/**
 * default options to attach to any request
 */
const defaultOptions: RequestOptions = {
  method: HttpMethods.GET,
  headers: {},
  cache: RequestCache.DEFAULT,
  redirect: RequestRedirect.FOLLOW,
};
/**
 * the Http class is used for calling different HTTP methods and requesting and sending information online,
 *  as well as testing public accessible resources
 * @inflight
 */
export class Util {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }
  /**
   * Sends an http request of any method.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async fetch(url: string, options?: RequestOptions): Promise<Response> {
    const res = await fetch(url, { ...defaultOptions, ...options });
    return this._formatResponse(res);
  }
  /**
   * Sends a GET request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async get(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethods.GET,
    });
  }
  /**
   * Sends a POST request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async post(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethods.POST,
    });
  }
  /**
   * Sends a PUT request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async put(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethods.PUT,
    });
  }
  /**
   * Sends a PATCH request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async patch(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethods.PATCH,
    });
  }

  /**
   * Sends a DELETE request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async delete(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethods.DELETE,
    });
  }

  private static async _formatResponse(
    response: globalThis.Response
  ): Promise<Response> {
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
}
