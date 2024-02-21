import type {
  IHostedLiftable,
  ILiftable,
} from "@winglang/sdk/lib/std/resource";
import { INFLIGHT_SYMBOL } from "@winglang/sdk/lib/core/types";

/**
 * Extracts the non-function properties from a given type as an array of their discriminated keys.
 */
export type PickNonFunctions<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
  }[keyof T]
>;

/**
 * Represents a map of liftable objects with string keys.
 */
export type LiftableMap = { [key: string]: Liftable };

/**
 * Array of liftable objects.
 */
export type LiftableArray = Liftable[];

/**
 * Liftable primitives: number, string, or boolean.
 */
export type LiftablePrimitives = number | string | boolean;

/**
 * An object that can be lifted.
 */
export type Liftable =
  | undefined
  | LiftablePrimitives
  | LiftableArray
  | ILiftable
  | IHostedLiftable
  | LiftableMap;

/**
 * The lifted side of a liftable object.
 */
export type Lifted<T> = T extends { [INFLIGHT_SYMBOL]?: infer TClient }
  ? TClient
  : T extends Liftable
  ? T
  : never;

/**
 * Map of strings to lifted objects.
 */
export type LiftedMap<T extends Record<string, any>> = {
  [K in keyof T]: Lifted<T[K]>;
};
