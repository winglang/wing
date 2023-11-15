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
  const get = (_target: any, method: string, _receiver: any) => {
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
        let err = new Error();
        err.message = parsed.error?.message;
        err.stack = parsed.error?.stack;
        err.name = parsed.error?.name;
        throw err;
      }
      return parsed.result;
    };
  };

  return new Proxy({}, { get });
}
