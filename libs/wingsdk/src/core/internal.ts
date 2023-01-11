import { IConstruct } from "constructs";
import { Code, InflightBindings, NodeJsCode } from "./inflight";
import { DisplayProps, Resource } from "./resource";

export function makeHandler(
  scope: IConstruct,
  id: string,
  code: string,
  bindings: InflightBindings = {},
  display?: DisplayProps
): Resource {
  const clients: Record<string, Code> = {};

  for (const [k, v] of Object.entries(bindings.resources ?? {})) {
    clients[k] = v.resource._toInflight();
  }

  for (const [k, v] of Object.entries(bindings.data ?? {})) {
    clients[k] = serializeImmutableData(v);
  }

  // implements IFunctionHandler
  class Handler extends Resource {
    public readonly stateful = false;

    constructor() {
      super(scope, id);

      // pretend as if we have a field for each binding
      for (const [field, resource] of Object.entries(
        bindings.resources ?? {}
      )) {
        (this as any)[field] = resource.resource;
      }

      for (const [field, value] of Object.entries(bindings.data ?? {})) {
        (this as any)[field] = value;
      }

      this.display.title = display?.title;
      this.display.description = display?.description;
      this.display.hidden = display?.hidden;
    }

    public _toInflight(): NodeJsCode {
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

  // only annotate resource bindings because there's no binding to do for data
  const annotation = Object.fromEntries(
    Object.entries(bindings.resources ?? {}).map(([name, def]) => [
      "this." + name,
      { ops: def.ops },
    ])
  );
  Handler._annotateInflight("handle", annotation);

  return new Handler();
}

function serializeImmutableData(obj: any): Code {
  // if this is a Set, we need to convert it to an array and reconstruct on the other side
  if (typeof obj === "object" && (obj as any) instanceof Set) {
    return NodeJsCode.fromInline(`new Set(${JSON.stringify(Array.from(obj))})`);
  }

  // NOTE: this won't work if `obj` is not serializable, but this is not the ownership of the sdk
  // otherwise, just JSON.stringify() it and reconstruct on the other side
  return NodeJsCode.fromInline(JSON.stringify(obj));
}
