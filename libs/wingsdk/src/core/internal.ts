import { IConstruct } from "constructs";
import { Code, InflightBinding, NodeJsCode } from "./inflight";
import { Resource } from "./resource";

export function makeHandler(
  scope: IConstruct,
  id: string,
  code: string,
  bindings?: { [key: string]: InflightBinding }
): Resource {
  const resources = Object.fromEntries(
    Object.entries(bindings ?? {}).map(([name, binding]) => [
      name,
      binding.resource,
    ])
  );

  // implements IFunctionHandler
  class Handler extends Resource {
    public readonly stateful = false;

    public readonly $resourceNames = Object.keys(bindings ?? {});

    constructor() {
      super(scope, id);
      for (const [name, resource] of Object.entries(resources)) {
        (this as any)[name] = resource;
      }
    }

    public _toInflight(): NodeJsCode {
      const clients: Record<string, Code> = {};
      for (const resource of this.$resourceNames) {
        clients[resource] = (this as any)[resource]._toInflight();
      }
      return NodeJsCode.fromInline(
        `new ((function(){
return class Handler {
  constructor(clients) {
    for (const [name, client] of Object.entries(clients)) {
      this[name] = client;
    }
  }
  ${code}
};
})())({
${Object.entries(clients)
  .map(([name, client]) => `${name}: ${client.text}`)
  .join(",\n")}
})`
      );
    }
  }

  const annotation = Object.fromEntries(
    Object.entries(bindings ?? {}).map(([name, binding]) => [
      "this." + name,
      { ops: binding.ops },
    ])
  );
  Handler._annotateInflight("handle", annotation);

  return new Handler();
}
