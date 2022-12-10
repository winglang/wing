import { Direction, NodeJsCode, Resource } from "../core";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";

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
  return NodeJsCode.fromInline(
    `$simulator.findInstance(process.env["${env}"])`
  );
}
