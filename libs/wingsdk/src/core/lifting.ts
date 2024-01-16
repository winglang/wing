import { getTokenResolver } from "./tokens";
import { Datetime, Duration, JsonSchema } from "../std";
import { IInflightHost, ILiftable } from "../std/resource";

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

      if (obj instanceof Set) {
        return `new Set(${liftObject(Array.from(obj))})`;
      }

      if (obj instanceof Map) {
        return `new Map(${liftObject(Array.from(obj))})`;
      }

      // if the object is a resource (i.e. has a "_toInflight" method"), we use it to serialize
      // itself.
      if (typeof (obj as ILiftable)._toInflight === "function") {
        return (obj as ILiftable)._toInflight();
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

/**
 * Bind a preflight object (either data or resource) to an inflight host, as part of the lifting process.
 *
 * - Primitives and other pure data (e.g. duration, datetime) objects are ignored.
 * - Arrays, sets and maps and structs (Objects) are recursively bound.
 * - Resources are bound to the host by calling their onLift() method.
 * - Resource types are bound to the host by calling their onLiftType() method.
 *
 * @param obj The object to lift.
 * @param host The host to lift to
 * @param ops The set of operations that may access the object (use "?" to indicate that we don't
 * know the operation)
 *
 * @internal
 */
export function onLiftObject(
  obj: any,
  host: IInflightHost,
  ops: string[] = []
): void {
  const tokens = getTokenResolver(obj);
  if (tokens) {
    return tokens.onLiftValue(host, obj);
  }

  switch (typeof obj) {
    case "string":
    case "boolean":
    case "number":
    case "undefined":
      return;

    case "object":
      if (Array.isArray(obj)) {
        obj.forEach((item) => onLiftObject(item, host));
        return;
      }

      if (obj instanceof Duration || obj instanceof Datetime) {
        return;
      }

      if (obj instanceof JsonSchema) {
        return;
      }

      if (obj instanceof Set) {
        return Array.from(obj).forEach((item) => onLiftObject(item, host));
      }

      if (obj instanceof Map) {
        Array.from(obj.values()).forEach((item) => onLiftObject(item, host));
        return;
      }

      // structs are just plain objects
      if (obj.constructor.name === "Object") {
        Object.values(obj).forEach((item) => onLiftObject(item, host, ops));
        return;
      }

      // if the object is a resource, register a lifting between it and the host.
      if (typeof obj.onLift === "function") {
        // Explicitly register the resource's `$inflight_init` op, which is a special op that can be used to makes sure
        // the host can instantiate a client for this resource.
        obj.onLift(host, [...ops, "$inflight_init"]);
        return;
      }

      break;

    case "function":
      // If the object is actually a resource type, call the type's _registerTypeOnLift() static method
      if (isLiftableType(obj)) {
        obj.onLiftType(host, ops);
        return;
      }
      break;
  }

  throw new Error(
    `unable to serialize immutable data object of type ${obj.constructor?.name}`
  );
}

/**
 * Binds a collection of preflight objects to an inflight host, as part of the lifting process.
 *
 * Internally, this deduplicates lifting operations so that onLiftObject() is called
 * at most once per preflight object. For example:
 *
 * ```
 * onLiftMatrix(host, ["method1", "method2"], {
 *  "method1": [
 *    [foo, ["other1"]],
 *    [bar, ["other2"]]
 *  ],
 *  "method2": [
 *    [foo, ["other1"]],
 *    [bar, ["other3"]]
 *  ],
 *  "method3": [
 *    [foo, ["other4"]],
 *  ]
 * })
 * ```
 *
 * will result in
 *
 * ```
 * onLiftObject(foo, host, ["other1", "other2"]);
 * onLiftObject(bar, host, ["other1", "other3"]);
 * ```
 * @internal
 */
export function onLiftMatrix(
  host: IInflightHost,
  ops: string[],
  matrix: Record<string, Array<[any, Array<string>]>>
): void {
  const neededOps = new Map<any, Set<string>>();
  for (const [givenOp, pairs] of Object.entries(matrix)) {
    if (!ops.includes(givenOp)) {
      continue;
    }
    for (const [obj, thenOps] of pairs) {
      const objOps = neededOps.get(obj) ?? new Set();
      for (const thenOp of thenOps) {
        objOps.add(thenOp);
      }
      neededOps.set(obj, objOps);
    }
  }

  for (const [obj, objOps] of neededOps.entries()) {
    onLiftObject(obj, host, Array.from(objOps));
  }
}

function isLiftableType(t: any): t is ILiftableType {
  return t !== undefined && typeof t.onLiftType === "function";
}

/**
 * Represents a type with static methods that may have other things to lift.
 */
export interface ILiftableType {
  /**
   * A hook called by the Wing compiler once for each inflight host that needs to
   * use this type inflight. The list of requested inflight methods
   * needed by the inflight host are given by `ops`.
   *
   * This method is commonly used for adding permissions, environment variables, or
   * other capabilities to the inflight host.
   */
  onLiftType(host: IInflightHost, ops: string[]): void;
}
