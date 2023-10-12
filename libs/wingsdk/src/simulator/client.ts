import type {
  SimulatorServerRequest,
  SimulatorServerResponse,
} from "./simulator";
import { Datetime } from "../std";

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
      // eslint-disable-next-line @typescript-eslint/no-require-imports
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
  return new Proxy(
    {},
    {
      get: function (_target, method, _receiver) {
        return async function (...args: any[]) {
          const body: SimulatorServerRequest = {
            handle,
            method: method as string,
            args,
          };
          const resp = await fetch(url + "/v1/call", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          let parsed: SimulatorServerResponse = deserializeValue(
            await resp.text()
          );

          if (parsed.error) {
            throw new Error(parsed.error);
          }
          return parsed.result;
        };
      },
    }
  );
}
