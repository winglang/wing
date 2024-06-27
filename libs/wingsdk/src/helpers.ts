// Code in this file will be automatically included in all inflight code bundles,
// so avoid importing anything heavy here.
import { notDeepStrictEqual } from "node:assert";
import * as path from "node:path";
import type { Construct } from "constructs";
import type { Resource } from "./std";
import type { Node } from "./std/node";
// since we moved from node:18 to node:20 the deepStrictEqual doesn't work as expected.
// https://github.com/winglang/wing/issues/4444
// therefore we're using a local version of the comparison from node 18.
import { deepStrictEqual } from "./util/equality";

export function eq(a: any, b: any): boolean {
  try {
    return deepStrictEqual(a, b);
  } catch {
    return false;
  }
}

export function neq(a: any, b: any): boolean {
  try {
    notDeepStrictEqual(a, b);
    return true;
  } catch {
    return false;
  }
}

export function assert(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error("assertion failed: " + message);
  }
}

export function range(start: number, end: number, inclusive: boolean) {
  function* iterator() {
    let i = start;
    let limit = inclusive ? (end < start ? end - 1 : end + 1) : end;
    while (i < limit) yield i++;
    while (i > limit) yield i--;
  }
  return iterator();
}

export function nodeof(construct: Construct): Node {
  // Should only be used preflight, avoid bundling
  const Node = eval("require('./std/node').Node");
  return Node.of(construct);
}

export function normalPath(p: string): string {
  return p.replace(/\\+/g, "/");
}

export function unwrap<T>(value: T): T | never {
  if (value != null) {
    return value;
  }
  throw new Error("Unexpected nil");
}

export function lookup(obj: any, index: string | number): any {
  checkIndex(index);

  if (typeof index === "number") {
    index = checkArrayAccess(obj, index);
    return obj[index];
  }

  if (typeof obj !== "object") {
    throw new TypeError(
      `Lookup failed, value is not an object (found "${typeof obj}")`
    );
  }

  if (!(index in obj)) {
    throw new RangeError(`Key "${index}" not found`);
  }

  return obj[index];
}

export function assign(
  obj: any,
  index: string | number,
  kind: "=" | "+=" | "-=",
  value: any
) {
  checkIndex(index);

  if (typeof index === "number") {
    index = checkArrayAccess(obj, index);
  }

  if (typeof index === "string" && typeof obj !== "object") {
    throw new TypeError(
      `Assignment failed, value is not an object (found \"${typeof obj}\")`
    );
  }

  switch (kind) {
    case "=":
      obj[index] = value;
      break;
    case "+=":
      obj[index] += value;
      break;
    case "-=":
      obj[index] -= value;
      break;
    default:
      throw new Error(`Invalid assignment kind: ${kind}`);
  }
}

function checkIndex(index: string | number) {
  if (typeof index !== "string" && typeof index !== "number") {
    throw new TypeError(
      `Index must be a string or number (found "${typeof index}")`
    );
  }
}

function checkArrayAccess(obj: any, index: number): number {
  if (!Array.isArray(obj) && !Buffer.isBuffer(obj) && typeof obj !== "string") {
    throw new TypeError(
      "Index is a number but collection is not an array or string"
    );
  }
  if (index < 0 && index >= -obj.length) {
    index = obj.length + index;
  }
  if (index < 0 || index >= obj.length) {
    throw new RangeError(
      `Index ${index} out of bounds for array of length ${obj.length}`
    );
  }
  return index;
}

export function createExternRequire(dirname: string) {
  return (externPath: string) => {
    // using eval to always avoid bundling
    const jiti: typeof import("jiti").default = eval("require('jiti')");
    const esbuild: typeof import("esbuild") = eval("require('esbuild')");

    const newRequire = jiti(dirname, {
      sourceMaps: true,
      interopDefault: true,
      transform(opts) {
        return esbuild.transformSync(opts.source, {
          format: "cjs",
          target: "node20",
          sourcemap: "inline",
          loader: opts.ts ? "ts" : "js",
        });
      },
    });
    return newRequire(externPath);
  };
}

export function resolveDirname(
  outdir: string,
  relativeSourceDir: string
): string {
  return normalPath(path.resolve(outdir, relativeSourceDir));
}

/**
 * Helper function to `require` a compiled preflight wing file (js) into another compiled (js) wing file.
 * We need this instead of simply calling `require` because in addition to returning the imported module's exports,
 * we also need to update the current module's preflight types map with the brought module's preflight types map.
 * @param moduleFile - the file to `require`
 * @param outPreflightTypesObject - the current module's $preflightTypesMap
 * @returns all symbols exported by the `moduleFile` except `$preflightTypesMap`
 */
export function bringJs(
  moduleFile: string,
  outPreflightTypesObject: any
): Object {
  /* eslint-disable @typescript-eslint/no-require-imports */
  return Object.fromEntries(
    Object.entries<object>(require(moduleFile)).filter(([k, v]) => {
      // If this is the preflight types array then update the input object and skip it
      if (k === "$preflightTypesMap") {
        // Verify no key collision (should never happen)
        Object.entries(v).forEach(([key, value]) => {
          const otherValue = outPreflightTypesObject[key];
          if (key in outPreflightTypesObject && otherValue !== value) {
            throw new Error(`Key collision (${key} is both ${value.name} and ${otherValue.name}) in preflight types map`);
          }
        });
        Object.assign(outPreflightTypesObject, v);
        return false;
      }
      return true;
    })
  );
}

/**
 * Helper function to get a singleton instance of a class defined in preflight.
 * In practice this is used to get the preflight instance of **inflight** classes defined **preflight**.
 * This instance is used for accessing the lift map of such classes.
 * @param scope - a scope in the construct tree that'll hold the instance (a singleton within that tree).
 * @param typeId - the unique id of the preflight class type we want.
 * @returns the instance of the class.
 */
export function preflightClassSingleton(
  scope: Construct,
  typeId: number
): Resource {
  const root: any = nodeof(scope).root;
  const type: any = root.$preflightTypesMap[typeId];
  if (root.resourceSingletons === undefined) {
    root.resourceSingletons = {};
  }
  const instance = root.resourceSingletons[type];
  if (instance) {
    return instance;
  }
  root.resourceSingletons[type] = new type(
    scope,
    `${type.name}_singleton_${typeId}`
  );
  return root.resourceSingletons[type];
}
