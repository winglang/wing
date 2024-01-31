import { Construct } from "constructs";
import { NotImplementedError } from "./errors";
import { getTokenResolver } from "./tokens";
import {
  Datetime,
  Duration,
  JsonSchema,
  IInflightHost,
  ILiftable,
  IHostedLiftable,
} from "../std";

export const INFLIGHT_INIT_METHOD_NAME = "$inflight_init";

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
      // if the object is a resource, register a lifting between it and the host.
      if (typeof obj.onLift === "function") {
        // Explicitly register the resource's `$inflight_init` op, which is a special op that can be used to makes sure
        // the host can instantiate a client for this resource.
        obj.onLift(host, [...ops, INFLIGHT_INIT_METHOD_NAME]);
        return;
      }

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

export type LiftDepsMatrixRaw = Record<string, Array<[any, Array<string>]>>;
export type LiftDepsMatrix = Record<string, Map<any, Set<string>>>;

/**
 * Merge two matrixes of lifting dependencies.
 *
 * See the unit tests in `lifting.test.ts` for examples.
 */
export function mergeLiftDeps(
  matrix1: LiftDepsMatrix,
  matrix2: LiftDepsMatrix
): LiftDepsMatrix {
  const result: LiftDepsMatrix = {};
  for (const [op, deps] of Object.entries(matrix1)) {
    result[op] = new Map();
    for (const [obj, objDeps] of deps) {
      result[op].set(obj, new Set(objDeps));
    }
  }

  for (const [op, deps] of Object.entries(matrix2)) {
    const resultDeps = result[op] ?? new Map();
    for (const [obj, objDeps] of deps) {
      const resultObjDeps = resultDeps.get(obj) ?? new Set();
      for (const dep of objDeps) {
        resultObjDeps.add(dep);
      }
      resultDeps.set(obj, resultObjDeps);
    }
    result[op] = resultDeps;
  }

  return result;
}

/**
 * Converts a matrix of lifting dependencies from the format emitted by the Wing compiler
 * (using plain objects and arrays) to a denser format (using Maps and Sets),
 * deduplicating object references if needed.
 *
 * The deduplication is needed because the compiler might generate something like:
 * ```
 * [
 *   [obj1, ["op1"]],
 *   [obj2, ["op2"]],
 * ]
 * ```
 * not knowing that during preflight execution, obj1 and obj2 are the same object.
 * The deduplication will turn this into:
 * ```
 * new Map([obj1, new Set(["op1", "op2"])])
 * ```
 */
function parseMatrix(data: LiftDepsMatrixRaw): LiftDepsMatrix {
  const result: LiftDepsMatrix = {};
  for (const [op, pairs] of Object.entries(data)) {
    result[op] = new Map();
    for (const [obj, objDeps] of pairs) {
      if (!result[op].has(obj)) {
        result[op].set(obj, new Set());
      }
      const depSet = result[op].get(obj)!;
      for (const dep of objDeps) {
        depSet.add(dep);
      }
    }
  }
  return result;
}

// for debugging...
// function printMatrix(data: LiftDepsMatrix): string {
//   const lines = [];
//   for (const [op, pairs] of Object.entries(data)) {
//     lines.push(`${op}: {`);
//     for (const [obj, objDeps] of pairs) {
//       if (Construct.isConstruct(obj)) {
//         lines.push(`  ${obj.node.path}: [${[...objDeps]}]`);
//       } else {
//         lines.push(`  ${obj}: [${[...objDeps]}]`);
//       }
//     }
//     lines.push("}");
//   }
//   return lines.join("\n");
// }

/**
 * Collects all of the objects that need to be lifted for a given object and set of operations, by
 * traversing the object graph.
 */
export function collectLifts(
  initialObj: any,
  initialOps: Set<string>
): Map<any, Set<string>> {
  const explored = new Map<any, Set<string>>();
  const unexplored = new Map<any, Set<string>>([[initialObj, initialOps]]);

  while (unexplored.size > 0) {
    // obj and ops are the object and operations requested on it
    const [obj, ops]: [any, Set<string>] = unexplored.entries().next().value;

    console.error("exploring", obj, ops);

    if (explored.has(obj)) {
      throw new Error(
        `unexpected trying to lift ${obj} twice - please report this as a bug`
      );
    }

    unexplored.delete(obj);
    explored.set(obj, ops);

    // check if there are any transitive dependencies that need to be lifted
    // if so, we will add them to the unexplored set
    if (typeof obj === "object") {
      let matrix: LiftDepsMatrix = parseMatrix(
        (obj as IHostedLiftable)._onLiftDeps ?? {}
      );

      // if the matrix is any, and there's a _supportedOps method, use that as a backup
      // this code path can be removed once _supportedOps is removed
      if (
        Object.keys(matrix).length === 0 &&
        typeof obj._supportedOps === "function"
      ) {
        for (const op of obj._supportedOps()) {
          matrix[op] = new Map([]);
        }
      }

      for (const op of ops) {
        const objDeps = matrix[op];

        if (!objDeps) {
          if (Construct.isConstruct(obj)) {
            throw new NotImplementedError(
              `Resource ${obj.node.path} does not support inflight operation ${op}.\nIt might not be implemented yet.`,
              { resource: obj.constructor.name, operation: op }
            );
          } else {
            throw new Error(
              `Unknown operation ${op} requested for object ${obj}`
            );
          }
        }

        for (const [depObj, depOps] of objDeps.entries()) {
          if (explored.has(depObj)) {
            throw new Error(`circular dependency detected for ${depObj}`);
          }
          const unexploredOps = unexplored.get(depObj) ?? new Set();
          for (const depOp of depOps) {
            unexploredOps.add(depOp);
          }
          unexplored.set(depObj, unexploredOps);
        }
      }
    }

    // TODO: handle _onLiftTypeDeps
  }

  // filter out all of the objects that don't have some kind of onLift method

  const output = new Map<any, Set<string>>();
  for (const [obj, ops] of explored.entries()) {
    // first, if the object has an onLift method, add it to the output
    if (typeof obj.onLift === "function") {
      output.set(obj, ops);
    }

    // second, if the object is a special token type, add it to the output
    const tokens = getTokenResolver(obj);
    if (tokens) {
      output.set(obj, ops);
    }
  }

  return output;
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

/**
 * Lifting utilities.
 */
export class Lifting {
  /**
   * Perform the full lifting process on an object.
   *
   * Use this instead of calling `onLift` since it will also lift all of the
   * object's dependencies.
   */
  public static lift(
    obj: IHostedLiftable,
    host: IInflightHost,
    ops: Array<string>
  ) {
    // obtain all of the objects that need lifting
    const lifts = collectLifts(obj, new Set(ops));

    // perform the actual lifting
    for (const [liftedObj, liftedOps] of lifts) {
      const tokens = getTokenResolver(liftedObj);
      if (tokens) {
        tokens.onLiftValue(host, liftedObj);
        continue;
      }

      liftedObj.onLift(host, [...liftedOps]);
    }
  }
}
