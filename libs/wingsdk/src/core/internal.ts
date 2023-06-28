import { IConstruct } from "constructs";
import { App } from "./app";
import { Duration } from "../std/duration";
import { IResource } from "../std/resource";

export function serializeImmutableData(scope: IConstruct, obj: any): string {
  // since typeof(null) is "object", we cover all nullity cases (undefined and null) apriori.
  if (obj == null) {
    return JSON.stringify(obj);
  }

  const tokens = App.of(scope)._tokens;
  if (tokens.isToken(obj)) {
    return tokens.lift(obj);
  }

  switch (typeof obj) {
    case "string":
    case "boolean":
    case "number":
      return JSON.stringify(obj);

    case "object":
      if (Array.isArray(obj)) {
        return `[${obj
          .map((o) => serializeImmutableData(scope, o))
          .join(",")}]`;
      }

      if (obj instanceof Duration) {
        return serializeImmutableData(scope, {
          seconds: obj.seconds,
          minutes: obj.minutes,
          hours: obj.hours,
        });
      }

      if (obj instanceof Set) {
        return `new Set(${serializeImmutableData(scope, Array.from(obj))})`;
      }

      if (obj instanceof Map) {
        return `new Map(${serializeImmutableData(scope, Array.from(obj))})`;
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
          lines.push(`${k}: ${serializeImmutableData(scope, v)},`);
        }
        lines.push("}");
        return lines.join("");
      }
  }

  throw new Error(
    `unable to serialize immutable data object of type ${obj.constructor?.name}`
  );
}
