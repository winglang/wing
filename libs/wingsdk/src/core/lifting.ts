import { getTokenResolver } from "./tokens";
import { Duration } from "../std/duration";
import { IResource } from "../std/resource";
/**
 * Creates a liftable type from a class or enum
 * @param type The type to lift, Should be a class or enum.
 * @param moduleSpec A module specifier that the type can be imported from. e.g. "aws-cdk-lib"
 * @param path The dotted path to the type in the module. e.g. "aws_s3.Bucket" to access `require("aws-cdk-lib").aws_s3.Bucket`
 * @returns A liftable type, either the same type or a wrapper
 */
export function toLiftableModuleType(
  type: any,
  moduleSpec: string,
  path: string
) {
  if (
    typeof type?._toInflightType === "function" ||
    type?.constructor?.name === "Object"
  ) {
    return type;
  } else {
    return {
      _toInflightType: () => `require("${moduleSpec}").${path}`,
    };
  }
}

export function liftObject(obj: any): string {
  // since typeof(null) is "object", we cover all nullity cases (undefined and null) apriori.
  if (obj == null) {
    return JSON.stringify(obj);
  }

  const tokenResolver = getTokenResolver(obj);
  if (tokenResolver) {
    return tokenResolver.lift(obj);
  }

  // if the object is a type, and it has a "_toInflightType" method, we use it to serialize
  // fyi, typeof(obj) in this case is a "function".
  if (typeof obj?._toInflightType === "function") {
    return obj._toInflightType();
  }

  switch (typeof obj) {
    case "string":
    case "boolean":
    case "number":
      return JSON.stringify(obj);

    case "object":
      if (Array.isArray(obj)) {
        return `[${obj.map((o) => liftObject(o)).join(",")}]`;
      }

      if (obj instanceof Duration) {
        return liftObject({
          seconds: obj.seconds,
          minutes: obj.minutes,
          hours: obj.hours,
        });
      }

      if (obj instanceof Set) {
        return `new Set(${liftObject(Array.from(obj))})`;
      }

      if (obj instanceof Map) {
        return `new Map(${liftObject(Array.from(obj))})`;
      }

      // if the object is a resource (i.e. has a "_toInflight" method"), we use it to serialize
      // itself.
      if (typeof (obj as IResource)._toInflight === "function") {
        return (obj as IResource)._toInflight();
      }

      // structs are just plain objects
      if (obj.constructor.name === "Object") {
        const lines = [];
        lines.push("{");
        for (const [k, v] of Object.entries(obj)) {
          lines.push(`\"${k.replace(/"/g, '\\"')}\": ${liftObject(v)},`);
        }
        lines.push("}");
        return lines.join("");
      }

      break;
  }

  throw new Error(`Unable to lift object of type ${obj?.constructor?.name}`);
}
