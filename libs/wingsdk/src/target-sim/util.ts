import { access, constants } from "fs";
import { basename } from "path";
import { promisify } from "util";
import { IConstruct } from "constructs";
import { Function } from "./function";
import { simulatorHandleToken } from "./tokens";
import { NodeJsCode } from "../core";
import { IInflightHost, Resource } from "../std";

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
