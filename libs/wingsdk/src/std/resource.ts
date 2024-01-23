import { Construct, IConstruct } from "constructs";
import { App } from "../core";
import { NotImplementedError, AbstractMemberError } from "../core/errors";
import { log } from "../shared/log";
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
   * A hook called by the Wing compiler once for each inflight host that needs to
   * use this object inflight. The list of requested inflight methods
   * needed by the inflight host are given by `ops`.
   *
   * This method is commonly used for adding permissions, environment variables, or
   * other capabilities to the inflight host.
   */
  onLift(host: IInflightHost, ops: string[]): void;

  /**
   * Return a list of all inflight operations that are supported by this resource.
   *
   * If this method doesn't exist, the resource is assumed to not support any inflight operations.
   *
   * @internal
   */
  _supportedOps(): string[];
}

/**
 * Abstract interface for `Resource`.
 * @skipDocs
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
    log(
      `onLiftType called on a resource type (${
        this.constructor.name
      }) with a host (${host.node.path}) and ops: ${JSON.stringify(ops)}`
    );
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
   * @internal
   * */
  public _supportedOps(): string[] {
    return [];
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
    const supportedOps = [...(this._supportedOps() ?? []), "$inflight_init"];
    for (const op of ops) {
      // For each operation, check if the host supports it
      if (!supportedOps.includes(op)) {
        throw new NotImplementedError(
          `Resource ${this.node.path} does not support inflight operation ${op} (requested by ${host.node.path}).\nIt might not be implemented yet.`,
          { resource: this.constructor.name, operation: op }
        );
      }

      // Add connection metadata
      Node.of(this).addConnection({
        source: host,
        target: this,
        name: op.endsWith("()") ? op : `${op}()`,
      });
    }
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
    // do nothing by default
  }
}

/**
 * A resource that has an automatically generated id.
 * Used by the Wing compiler to generate unique ids for auto generated resources
 * from inflight function closures.
 */
export abstract class AutoIdResource extends Resource {
  constructor(scope: Construct, idPrefix: string = "") {
    const id = App.of(scope).makeId(scope, idPrefix ? `${idPrefix}_` : "");
    super(scope, id);
  }
}

/**
 * Annotations about what resources an inflight operation may access.
 *
 * The following example says that the operation may call "put" on a resource
 * at "this.inner", or it may call "get" on a resource passed as an argument named
 * "other".
 * @example
 * { "this.inner": { ops: ["put"] }, "other": { ops: ["get"] } }
 *
 * @internal
 */
export interface OperationAnnotation {
  [resource: string]: {
    ops: string[];
  };
}
