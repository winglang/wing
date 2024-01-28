import { deserialize } from "./serialization";
import type {
  SimulatorServerRequest,
  SimulatorServerResponse,
} from "./simulator";

export function makeSimulatorClient(url: string, handle: string) {
  let proxy: any;
  let hasThenMethod = true; // assume that the object has a "then" method until proven otherwise

  const get = (_target: any, method: string, _receiver: any) => {
    if (method === "then" && !hasThenMethod) {
      return undefined;
    }

    return async function (...args: any[]) {
      const body: SimulatorServerRequest = { handle, method, args };
      let resp;
      try {
        // import undici dynamically to reduce the time it takes to load Wing SDK
        // undici is used instead of the built-in fetch so that we can customize the
        // keep-alive and headers timeouts to be 15 minutes instead of the default 5 seconds
        const { fetch, Agent } = await import("undici");
        resp = await fetch(url + "/v1/call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          dispatcher: new Agent({
            keepAliveTimeout: 15 * 60 * 1000,
            keepAliveMaxTimeout: 15 * 60 * 1000,
            headersTimeout: 15 * 60 * 1000,
            bodyTimeout: 15 * 60 * 1000,
          }),
        });
      } catch (e) {
        throw e;
      }

      let parsed: SimulatorServerResponse = deserialize(await resp.text());

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
