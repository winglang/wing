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

export function lookup(obj: any, index: string | number): any {
  if (typeof index !== "string" && typeof index !== "number") {
    throw new TypeError(
      `Index must be a string or number (found "${typeof index}")`
    );
  }

  if (typeof index === "number") {
    if (
      !Array.isArray(obj) &&
      !Buffer.isBuffer(obj) &&
      typeof obj !== "string"
    ) {
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
  if (typeof index !== "string" && typeof index !== "number") {
    throw new TypeError(
      `Index must be a string or number, found ("${typeof index}")`
    );
  }

  if (typeof index === "number") {
    if (
      !Array.isArray(obj) &&
      !Buffer.isBuffer(obj) &&
      typeof obj !== "string"
    ) {
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
  }

  if (typeof index === "string" && typeof obj !== "object") {
    throw new TypeError(
      `Lookup failed, value is not an object (found \"${typeof obj}\")`
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
