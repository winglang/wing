import { IConstruct } from "constructs";
import { Code, InflightBinding, NodeJsCode } from "./inflight";
import { Resource } from "./resource";

export function makeHandler(
  scope: IConstruct,
  id: string,
  code: string,
  bindings: { [key: string]: InflightBinding } = {}
): Resource {
  // implements IFunctionHandler
  class Handler extends Resource {
    public readonly stateful = false;

    constructor() {
      super(scope, id);

      // pretend as if we have a field for each binding
      for (const [name, resource] of Object.entries(bindings)) {
        (this as any)[name] = resource.resource;
      }
    }

    public _toInflight(): NodeJsCode {
      const clients: Record<string, Code> = {};

      // get an inflight client for each resource we bind to
      for (const [k, v] of Object.entries(bindings)) {
        clients[k] = toInflight(v.resource);
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

function toInflight(obj: any): Code {
  // if the object has a "_toInflight" method, use it
  if (typeof obj === "object" && "_toInflight" in obj) {
    return obj._toInflight();
  }

  // if this is a Set, we need to convert it to an array and reconstruct on the other side
  if (typeof obj === "object" && (obj as any) instanceof Set) {
    return NodeJsCode.fromInline(`new Set(${JSON.stringify(Array.from(obj))})`);
  }

  // otherwise, just JSON.stringify() it and reconstruct on the other side
  //
  // NOTE: this won't work if `obj` is not serializable, but this is not the ownership of the sdk
  return NodeJsCode.fromInline(JSON.stringify(obj));
}
