import { access, constants } from "fs";
import { promisify } from "util";
import { IConstruct } from "constructs";
import { Direction, NodeJsCode, Resource } from "../core";
import { Function } from "./function";

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
    .replace(/\./g, "_")}_HANDLE_${resource.node.addr.slice(-8)}`;
}

export function bindSimulatorResource(
  type: string,
  resource: Resource,
  host: Resource
) {
  if (!(host instanceof Function)) {
    throw new Error(
      `Resources of ${type} can only be bound by a sim.Function for now`
    );
  }

  const env = makeEnvVarName(type, resource);
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

export function makeSimulatorJsClient(type: string, resource: Resource) {
  const env = makeEnvVarName(type, resource);
  return NodeJsCode.fromInline(
    `$simulator.findInstance(process.env["${env}"])`
  );
}
