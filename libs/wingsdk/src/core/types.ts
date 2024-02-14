/// This file is used to generate types within the compiler and make sure they're shared for external usage

import type { IInflight } from "../std/resource";

// re-exporting useful types
export { Construct } from "constructs";

/** Flag to signify the `inflight` side of a `preflight` object  */
export const INFLIGHT_SYMBOL: unique symbol = Symbol("@winglang/sdk.inflight");

/** `preflight` representation of an `inflight`  */
export type Inflight<F extends AsyncFunction> = IInflight & {
  /** Note: This is not actually callable,
   *  this is a phantom type to ensure the type information can cross the phase boundary
   */
  [INFLIGHT_SYMBOL]?: F;
};

/** Extract async methods of an object and return them as discriminant types of an array */
export type OperationsOf<T> = (keyof Pick<
  T,
  {
    [K in keyof T]: T[K] extends AsyncFunction ? K : never;
  }[keyof T]
>)[];

export type AnyFunction = (...args: any[]) => any;
export type AsyncFunction = (...args: any[]) => Promise<any>;

/** An object that contains only valid data for JSON.stringify() */
export type Json =
  | null
  | string
  | number
  | boolean
  | Json[]
  | { [key: string]: Json };
