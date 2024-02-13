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

export async function mergeSort<T>(
  array: Array<T>,
  fn: (a: T, b: T) => Promise<number>
): Promise<Array<T>> {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2),
    left = array.slice(0, mid),
    right = array.slice(mid);

  await mergeSort(left, fn);
  await mergeSort(right, fn);

  let ia = 0,
    il = 0,
    ir = 0;

  while (il < left.length && ir < right.length) {
    array[ia++] =
      (await fn(left[il], right[ir])) <= 0 ? left[il++] : right[ir++];
  }

  while (il < left.length) {
    array[ia++] = left[il++];
  }

  while (ir < right.length) {
    array[ia++] = right[ir++];
  }
  return array;
}
