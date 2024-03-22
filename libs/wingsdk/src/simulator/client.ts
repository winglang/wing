import * as http from "http";
import { deserialize } from "./serialization";
import type {
  SimulatorServerRequest,
  SimulatorServerResponse,
} from "./simulator";

interface HttpRequestOptions extends http.RequestOptions {
  body?: string;
}

function makeHttpRequest(options: HttpRequestOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    if (options.body !== undefined) {
      req.write(options.body);
    }

    req.end();
  });
}

/**
 * Creates a proxy object that forwards method calls to the simulator server.
 *
 * @param url The URL of the simulator server
 * @param handle The handle for the resource we're calling a method on or getting a property from
 * @param caller The construct path of the resource that is making the call
 * @returns A proxy object that forwards method calls to the simulator server
 */
export function makeSimulatorClient(
  url: string,
  handle: string,
  caller: string
) {
  let proxy: any;
  let hasThenMethod = true; // assume that the object has a "then" method until proven otherwise

  const get = (_target: any, method: string, _receiver: any) => {
    if (method === "then" && !hasThenMethod) {
      return undefined;
    }

    return async function (...args: any[]) {
      const body: SimulatorServerRequest = { caller, handle, method, args };
      const parsedUrl = new URL(url);
      const resp = await makeHttpRequest({
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: "/v1/call",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      let parsed: SimulatorServerResponse = deserialize(resp);

      if (parsed.error) {
        // objects with "then" methods are special-cased by the JS runtime
        // because they are assumed to be promises, and can be awaited. [0]
        // however, this client don't know ahead of time what methods are on the
        // object, so we have to assume that it has a "then" method until
        // we get an error back from the server saying that it doesn't.
        //
        // [0]: https://stackoverflow.com/questions/55262996/does-awaiting-a-non-promise-have-any-detectable-effect
        if (
          method === "then" &&
          parsed.error?.message?.startsWith("Method then not found on resource")
        ) {
          hasThenMethod = false;
          // args[0] is the onFulfilled callback passed to the then method.
          // we call it with the proxy object so that that `await client`
          // returns the proxy object back, as callers might expect.
          return args[0](proxy);
        }

        let err = new Error();
        err.message = parsed.error?.message;
        err.name = parsed.error?.name;

        if (parsed.error?.stack) {
          // combine the stack trace from the server with the stack trace from the client
          err.stack = `${parsed.error.stack}\n${err.stack}`;
        }

        throw err;
      }

      return parsed.result;
    };
  };

  proxy = new Proxy({}, { get });
  return proxy;
}
