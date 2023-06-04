export enum RequestCache {
  DEFAULT = "default",
  NO_STORE = "no-store",
  RELOAD = "reload",
  NO_CACHE = "no-cache",
  FORCE_CACHE = "force-cache",
}

export enum RequestRedirect {
  FOLLOW = "follow",
  ERROR = "error",
}

export enum HttpMethods {
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  POST = "POST",
}

export interface RequestOptions {
  readonly method: HttpMethods;
  readonly headers: Record<string, string>;
  readonly body?: string;
  readonly cache: RequestCache;
  readonly redirect: RequestRedirect;
  readonly referrer?: string;
}

export interface Response {
  readonly status: number;
  readonly url: string;
  readonly ok: boolean;
  readonly headers: Record<string, string>;
  readonly body: string;
}

const defaultOptions: RequestOptions = {
  method: HttpMethods.GET,
  headers: {},
  cache: RequestCache.DEFAULT,
  redirect: RequestRedirect.FOLLOW,
};
/**
 * @inflight
 */
export class Http {
  static async fetch(url: string, options?: RequestOptions): Promise<Response> {
    const res = await fetch(url, { ...defaultOptions, ...options });
    return this._formatResponse(res);
  }
  /**
   *
   * @param url
   * @param options
   * @returns Response
   * @inflight
   */
  static async get(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethods.GET,
    });
  }
  /**
   *
   * @param url
   * @param options
   * @returns Response
   * @inflight
   */
  static async post(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethods.POST,
    });
  }
  /**
   *
   * @param url
   * @param options
   * @returns Response
   * @inflight
   */
  static async put(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethods.PUT,
    });
  }
  /**
   *
   * @param url
   * @param options
   * @returns Response
   * @inflight
   */
  static async patch(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethods.PATCH,
    });
  }

  private static async _formatResponse(
    response: globalThis.Response
  ): Promise<Response> {
    const headers: Record<string, string> = {};
    response.headers.forEach((val: string, key: string) => {
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

// export interface IHttp {
//   fetch(url: string, options?: RequestOptions): Promise<Response>;
//   /**
//    *
//    * @param url
//    * @param options
//    * @returns Response
//    * @inflight
//    */
//   get(url: string, options?: RequestOptions): Promise<Response>;
//   /**
//    *
//    * @param url
//    * @param options
//    * @returns
//    */
//   post(url: string, options?: RequestOptions): Promise<Response>;
//   /**
//    *
//    * @param url
//    * @param options
//    * @returns
//    */
//   put(url: string, options?: RequestOptions): Promise<Response>;
//   patch(url: string, options?: RequestOptions): Promise<Response>;
// }
