import { IConstruct } from "constructs";
import { InflightBindings, NodeJsCode } from "./inflight";
import { Resource } from "./resource";

export function makeHandler(
  scope: IConstruct,
  id: string,
  code: string,
  bindings: InflightBindings = {}
): Resource {
  const clients: Record<string, string> = {};

  for (const [k, v] of Object.entries(bindings.resources ?? {})) {
    clients[k] = v.resource._toInflight().text;
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
  .map(([name, client]) => `${name}: ${client}`)
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

function serializeImmutableData(obj: any): string {
  switch (typeof obj) {
    case "string":
    case "boolean":
    case "number":
      return JSON.stringify(obj);

    case "object":
      if (Array.isArray(obj)) {
        return JSON.stringify(obj);
      }

      // if there's an explicit toJSON method, use it
      if ("toJSON" in obj) {
        return JSON.stringify(obj);
      }

      if (obj instanceof Set) {
        return `new Set(${JSON.stringify(Array.from(obj))})`;
      }

      if (obj instanceof Map) {
        return `new Map(${JSON.stringify(Array.from(obj))})`;
      }

      // structs are just objects
      if (obj instanceof Object) {
        return JSON.stringify(obj);
      }
  }

  throw new Error(
    `unable to serialize immutable data object of type ${obj.constructor?.name}`
  );
}
