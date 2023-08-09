import { test, describe, beforeEach, vi, Mock, expect } from "vitest";
import {
  Util as Http,
  HttpMethod,
  Response,
  RequestCache,
  RequestRedirect,
} from "../../src/http/http";

let defaultOptions = {
  method: HttpMethod.GET,
  headers: {},
  cache: RequestCache.DEFAULT,
  redirect: RequestRedirect.FOLLOW,
};

const URL = "http://api.url.com";

describe("fetch", () => {
  global.fetch = vi.fn();

  beforeEach(() => {
    (global.fetch as Mock).mockClear();
  });

  test("get, post, put, patch and delete return response when supplying a url", async () => {
    (global.fetch as Mock).mockImplementation((url) => ({
      url,
      headers: new Headers([["content-type", "application/json"]]),
      status: 200,
      text: () => Promise.resolve("ok!"),
    }));

    const expectResponse = (response: Response) => {
      expect(response.body).toBe("ok!");
      expect(response.url).toBe(URL);
      expect(response.status).toBe(200);
      expect(response.headers).toEqual({ "content-type": "application/json" });
    };

    expectResponse(await Http.get(URL));
    expectResponse(await Http.put(URL));
    expectResponse(await Http.post(URL));
    expectResponse(await Http.patch(URL));
    expectResponse(await Http.delete(URL));
  });

  test("http.fetch is working with all methods", async () => {
    (global.fetch as Mock).mockImplementation((url) => ({
      url,
      headers: new Headers([["content-type", "application/json"]]),
      status: 200,
      text: () => Promise.resolve("ok!"),
    }));

    const expectResponse = (response: Response) => {
      expect(response.body).toBe("ok!");
      expect(response.url).toBe(URL);
      expect(response.status).toBe(200);
      expect(response.headers).toEqual({ "content-type": "application/json" });
    };

    for (let method in HttpMethod) {
      expectResponse(
        //@ts-expect-error- ts thinks method is a string
        await Http.fetch(URL, { method })
      );
    }
  });

  test("getting back json body parses well", async () => {
    let jsonBody = { a: "hello", b: 2.2, c: false };
    (global.fetch as Mock).mockImplementation((url) => ({
      url,
      headers: new Headers([["content-type", "application/json"]]),
      status: 200,
      text: () => Promise.resolve(JSON.stringify(jsonBody)),
    }));

    const expectResponse = (response: Response) => {
      expect(JSON.parse(response.body ?? "")).toEqual(jsonBody);
      expect(response.url).toBe(URL);
      expect(response.status).toBe(200);
      expect(response.headers).toEqual({ "content-type": "application/json" });
    };

    for (let method in HttpMethod) {
      expectResponse(
        //@ts-expect-error- ts thinks method is a string
        await Http.fetch(URL, { method })
      );
    }
    expectResponse(await Http.get(URL));
    expectResponse(await Http.put(URL));
    expectResponse(await Http.post(URL));
    expectResponse(await Http.patch(URL));
    expectResponse(await Http.delete(URL));
  });

  test("http.get with no options implements all default options", async () => {
    (global.fetch as Mock).mockImplementation((url) => ({
      url,
      headers: new Headers([["content-type", "application/json"]]),
      status: 200,
      text: () => Promise.resolve("ok!"),
    }));

    let f = vi.spyOn(global, "fetch");

    await Http.get(URL);

    expect(f).toBeCalledWith(URL, { ...defaultOptions });
  });

  test("http.fetch with no options implements all default options", async () => {
    (global.fetch as Mock).mockImplementation((url) => ({
      url,
      headers: new Headers([["content-type", "application/json"]]),
      status: 200,
      text: () => Promise.resolve("ok!"),
    }));

    let f = vi.spyOn(global, "fetch");

    await Http.fetch(URL);

    expect(f).toBeCalledWith(URL, defaultOptions);
  });

  test("http.put method cannot be overridden", async () => {
    (global.fetch as Mock).mockImplementation((url) => ({
      url,
      headers: new Headers([["content-type", "application/json"]]),
      status: 200,
      text: () => Promise.resolve("ok!"),
    }));

    let f = vi.spyOn(global, "fetch");

    await Http.put(URL, { method: HttpMethod.GET });

    expect(f).toBeCalledWith(URL, {
      ...defaultOptions,
      method: HttpMethod.PUT,
    });
  });

  test("url without a protocol assigned to http", async () => {
    let f = vi.spyOn(global, "fetch");

    await Http.fetch("url");

    expect(f).toBeCalledWith("http://url", defaultOptions);
  });

  test("url with a protocol is unchanged", async () => {
    let f = vi.spyOn(global, "fetch");

    await Http.fetch("https://url");

    expect(f).toBeCalledWith("https://url", defaultOptions);
  });
});
