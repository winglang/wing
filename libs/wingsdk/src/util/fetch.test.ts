import { test, describe, beforeEach, vi, Mock, expect } from "vitest";
import { Http, HttpMethods, Response } from "./fetch";

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

  test("fetch is working with all methods", async () => {
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
});
