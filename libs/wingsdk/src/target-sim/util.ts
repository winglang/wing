import { access, constants } from "fs";
import { basename } from "path";
import { promisify } from "util";
import { IConstruct } from "constructs";
import { Function } from "./function";
import { simulatorHandleToken } from "./tokens";
import { NodeJsCode } from "../core";
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

function makeEnvVarName(type: string, resource: IConstruct): string {
  return `${type
    .toUpperCase()
    .replace(/[^A-Z]+/g, "_")}_HANDLE_${resource.node.addr.slice(-8)}`;
}

export function bindSimulatorResource(
  filename: string,
  resource: Resource,
  host: IInflightHost
) {
  const type = basename(filename).split(".")[0];
  if (!(host instanceof Function)) {
    throw new Error(
      `Resources of ${type} can only be bound by a sim.Function for now`
    );
  }

  const env = makeEnvVarName(type, resource);
  const handle = simulatorHandleToken(resource);
  host.addEnvironment(env, handle);
  host.node.addDependency(resource);
}

export function makeSimulatorJsClient(filename: string, resource: Resource) {
  const type = basename(filename).split(".")[0];
  const env = makeEnvVarName(type, resource);
  return NodeJsCode.fromInline(
    `(function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("${env}")`
  );
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
  // if day of month is "*", day of week should be "?"
  // https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html
  const dayOfWeek = "?";

  // Generate cron string based on the duration
  const cronString = `${minute} ${hour} ${dayInMonth} ${month} ${dayOfWeek}`;
  return cronString;
}
