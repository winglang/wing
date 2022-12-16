import { access, constants } from "fs";
import { promisify } from "util";
import { Direction, Resource } from "../core";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";

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

export function bindSimulatorResource(
  type: string,
  resource: Resource & ISimulatorResource,
  host: Resource
) {
  if (!(host instanceof Function)) {
    throw new Error(
      `Resources of ${type} can only be bound by a sim.Function for now`
    );
  }

  const env = `${type
    .toUpperCase()
    .replace(/\./g, "_")}_HANDLE_${resource.node.addr.slice(-8)}`;
  const handle = `\${${resource.node.path}#attrs.handle}`; // TODO: proper token mechanism
  host.addEnvironment(env, handle);
  host.node.addDependency(resource);
  resource.addConnection({
    direction: Direction.INBOUND,
    relationship: `inflight-reference`,
    resource: host,
  });
  host.addConnection({
    direction: Direction.OUTBOUND,
    relationship: `inflight-reference`,
    resource: resource,
  });
}
