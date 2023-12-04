import type {
  SimulatorServerRequest,
  SimulatorServerResponse,
} from "./simulator";
import { Datetime } from "../std/datetime";

// TODO: more robust serialization scheme

export function serializeValue(input: any): string {
  return JSON.stringify(input, (_key, value) => {
    if (value instanceof Datetime) {
      return {
        $kind: "datetime",
        day: value.dayOfMonth,
        hour: value.hours,
        min: value.min,
        month: value.month,
        sec: value.sec,
        year: value.year,
        ms: value.ms,
        tz: value.timezone,
      };
    }
    return value;
  });
}

export function deserializeValue(input: string): any {
  return JSON.parse(input, (_key, value) => {
    // assumption: Wing APIs don't distinguish between null and undefined, so we can swap them
    if (value === null) {
      return undefined;
    }
    if (value.$kind === "datetime") {
      return Datetime.fromComponents({
        day: value.day,
        hour: value.hour,
        min: value.min,
        month: value.month,
        sec: value.sec,
        year: value.year,
        ms: value.ms,
        tz: value.tz,
      });
    }
    return value;
  });
}

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

      let parsed: SimulatorServerResponse = deserializeValue(await resp.text());

      if (parsed.error) {
        // objects with "then" methods are special-cased by the JS runtime
        // because they are assumed to be promises, and can be awaited.
        // however, we don't know ahead of time what methods will be on the
        // object, so we have to assume that it has a "then" method until
        // we get an error back from the server saying that it doesn't.
        if (
          method === "then" &&
          parsed.error &&
          parsed.error.message &&
          parsed.error.message.startsWith("Method then not found on resource")
        ) {
          hasThenMethod = false;
          // args[0] is the onFulfilled callback passed to the then method.
          // we call it with the proxy object so that that `await client`
          // returns the proxy object back, as callers might expect.
          return args[0](proxy);
        }

        let err = new Error();
        err.message = parsed.error?.message;
        err.stack = parsed.error?.stack;
        err.name = parsed.error?.name;
        throw err;
      }

      return parsed.result;
    };
  };

  proxy = new Proxy({}, { get });
  return proxy;
}
