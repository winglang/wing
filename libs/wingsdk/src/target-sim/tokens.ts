import { IResource } from "../std";

/**
 * Produce a token that will be replaced with the handle of a resource
 * when the simulator is started. This can be inserted to an environment variable
 * so that the real value can be used by an inflight function.
 */
export function simulatorHandleToken(resource: IResource): string {
  return simulatorAttrToken(resource, "handle");
}

/**
 * Produce a token that will be replaced with a deploy-time resource attribute
 * when the simulator is started.
 */
export function simulatorAttrToken(
  resource: IResource,
  attrName: string
): string {
  return `\${${resource.node.path}#attrs.${attrName}}`;
}
