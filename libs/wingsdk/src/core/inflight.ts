import { basename } from "path";
import { liftObject, LiftMap, INFLIGHT_INIT_METHOD_NAME } from "./lifting";
import {
  AsyncFunction,
  INFLIGHT_SYMBOL,
  Inflight,
  OperationsOf,
} from "./types";
import { LiftableHash, LiftedMap, PickNonFunctions } from "./utility-types";
import { normalPath } from "../shared/misc";
import type { IHostedLiftable } from "../std/resource";

let closureCount = 0;

export function closureId(): number {
  return closureCount++;
}

export type InflightBindings = Record<string, InflightBinding>;

/**
 * An inflight binding.
 */
export interface InflightBinding {
  /**
   * The resource or capturable value.
   */
  readonly obj: any;

  /**
   * The list of operations used on the resource.
   */
  readonly ops?: string[];
}

/**
 * Utility class with functions about inflight clients.
 */
export class InflightClient {
  /**
   * Returns code for creating an inflight client.
   */
  public static for(
    dirname: string,
    filename: string,
    clientClass: string,
    args: string[]
  ): string {
    const inflightDir = dirname;
    const inflightFile = basename(filename).split(".")[0] + ".inflight";
    return `new (require("${normalPath(
      `${inflightDir}/${inflightFile}`
    )}")).${clientClass}(${args.join(", ")})`;
  }

  /**
   * Returns code for implementing `_toInflightType()`.
   */
  public static forType(filename: string, clientClass: string): string {
    return `require("${normalPath(filename)}").${clientClass}`;
  }

  private constructor() {}
}

/**
 * Prepares preflight objects for use in inflight functions.
 *
 * Conventionally, this is used by passing in a `const` object to bind it with the same name
 *
 * ```ts
 * const bucket = new cloud.Bucket(app, "Bucket");
 * const number = 5;
 *
 * lift({ bucket, number })
 *   .inflight(({ bucket, number }) => { ... }))
 * ```
 *
 * However, the name is not required to match the variable in the current scope.
 *
 * This is especially useful/necessary when lifting data via a reference or some other expression
 *
 * ```ts
 * const bucket = new cloud.Bucket(app, "Bucket");
 *
 * lift({ bkt: bucket, sum: 2 + 2, field: bucket.field })
 *   .inflight(({ bkt, sum, field }) => { ... }))
 * ```
 */
export function lift<TToLift extends LiftableHash>(
  captures: TToLift
): Lifter<LiftedMap<TToLift>, {}> {
  return new Lifter().lift(captures);
}

/**
 * Creates a inflight function.
 *
 * This function must not reference any variables outside of its scope.
 * If needed, use `lift` to bind variables to the scope of the function.
 *
 * Built-in NodeJS globals are available, such as `console` and `process`.
 */
export function inflight<TFunction extends AsyncFunction>(
  fn: (ctx: {}, ...args: Parameters<TFunction>) => ReturnType<TFunction>
) {
  return new Lifter().inflight(fn);
}

/**
 * Manages the liftable objects and operations for an inflight function.
 */
class Lifter<
  TLifted extends Record<string, any>,
  TOperations extends Record<string, string[]>
