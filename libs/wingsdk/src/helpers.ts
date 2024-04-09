// Code in this file will be automatically included in all inflight code bundles,
// so avoid importing anything heavy here.
import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import type { Construct } from "constructs";
import { Node } from "./std/node";

export function eq(a: any, b: any): boolean {
  try {
    deepStrictEqual(a, b);
    return true;
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
  return Node.of(construct);
}

export function normalPath(path: string): string {
  return path.replace(/\\+/g, "/");
}

export function unwrap<T>(value: T): T | never {
  if (value != null) {
    return value;
  }
  throw new Error("Unexpected nil");
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
