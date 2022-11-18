import { IConstruct } from "constructs";
import { Resource } from "../cloud";
import { NodeJsCode } from "../core";
import { Function } from "./function";

export function captureSimulatorResource(
  type: string,
  resource: Resource,
  captureScope: IConstruct
) {
  if (!(captureScope instanceof Function)) {
    throw new Error(
      `Resources of ${type} can only be captured by a sim.Function for now`
    );
  }

  const env = `${type
    .toUpperCase()
    .replace(/\./g, "_")}_HANDLE_${resource.node.addr.slice(-8)}`;
  const handle = `\${${resource.node.path}#attrs.handle}`; // TODO: proper token mechanism
  captureScope.addEnvironment(env, handle);
  captureScope.node.addDependency(resource);
  resource._addInbound(captureScope.node.path);
  return NodeJsCode.fromInline(
    `$simulator.findInstance(process.env["${env}"])`
  );
}