> {
  constructor(
    private lifts: LiftableHash = {},
    private grants: Record<string, string[]> = {}
  ) {}

  /**
   * Add additional liftable objects to the scope of the inflight function.
   * Any existing liftable objects with the same name will be overwritten.
   *
   * Conventionally, this is used by passing in a `const` object to bind it with the same name
   *
   * ```ts
   * const bucket = new cloud.Bucket(app, "Bucket");
   * const number = 5;
   *
   * lift({ bucket, number })
   *   .inflight(({ bucket, number }) => { ... }))
   * ```
   *
   * However, the name is not required to match the variable in the current scope.
   *
   * This is especially useful/necessary when lifting data via a reference or some other expression
   *
   * ```ts
   * const bucket = new cloud.Bucket(app, "Bucket");
   *
   * lift({ bkt: bucket, sum: 2 + 2, field: bucket.field })
   *   .inflight(({ bkt, sum, field }) => { ... }))
   * ```
   */
  public lift<TWillLift extends LiftableHash>(captures: TWillLift) {
    return new Lifter<
      Omit<TLifted, keyof TWillLift> & LiftedMap<TWillLift>,
      TOperations
    >(
      {
        ...this.lifts,
        ...captures,
      },
      this.grants
    );
  }

  /**
   * Grant permissions for lifted resources.
   *
   * By default, all all possible methods are granted to lifted resources.
   * This function restricts those:
   *
   * ```ts
   * const bucket = new cloud.Bucket(app, "Bucket");
   *
   * lift({ bucket })
   *   .grant({ bucket: ["get"] })
   *   .inflight(({ bucket }) => {
   *     await bucket.get("key");
   *     await bucket.set("key", "value"); // Error: set is not granted
   *   });
   * ```
   *
   * fields are always accessible, even if not granted.
   */
  public grant<
    TNewOps extends Partial<{
      [K in keyof TLifted]: OperationsOf<TLifted[K]>;
    }>
  >(grants: TNewOps) {
    return new Lifter<TLifted, Omit<TOperations, keyof TNewOps> & TNewOps>(
      this.lifts,
      {
        ...this.grants,
        ...grants,
      }
    );
  }

  /**
   * Create an inflight function with the available lifted data.
   *
   * This function must not reference any variables outside of its scope.
   * If needed, use `lift` again to bind variables to the scope of the function.
   * Bound variables will be available as properties on the `ctx` object passed as the first argument to the function.
   *
   * Built-in NodeJS globals are available, such as `console` and `process`.
   */
  public inflight<TFunction extends AsyncFunction>(
    fn: (
      /** All lifted data available in this inflight */
      ctx: // Get all the lifted types which were not explicitly granted
      Omit<TLifted, keyof TOperations> & {
        // For each of the granted types, get the lifted type with only the granted operations available (and any fields as well)
        [K in keyof TOperations &
          keyof TLifted]: TOperations[K] extends (infer TGrantedOps extends keyof TLifted[K])[]
          ? PickNonFunctions<TLifted[K]> & Pick<TLifted[K], TGrantedOps>
          : TLifted[K];
      },
      ...args: Parameters<TFunction>
    ) => ReturnType<TFunction>
  ): Inflight<TFunction> {
    // This is a simplified version of the Wing compiler's _liftMap generation
    // It specifies what transitive permissions need to be added based on what
    // inflight methods are called on an object
    // The SDK models inflight functions as objects with a "handle" property,
    // so here we annotate that "handle" needs all of the required permissions
    const _liftMap: LiftMap = { handle: [] };
    for (const [key, obj] of Object.entries(this.lifts)) {
      const knownOps =
        this.grants[key] ??
        Object.keys((obj as IHostedLiftable)._liftMap ?? {}).filter(
          (x) => x !== INFLIGHT_INIT_METHOD_NAME // filter "$inflight_init"
        );

      _liftMap.handle.push([obj, knownOps]);
    }

    return {
      _id: closureId(),
      _toInflight: () => {
        // Extremely advanced function serialization
        const serializedFunction = fn.toString();

        return `\
(await (async () => {
  const $func = ${serializedFunction}
  const $ctx = {
  ${Object.entries(this.lifts)
    .map(([name, liftable]) => `${name}: ${liftObject(liftable)}`)
    .join(",\n")}
  };
  let newFunction = async (...args) => {
    return $func($ctx, ...args);
  };
  newFunction.handle = newFunction;
  return newFunction;
}
)())`;
      },
      _liftMap,
      // @ts-expect-error This function's type doesn't actually match, but it will just throw anyways
      [INFLIGHT_SYMBOL]: () => {
        throw new Error(
          "This is a inflight function and can only be invoked while inflight"
        );
      },
    };
  }
}
