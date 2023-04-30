import { IConstruct } from "constructs";
import { InflightBindings, NodeJsCode } from "./inflight";
import { Duration } from "../std";
import {
  DisplayProps,
  IInflightHost,
  IResource,
  Resource,
} from "../std/resource";

export function makeHandler(
  scope: IConstruct,
  id: string,
  code: string,
  bindings: InflightBindings = {},
  display?: DisplayProps
): Resource {
  const clients: Record<string, string> = {};

  for (const [k, v] of Object.entries(bindings)) {
    clients[k] = serializeImmutableData(v.obj);
  }

  // implements IFunctionHandler
  class Handler extends Resource {
    public readonly stateful = false;

    constructor() {
      super(scope, id);

      // pretend as if we have a field for each binding
      for (const [field, value] of Object.entries(bindings)) {
        (this as any)[field] = value.obj;
      }

      this.display.title = display?.title;
      this.display.description = display?.description;
      this.display.hidden = display?.hidden;

      this._addInflightOps("handle");
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

    public _registerBind(host: IInflightHost, ops: string[]): void {
      for (const v of Object.values(bindings)) {
        this._registerBindObject(v.obj, host, v.ops);
      }
      super._registerBind(host, ops);
    }
  }

  return new Handler();
}

export function serializeImmutableData(obj: any): string {
  switch (typeof obj) {
    case "undefined":
      return "undefined";

    case "string":
    case "boolean":
    case "number":
      return JSON.stringify(obj);

    case "object":
      if (Array.isArray(obj)) {
        return `[${obj.map(serializeImmutableData).join(",")}]`;
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

      // if the object is a resource (i.e. has a "_toInflight" method"), we use it to serialize
      // itself.
      if (typeof (obj as IResource)._toInflight === "function") {
        return (obj as IResource)._toInflight().text;
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
