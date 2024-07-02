import { Construct, IConstruct } from "constructs";
import { App, LiftMap } from "../core";
import { AbstractMemberError } from "../core/errors";
import { Node } from "../std";

/**
 * A resource that can run inflight code.
 * @skipDocs
 */
export interface IInflightHost extends IResource {
  /**
   * Adds an environment variable to the host.
   */
  addEnvironment(name: string, value: string): void;
}

/**
 * Code that runs at runtime and implements your application's behavior.
 * For example, handling API requests, processing queue messages, etc.
 * Inflight code can be executed on various compute platforms in the cloud,
 * such as function services (such as AWS Lambda or Azure Functions),
 * containers (such as ECS or Kubernetes), VMs or even physical servers.
 *
 * This data represents the code together with the bindings to preflight data required to run.
 *
 * @link https://www.winglang.io/docs/concepts/inflights
 * @skipDocs
 */
export interface IInflight extends IHostedLiftable {
  /**
   * An opaque identifier for this inflight code. This can be used for determining
   * whether two inflight closures are same by identity, but should not be used
   * for any other purpose since it may not be stable across compilations.
   *
   * Comparing inflight closures for value equality (i.e. whether they will bundle
   * into the same JavaScript code) isn't possible since the exact code is only
   * resolved after all preflight code has finished running and preflight values that
   * are referenced by the inflight closure have settled on their values.
   *
   * Consider e.g.
   *
   * ```
   * let arr = MutArray<str>["hello"];
   *
   * new cloud.Function(inflight () => {
   *   for x in arr {
   *     log(x);
   *   }
   * });
   *
   * arr.push("world");
   * ```
   *
   * @internal
   */
  _id: number;
}

/**
 * Data that can be lifted into inflight.
 * @skipDocs
 */
export interface ILiftable {
  /**
   * Return a code snippet that can be used to reference this resource inflight.
   *
   * Note this code snippet may be async code, so it's unsafe to run it in a
   * constructor or other sync context.
   *
   * @internal
   */
  _toInflight(): string;
}

/**
 * A liftable object that needs to be registered on the host as part of
 * the lifting process.
 * This is generally used so the host can set up permissions
 * to access the lifted object inflight.
 */
export interface IHostedLiftable extends ILiftable {
  /**
   * Compiler-generated data that describes the dependencies of this object on other
   * objects. This is used to determine which permissions need to be granted to the
   * inflight host.
   * @internal
   */
  _liftMap?: LiftMap;

  /**
   * A hook called by the Wing compiler once for each inflight host that needs to
   * use this object inflight. The list of requested inflight methods
   * needed by the inflight host are given by `ops`.
   *
   * Any preflight class can implement this instance method to add permissions,
   * environment variables, or other capabilities to the inflight host when
   * one or more of its methods are called.
   */
  onLift(host: IInflightHost, ops: string[]): void;
}

function hasLiftMap(x: any): x is { _liftMap: LiftMap } {
  return x != null && typeof x._liftMap === "object";
}

/**
 * Abstract interface for `Resource`.
 * @skipDocs
 * @noinflight
 */
export interface IResource extends IConstruct, IHostedLiftable {
  /**
   * A hook for performing operations after the tree of resources has been
   * created, but before they are synthesized.
   *
   * Currently used for binding resources to hosts.
   *
   * @internal
   */
  _preSynthesize(): void;
}

/**
 * Shared behavior between all Wing SDK resources.
 * @skipDocs
 * @noinflight
 */
export abstract class Resource extends Construct implements IResource {
  /**
   * A hook called by the Wing compiler once for each inflight host that needs to
   * use this type inflight. The list of requested inflight methods
   * needed by the inflight host are given by `ops`.
   *
   * This method is commonly used for adding permissions, environment variables, or
   * other capabilities to the inflight host.
   */
  public static onLiftType(host: IInflightHost, ops: string[]): void {
    host;
    ops;
  }

