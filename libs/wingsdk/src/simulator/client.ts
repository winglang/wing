import type {
  SimulatorServerRequest,
  SimulatorServerResponse,
} from "./simulator";

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

          let parsed: SimulatorServerResponse = await resp.json();
          // assumption: Wing APIs don't distinguish between null and undefined, so we can swap them
          parsed = JSON.parse(JSON.stringify(parsed), (_key, value) => {
            return value === null ? undefined : value;
          });

          if (parsed.error) {
            throw new Error(parsed.error);
          }
          return parsed.result;
        };
      },
    }
  );
}
