import { test, describe, beforeEach, vi, Mock, expect } from "vitest";
import {
  Util as Http,
  HttpMethods,
  Response,
  RequestCache,
  RequestRedirect,
} from "../../src/http/http";

let defaultOptions = {
  method: HttpMethods.GET,
  headers: {},
  cache: RequestCache.DEFAULT,
  redirect: RequestRedirect.FOLLOW,
};

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
      expect(response.url).toBe("url");
      expect(response.status).toBe(200);
      expect(response.headers).toEqual({ "content-type": "application/json" });
    };

    expectResponse(await Http.get("url"));
    expectResponse(await Http.put("url"));
    expectResponse(await Http.post("url"));
    expectResponse(await Http.patch("url"));
    expectResponse(await Http.delete("url"));
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
      expect(response.url).toBe("url");
      expect(response.status).toBe(200);
      expect(response.headers).toEqual({ "content-type": "application/json" });
    };

    for (let method in HttpMethods) {
      expectResponse(
        //@ts-expect-error- ts thinks method is a string
        await Http.fetch("url", { method })
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
      expect(JSON.parse(response.body)).toEqual(jsonBody);
      expect(response.url).toBe("url");
      expect(response.status).toBe(200);
      expect(response.headers).toEqual({ "content-type": "application/json" });
    };

    for (let method in HttpMethods) {
      expectResponse(
        //@ts-expect-error- ts thinks method is a string
        await Http.fetch("url", { method })
      );
    }
    expectResponse(await Http.get("url"));
    expectResponse(await Http.put("url"));
    expectResponse(await Http.post("url"));
    expectResponse(await Http.patch("url"));
    expectResponse(await Http.delete("url"));
  });

  test("http.get with no options implements all default options", async () => {
    (global.fetch as Mock).mockImplementation((url) => ({
      url,
      headers: new Headers([["content-type", "application/json"]]),
      status: 200,
      text: () => Promise.resolve("ok!"),
    }));

    let f = vi.spyOn(global, "fetch");

    await Http.get("url");

    expect(f).toBeCalledWith("url", { ...defaultOptions });
  });

  test("http.fetch with no options implements all default options", async () => {
    (global.fetch as Mock).mockImplementation((url) => ({
      url,
      headers: new Headers([["content-type", "application/json"]]),
      status: 200,
      text: () => Promise.resolve("ok!"),
    }));

    let f = vi.spyOn(global, "fetch");

    await Http.fetch("url");

    expect(f).toBeCalledWith("url", defaultOptions);
  });

  test("http.put method cannot be overridden", async () => {
    (global.fetch as Mock).mockImplementation((url) => ({
      url,
      headers: new Headers([["content-type", "application/json"]]),
      status: 200,
      text: () => Promise.resolve("ok!"),
    }));

    let f = vi.spyOn(global, "fetch");

    await Http.put("url", { method: HttpMethods.GET });

    expect(f).toBeCalledWith("url", {
      ...defaultOptions,
      method: HttpMethods.PUT,
    });
  });
});