  /**
   * Generates an asynchronous JavaScript statement which can be used to create an inflight client
   * for a resource.
   *
   * NOTE: This statement must be executed within an async context.
   */
  public static toInflight(obj: IResource) {
    return obj._toInflight();
  }

  /**
   * Create an instance of this resource with the current App factory.
   * This is commonly used in the constructor of a pseudo-abstract resource class before the super() call.
   *
   * @example
   * ```ts
   * export class MyResource extends Resource {
   *   constructor(scope: Construct, id: string, props: MyResourceProps) {
   *     if (new.target === MyResource) {
   *      return MyResource._newFromFactory(MYRESOURCE_FQN, scope, id, props);
   *     }
   *     super(scope, id);
   *     // ...
   *  ```
   *
   * @internal
   */
  protected static _newFromFactory<TResource extends Resource>(
    fqn: string,
    scope: Construct,
    id: string,
    ...props: any[]
  ): TResource {
    return App.of(scope).newAbstract(fqn, scope, id, ...props);
  }

  /**
   * Return a code snippet that can be used to reference this resource inflight.
   *
   * @internal
   * @abstract
   */
  public _toInflight(): string {
    throw new AbstractMemberError();
  }

  /**
   * A hook called by the Wing compiler once for each inflight host that needs to
   * use this resource inflight.
   *
   * You can override this method to perform additional logic like granting
   * IAM permissions to the host based on what methods are being called. But
   * you must call `super.bind(host, ops)` to ensure that the resource is
   * actually bound.
   */
  public onLift(host: IInflightHost, ops: string[]): void {
    host;
    ops;
  }

  /**
   * A hook for performing operations after the tree of resources has been
   * created, but before they are synthesized.
   *
   * Currently used for binding resources to hosts.
   *
   * @internal
   */
  public _preSynthesize(): void {
    if (hasLiftMap(this) && !(this instanceof AutoIdResource)) {
      addConnectionsFromLiftMap(this, this._liftMap);
    }
  }
}

function addConnectionsFromLiftMap(
  construct: IConstruct,
  liftData: LiftMap,
  baseOp?: string
) {
  for (const [op, liftEntries] of Object.entries(liftData)) {
    for (const [dep, depOps] of liftEntries) {
      if (Construct.isConstruct(dep) && !(dep instanceof AutoIdResource)) {
        // case 1: dep is an ordinary resource
        for (const depOp of depOps) {
          Node.of(construct).addConnection({
            source: construct,
            sourceOp: baseOp ?? op,
            target: dep,
            targetOp: depOp,
            name: "call",
          });
        }
      } else if (hasLiftMap(dep)) {
        // case 2: dep is an inflight
        addConnectionsFromLiftMap(construct, dep._liftMap, baseOp ?? op);
      }
    }
  }
}

/**
 * A resource that has an automatically generated id.
 * Used by the Wing compiler to generate unique ids for auto generated resources
 * from inflight function closures.
 * @noinflight
 * @skipDocs
 */
export abstract class AutoIdResource extends Resource {
  constructor(scope: Construct, idPrefix: string = "") {
    const id = App.of(scope).makeId(scope, idPrefix ? `${idPrefix}_` : "");
    super(scope, id);
  }
}

/**
 * Annotations about preflight data and desired inflight operations.
 */
export interface LiftAnnotation {
  /**
   * Preflight object to lift
   */
  readonly obj: any;

  /**
   * Name of the object in the inflight context.
   * Required if the object provided is not an identifier.
   * @default "obj" If the object is a simple identifier, it will be used as the alias
   */
  readonly alias?: string;

  /**
   * Operations to lift on the object.
   * @default * All possible operations will be available
   */
  readonly ops?: string[];
}

/**
 * Options for the `@inflight` intrinsic
 */
export interface ImportInflightOptions {
  /**
   * Name of exported function
   * @default "default"
   * */
  readonly export?: string;
  /**
   * Mapping of available symbols to a lift declaration
   * @default * All possible operations will be available
   */
  readonly lifts?: LiftAnnotation[];
}
