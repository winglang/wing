import { access, constants } from "fs";
import { promisify } from "util";
import { IConstruct } from "constructs";
import { Function } from "./function";
import { IInflightHost, IResource, NodeJsCode, Resource } from "../core";

/**
 * Produce a token that will be replaced with the handle of a resource
 * when the simulator is run. This can be inserted to an environment variable
 * so that the real value can be used by the function.
 */
export function simulatorHandleToken(resource: IResource): string {
  return `\${${resource.node.path}#attrs.handle}`;
}

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
    .replace(/\.|\-/g, "_")}_HANDLE_${resource.node.addr.slice(-8)}`;
}

export function bindSimulatorResource(
  type: string,
  resource: Resource,
  host: IInflightHost
) {
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

export function makeSimulatorJsClient(type: string, resource: Resource) {
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
