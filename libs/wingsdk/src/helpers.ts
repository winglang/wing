// Code in this file will be automatically included in all inflight code bundles,
// so avoid importing anything heavy here.
import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import type { Construct } from "constructs";
import { Node } from "./std/node";
import util from "node:util";

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

async function merge<T>(
  left: Array<T>,
  right: Array<T>,
  compare: (a: T, b: T) => Promise<number>
): Promise<Array<T>> {
  const result = [];
  let il = 0;
  let ir = 0;

  while (il < left.length && ir < right.length) {
    if ((await compare(left[il], right[ir])) <= 0) {
      result.push(left[il++]);
    } else {
      result.push(right[ir++]);
    }
  }

  return result.concat(left.slice(il)).concat(right.slice(ir));
}

async function mergeSortAsync<T>(
  array: Array<T>,
  comparator: (a: T, b: T) => Promise<number>
): Promise<Array<T>> {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = await mergeSortAsync(array.slice(0, mid), comparator);
  const right = await mergeSortAsync(array.slice(mid), comparator);

  return merge(left, right, comparator);
}

export function mergeSort<T>(
  array: Array<T>,
  fn: (a: T, b: T) => number | Promise<number>
): Array<T> | Promise<Array<T>> {
  if (util.types.isAsyncFunction(fn)) {
    return mergeSortAsync(array, fn as (a: T, b: T) => Promise<number>);
  } else {
    return array.sort(fn as (a: T, b: T) => number);
  }
}
