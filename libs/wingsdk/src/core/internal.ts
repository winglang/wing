import { IConstruct } from "constructs";
import { Duration } from "../std";
import { InflightBindings, NodeJsCode } from "./inflight";
import { DisplayProps, Resource } from "./resource";

export function makeHandler(
  scope: IConstruct,
  id: string,
  code: string,
  bindings: InflightBindings = {},
  display?: DisplayProps
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
  .map(([name, client]) => `${name}: ${client}`)
  .join(",\n")}
})`
      );
    }
  }

  // only annotate resource bindings because there's no binding to do for data
  const annotation: Record<string, { ops: Array<string> }> = {};
  for (const [k, v] of Object.entries(bindings.resources ?? {})) {
    annotation["this." + k] = { ops: v.ops };
  }

  for (const k of Object.keys(bindings.data ?? {})) {
    annotation["this." + k] = { ops: [] };
  }

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
        return `[${obj.map((x) => serializeImmutableData(x)).join(",")}]`;
      }

      if (obj instanceof Duration) {
        return serializeImmutableData({
          seconds: obj.seconds,
          minutes: obj.minutes,
          hours: obj.hours,
        });
      }

      if (obj instanceof Set) {
        return `new Set(${serializeImmutableData(Array.from(obj))})`;
      }

      if (obj instanceof Map) {
        return `new Map(${serializeImmutableData(Array.from(obj))})`;
      }

      // if the object is a resource (i.e. has a "_toInflight" method"), then we lift and add to the
      // list of bindings.
      if (typeof obj._toInflight === "function") {
        return obj._toInflight().text;
      }

      // structs are just plain objects
      if (obj.constructor.name === "Object") {
        const lines = [];
        lines.push("{");
        for (const [k, v] of Object.entries(obj)) {
          lines.push(`${k}: ${serializeImmutableData(v)},`);
        }
        lines.push("}");
        return lines.join("");
      }
  }

  throw new Error(
    `unable to serialize immutable data object of type ${obj.constructor?.name}`
  );
}
