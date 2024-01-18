/// This file is used to generate types within the compiler and make sure they're shared for external usage

import type { IInflight } from "../std/resource";

// re-exporting useful types
export { Construct } from "constructs";
export { Resource } from "../std/resource";

/** Flag to signify the `inflight` side of a `preflight` object  */
export const INFLIGHT_SYMBOL: unique symbol = Symbol("@winglang/sdk.inflight");

/** `preflight` representation of an `inflight`  */
export type Inflight<F extends (...args: any[]) => Promise<any>> = IInflight & {
  /** Note: This is not actually callable,
   * this is a phantom type to ensure the type information can cross the phase boundary
   *
   */
  [INFLIGHT_SYMBOL]?: F;
};

/** Extract methods of an object and return them as discriminant types of an array */
export type OperationsOf<T> = (keyof Pick<
  T,
  {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
  }[keyof T]
>)[];

/** An object that contains only valid data for JSON.stringify() */
export type Json =
  | null
  | string
  | number
  | boolean
  | Json[]
  | { [key: string]: Json };
