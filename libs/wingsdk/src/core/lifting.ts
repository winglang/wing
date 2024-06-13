import { Construct } from "constructs";
import { NotImplementedError } from "./errors";
import { getTokenResolver } from "./tokens";
import { IInflightHost, ILiftable, IHostedLiftable } from "../std";

/**
 * This is the name of a special operation that is used as a key
 * by the compiler in the `_liftMap` matrix to indicate that
 * some transitive object dependencies are always required no matter
 * what operations are passed to the `host`.
 *
 * As a user, this operation is hidden so it will not be
 * passed as an op to `onLift` or `onLiftType` methods.
 */
export const INFLIGHT_INIT_METHOD_NAME = "$inflight_init";

/**
 * Inflight closures are liftable objects that have a single inflight
 * method called "handle". This method contains the inflight code
 * that will be executed by the inflight host.
 */
const INFLIGHT_CLOSURE_HANDLE_METHOD = "handle";

/**
 * The prefix used to name inflight closure object types.
 */
const INFLIGHT_CLOSURE_TYPE_PREFIX = "$Closure";

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

export type LiftMap = Record<string, Array<[any, Array<string>]>>;
export type LiftMapNormalized = Record<string, Map<any, Set<string>>>;

/**
 * Merge two matrixes of lifting dependencies.
 *
 * See the unit tests in `lifting.test.ts` for examples.
 */
