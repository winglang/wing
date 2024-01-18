import type {
  IHostedLiftable,
  ILiftable,
} from "@winglang/sdk/lib/std/resource";
import { INFLIGHT_SYMBOL } from "@winglang/sdk/lib/core/types";

export type PickNonFunctions<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
  }[keyof T]
>;

export type LiftableMap = { [key: string]: Liftable };
export type LiftableArray = Liftable[];
export type LiftablePrimitives = number | string | boolean;
export type Liftable =
  | undefined
  | LiftablePrimitives
  | LiftableArray
  | ILiftable
  | IHostedLiftable
  | LiftableMap;

export type Lifted<T> = T extends { [INFLIGHT_SYMBOL]?: infer TClient }
  ? TClient
  : T extends Liftable
  ? T
  : never;
export type LiftedMap<T extends Record<string, any>> = {
  [K in keyof T]: Lifted<T[K]>;
};
