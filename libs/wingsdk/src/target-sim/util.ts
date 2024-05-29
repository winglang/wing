import { access, constants } from "fs";
import { promisify } from "util";
import { IConstruct } from "constructs";
import { isSimulatorInflightHost } from "./resource";
import { simulatorHandleToken } from "./tokens";
import { Duration, IInflightHost, Resource } from "../std";

/**
 * Check if a file exists for an specific path
 * @param filePath
 * @Returns Return `true` if the file exists, `false` otherwise.
 */
export async function exists(filePath: string): Promise<boolean> {
  try {
    await promisify(access)(
      filePath,
      constants.F_OK | constants.R_OK | constants.W_OK //eslint-disable-line no-bitwise
    );
    return true;
  } catch (er) {
    return false;
  }
}

export function makeEnvVarName(
  resource: IConstruct,
  typeName?: string
): string {
  typeName = typeName ?? resource.constructor.name;
  return `${typeName
    .toUpperCase()
    .replace(/[^A-Z]+/g, "_")}_HANDLE_${resource.node.addr.slice(-8)}`;
}

/**
 * A default implementation of _liftedFields that works for most simulated resources.
 */
export function simulatorLiftedFieldsFor(resource: IConstruct) {
  const env = makeEnvVarName(resource);
  return {
    $handle: `process.env["${env}"]`,
  };
}

export function bindSimulatorResource(
  resource: Resource,
  host: IInflightHost,
  ops: string[]
) {
  // Check if host implements ISimulatorInflightHost
  if (!isSimulatorInflightHost(host)) {
    throw new Error(
      "Host resource must implement sim.ISimulatorInflightHost to bind simulator resources"
    );
  }
  const env = makeEnvVarName(resource);
  const handle = simulatorHandleToken(resource);
  host.addEnvironment(env, handle);
  host.node.addDependency(resource);
  for (const op of ops) {
    host.addPermission(resource, op);
  }
}

export function makeSimulatorJsClient(resource: Resource) {
  const env = makeEnvVarName(resource);
  return `(function() {
  let handle = process.env.${env};
  if (!handle) {
    throw new Error("Missing environment variable: ${env}");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  const caller = process.env.WING_SIMULATOR_CALLER;
  if (!caller) {
    throw new Error("Missing environment variable: WING_SIMULATOR_CALLER");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle, caller);
})()`;
}

/**
 * Returns JavaScript code for a class that proxies method calls directly through the simulator.
 * This should be used by any simulator resources that are not implemented with sim.Resource.
 */
export function makeSimulatorJsClientType(type: string, methods: string[]) {
  const methodLines = [];
  for (const method of methods) {
    methodLines.push(
      `async ${method}(...args) { return this.backend.${method}(...args); }`
    );
  }
  return `(function() {
  class ${type}Client {
    constructor({ $handle }) {
      const simulatorUrl = process.env.WING_SIMULATOR_URL;
      if (!simulatorUrl) {
        throw new Error("Missing environment variable: WING_SIMULATOR_URL");
      }
      const caller = process.env.WING_SIMULATOR_CALLER;
      if (!caller) {
        throw new Error("Missing environment variable: WING_SIMULATOR_CALLER");
      }
      this.backend = require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, $handle, caller);
    }
    async $inflight_init() {}
    ${methodLines.join("\n")}
  }
  return ${type}Client;
})()`;
}

/**
 * Returns JavaScript code for a class that proxies method through a "call" method.
 * This should be used by any simulator resources that are implemented with sim.Resource.
 */
export function makeSimulatorJsClientTypeProxy(
  type: string,
  methods: string[]
) {
  const methodLines = [];
  for (const method of methods) {
    methodLines.push(
      `async ${method}(...args) { return this.backend.call("${method}", args); }`
    );
  }
  return `(function() {
  class ${type}Client {
    constructor({ $handle }) {
      const simulatorUrl = process.env.WING_SIMULATOR_URL;
      if (!simulatorUrl) {
        throw new Error("Missing environment variable: WING_SIMULATOR_URL");
      }
      const caller = process.env.WING_SIMULATOR_CALLER;
      if (!caller) {
        throw new Error("Missing environment variable: WING_SIMULATOR_CALLER");
      }
      this.backend = require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, $handle, caller);
    }
    async $inflight_init() {}
    ${methodLines.join("\n")}
  }
  return ${type}Client;
})()`;
}

// helper function to convert duration to a cron string
// maybe this belongs in a util library but for now it's here
export function convertDurationToCronExpression(dur: Duration): string {
  if (dur.minutes % 1 !== 0) {
    // our cron expression format is [minute] [hour] [day] [month] [year]
    throw new Error("Cron expressions with second precision are not supported");
  }

  const totalInMinutes = Math.floor(dur.minutes);

  const h = Math.floor(totalInMinutes / 60);
  const m = totalInMinutes % 60;
  // [minute] [hour] [day of month] [month] [day of week]
  const minute = m != 0 ? `*/${m}` : "*";
  const hour = h != 0 ? `*/${h}` : "*";
  // TODO: Support longer durations once we implement https://github.com/winglang/wing/issues/2243
  // for now we just use * for day, month, and year
  const dayInMonth = "*";
  const month = "*";
  const dayOfWeek = "*";

  // Generate cron string based on the duration
  const cronString = `${minute} ${hour} ${dayInMonth} ${month} ${dayOfWeek}`;
  return cronString;
}