export function mergeLiftDeps(
  matrix1: LiftMapNormalized = {},
  matrix2: LiftMapNormalized = {}
): LiftMapNormalized {
  const result: LiftMapNormalized = {};
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
function parseMatrix(data: LiftMap): LiftMapNormalized {
  const result: LiftMapNormalized = {};
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

// for debugging
// function printMatrix(data: LiftMapNormalized): string {
//   const lines = [];
//   for (const [op, pairs] of Object.entries(data)) {
//     lines.push(`${op}: {`);
//     for (const [obj, objDeps] of pairs) {
//       if (Construct.isConstruct(obj)) {
//         lines.push(`  ${obj.node.path}: [${[...objDeps]}]`);
//       } else {
//         lines.push(`  ${obj?.constructor?.name ?? obj}: [${[...objDeps]}]`);
//       }
//     }
//     lines.push("}");
//   }
//   return lines.join("\n");
// }

/**
 * Collects all of the objects that need to be lifted for a given object and set of operations, by
 * traversing the object graph.
 *
 * Internally, it keeps track of a queue of objects and corresponding operations that need to be lifted
 * by the inflight host (the explored set), and a queue of objects and operations that need to be
 * explored (the queue). Objects (any JavaScript values) can be re-added to the queue multiple times
 * if new operations are determined as needed by the inflight host.
 *
 * For example, suppose an inflight host needs to call op1 on object A and op2 on object B.
 * In addition, object B needs op3 on object A.
 * The explored set and queue after each step of the main loop is shown below:
 *
 * ```
 * explored: {} | queue: [(A, [op1]), (B, [op2])]
 * explored: {A: [op1]} | queue: [(B, [op2])]
 * explored: {A: [op1], B: [op2]} | queue: [(A, [op3])]
 * explored: {A: [op1, op3], B: [op2]} | queue: []
 */
export function collectLifts(
  initialObj: any,
  initialOps: Array<string>
): Map<any, Set<string>> {
  if (initialOps.includes(INFLIGHT_INIT_METHOD_NAME)) {
    throw new Error(
      `The operation ${INFLIGHT_INIT_METHOD_NAME} is implicit and should not be requested explicitly.`
    );
  }

  const explored = new Map<any, Set<string>>();
  const queue = new Array<[any, Array<string>]>([initialObj, [...initialOps]]);
  const matrixCache = new Map<any, LiftMapNormalized>();

  while (queue.length > 0) {
    // `obj` and `ops` are the preflight object and operations requested on it
    let [obj, ops]: [any, Array<string>] = queue.shift()!;

    let newObj = false;
    if (!explored.has(obj)) {
      explored.set(obj, new Set());
      newObj = true;
    }

    let existingOps = explored.get(obj)!;

    // Filter out any ops that we've already processed for this object.
    ops = ops.filter((op) => !existingOps.has(op));

    // If there are no ops left and we have already seen the object, skip further processing.
    if (ops.length === 0 && !newObj) {
      continue;
    }

    // Add the new ops to the explored set.
    for (const op of ops) {
      existingOps.add(op);
    }

    // Inspect the object to see if there are any transitive dependency information.
    // Currently there are a few ways to do this:
    // - The compiler may generate a _liftMap property on the object
    // - The compiler may generate a static _liftTypeMap method on a class

    let matrix: LiftMapNormalized;
    if (matrixCache.has(obj)) {
      matrix = matrixCache.get(obj)!;
    } else if (typeof obj === "object" && obj._liftMap !== undefined) {
      matrix = parseMatrix(obj._liftMap ?? {});
      matrixCache.set(obj, matrix);
    } else if (
      typeof obj === "function" &&
      obj._liftTypeMap !== undefined
    ) {
      matrix = parseMatrix(obj._liftTypeMap ?? {});
      matrixCache.set(obj, matrix);
    } else {
      // If the object doesn't have any dependency information, we can skip it.
      // In the future, we might want to do more advanced analysis to
      // lift collections of objects with onLift methods etc.

      // Before we `continue` to the next iteration, check for some basic collection types
      // so if the user puts tokens in a collection, they'll get lifted.
      //
      // We can't calculate what ops to put for the collection items (for
      // example, for cases where the items are resources) since the compiler
      // doesn't produce that information yet.

      let items_to_explore: Iterable<any> = [];
      if (Array.isArray(obj)) {
        items_to_explore = obj;
      } else if (obj instanceof Set) {
        items_to_explore = obj;
      } else if (obj instanceof Map) {
        items_to_explore = obj.values();
      } else if (typeof obj === "object" && obj.constructor.name === "Object") {
        items_to_explore = Object.values(obj);
      }

      for (const item of items_to_explore) {
        if (!explored.has(item)) {
          let item_ops: string[] = [];
          // If the item is an inflight closure type then implicitly add the "handle" operation
          if (isInflightClosureObject(item)) {
            item_ops.push(INFLIGHT_CLOSURE_HANDLE_METHOD);
          }
          queue.push([item, item_ops]);
        }
      }
      continue;
    }

    for (const op of [...ops, INFLIGHT_INIT_METHOD_NAME]) {
      const objDeps = matrix[op];

      // If the op is $inflight_init, then the operation is implicit
      // so it's okay it's not defined in the matrix
      if (op === INFLIGHT_INIT_METHOD_NAME && !objDeps) {
        continue;
      }

      if (!objDeps) {
        if (Construct.isConstruct(obj)) {
          throw new NotImplementedError(
            `Resource ${obj.node.path} does not support inflight operation ${op}.\nIt might not be implemented yet.`,
            { resource: obj.constructor.name, operation: op }
          );
        } else {
          throw new Error(
            `Unknown operation ${op} requested for object ${obj} (${obj.constructor.name})`
          );
        }
      }

      for (const [depObj, depOps] of objDeps.entries()) {
        if (depOps.has(INFLIGHT_INIT_METHOD_NAME)) {
          throw new Error(
            `The operation ${INFLIGHT_INIT_METHOD_NAME} is implicit and should not be requested explicitly.`
          );
        }
        queue.push([depObj, [...depOps]]);
      }
    }
  }

  return explored;
}

/**
 * Returns whether the given item is an inflight closure object.
 */
function isInflightClosureObject(item: any): boolean {
  return (
    typeof item === "object" &&
    typeof item.constructor === "function" &&
    typeof item.constructor.name === "string" &&
    item.constructor.name.startsWith(INFLIGHT_CLOSURE_TYPE_PREFIX) &&
    item._liftMap !== undefined &&
    item._liftMap[INFLIGHT_CLOSURE_HANDLE_METHOD] !== undefined
  );
}

/**
 * Represents a type with static methods that may have other things to lift.
 */
export interface ILiftableType {
  /**
   * Compiler-generated data that describes the dependencies of this object on other
   * objects. This is used to determine which permissions need to be granted to the
   * inflight host.
   * @internal
   */
  _liftTypeMap?: LiftMap;

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
   * object's dependencies, and it will ensure that the onLift methods of
   * all objects are all called at most once.
   */
  public static lift(
    obj: IHostedLiftable,
    host: IInflightHost,
    ops: Array<string>
  ) {
    // obtain all of the objects that need lifting
    const lifts = collectLifts(obj, ops);

    // call all of the onLift methods
    for (const [liftedObj, liftedOps] of lifts) {
      const tokens = getTokenResolver(liftedObj);
      if (tokens) {
        tokens.onLiftValue(host, liftedObj);
        continue;
      }

      if (
        typeof liftedObj === "object" &&
        typeof liftedObj.onLift === "function"
      ) {
        liftedObj.onLift(host, [...liftedOps]);
        continue;
      }

      if (
        typeof liftedObj === "function" &&
        typeof liftedObj.onLiftType === "function"
      ) {
        liftedObj.onLiftType(host, [...liftedOps]);
        continue;
      }

      // no lift-related methods to call - it's probably a primitive
      // so no capabilities need to be added to the inflight host
    }
  }
}
