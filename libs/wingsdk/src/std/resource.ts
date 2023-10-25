import { Construct, IConstruct } from "constructs";
import { Duration } from "./duration";
import { App } from "../core";
import { NotImplementedError } from "../core/errors";
import { liftObject } from "../core/internal";
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
 * Abstract interface for `Resource`.
 * @skipDocs
 */
export interface IResource extends IConstruct {
  /**
   * A hook called by the Wing compiler once for each inflight host that needs to
   * use this resource inflight. The list of requested inflight methods
   * needed by the inflight host are given by `ops`.
   *
   * This method is commonly used for adding permissions, environment variables, or
   * other capabilities to the inflight host.
   */
  onLift(host: IInflightHost, ops: string[]): void;

  /**
   * Register that the resource needs to be lifted to the host for the given
   * operations. This means that the resource's `onLift` method will be called
   * during pre-synthesis.
   *
   * @internal
   */
  _registerOnLift(host: IInflightHost, ops: string[]): void;

  /**
   * Return a code snippet that can be used to reference this resource inflight.
   *
   * Note this code snippet may be async code, so it's unsafe to run it in a
   * constructor or other sync context.
   *
   * @internal
   */
  _toInflight(): string;

  /**
   * Return a list of all inflight operations that are supported by this resource.
   *
   * If this method doesn't exist, the resource is assumed to not support any inflight operations.
   *
   * @internal
   */
  _supportedOps(): string[];

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
   * Register that the resource type needs to be lifted to the host for the given
   * operations. A type being lifted to a host means that that type's static members
   * will be lifted to the host.
   *
   * @internal
   */
  public static _registerTypeOnLift(host: IInflightHost, ops: string[]): void {
    // Do nothing by default
    host;
    ops;
  }

  /**
   * Register a lifting between an object (either data or resource) and a host.
   *
   * - Primitives and Duration objects are ignored.
   * - Arrays, sets and maps and structs (Objects) are recursively bound.
   * - Resources are bound to the host by calling their onLift() method.
   *
   * @param obj The object to lift.
   * @param host The host to lift to
   * @param ops The set of operations that may access the object (use "?" to indicate that we don't
   * know the operation)
   *
   * @internal
   */
  protected static _registerOnLiftObject(
    obj: any,
    host: IInflightHost,
    ops: string[] = []
  ): void {
    const tokens = App.of(host)._tokens;
    if (tokens.isToken(obj)) {
      return tokens.onLiftValue(host, obj);
    }

    switch (typeof obj) {
      case "string":
      case "boolean":
      case "number":
      case "undefined":
        return;

      case "object":
        if (Array.isArray(obj)) {
          obj.forEach((item) => this._registerOnLiftObject(item, host));
          return;
        }

        if (obj instanceof Duration) {
          return;
        }

        if (obj instanceof Set) {
          return Array.from(obj).forEach((item) =>
            this._registerOnLiftObject(item, host)
          );
        }

        if (obj instanceof Map) {
          Array.from(obj.values()).forEach((item) =>
            this._registerOnLiftObject(item, host)
          );
          return;
        }

        // if the object is a resource (i.e. has a "lift" method"), register a lifting between it and the host.
        if (isResource(obj)) {
          // Explicitly register the resource's `$inflight_init` op, which is a special op that can be used to makes sure
          // the host can instantiate a client for this resource.
          obj._addOnLift(host, [...ops, "$inflight_init"]);
          return;
        }

        // structs are just plain objects
        if (obj.constructor.name === "Object") {
          Object.values(obj).forEach((item) =>
            this._registerOnLiftObject(item, host, ops)
          );
          return;
        }
        break;

      case "function":
        // If the object is actually a resource type, call the type's _registerTypeOnLift() static method
        if (isResourceType(obj)) {
          obj._registerTypeOnLift(host, ops);
          return;
        }
        break;
    }

    throw new Error(
      `unable to serialize immutable data object of type ${obj.constructor?.name}`
    );
  }

  private readonly onLiftMap: Map<IInflightHost, Set<string>> = new Map();

  /** @internal */
  public abstract _supportedOps(): string[];

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
    // Do nothing by default
    host;
    ops;
  }

  /**
   * Register that the resource needs to be bound to the host for the given
   * operations. This means that the resource's `onLift` method will be called
   * during pre-synthesis.
   *
   * @internal
   */
  public _registerOnLift(_host: IInflightHost, _ops: string[]) {
    return;
  }

  /**
   * Adds a binding between this resource and the host.
   * @param host The host to bind to
   * @param ops The operations that may access this resource
   * @returns `true` if a new bind was added or `false` if there was already a bind
   */
  private _addOnLift(host: IInflightHost, ops: string[]) {
    log(
      `Registering a binding for a resource (${this.node.path}) to a host (${
        host.node.path
      }) with ops: ${JSON.stringify(ops)}`
    );

    // Register the binding between this resource and the host
    if (!this.onLiftMap.has(host)) {
      this.onLiftMap.set(host, new Set());
    }

    const opsForHost = this.onLiftMap.get(host)!;

    // For each operation, check if the host supports it. If it does, register the binding.
    const supportedOps = [...(this._supportedOps() ?? []), "$inflight_init"];
    for (const op of ops) {
      if (!supportedOps.includes(op)) {
        throw new NotImplementedError(
          `Resource ${this.node.path} does not support inflight operation ${op} (requested by ${host.node.path}).\nIt might not be implemented yet.`
        );
      }

      if (!opsForHost.has(op)) {
        // first add the operation to the set of operations for the host so that we can avoid
        // infinite recursion.
        opsForHost.add(op);

        this._registerOnLift(host, [op]);

        // add connection metadata
        Node.of(this).addConnection({
          source: host,
          target: this,
          name: op.endsWith("()") ? op : `${op}()`,
        });
      }
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
    // Perform the live bindings between resources and hosts
    // By aggregating the binding operations, we can avoid performing
    // multiple bindings for the same resource-host pairs.
    for (const [host, ops] of this.onLiftMap.entries()) {
      this.onLift(host, Array.from(ops));
    }
  }

  /**
   * Return a code snippet that can be used to reference this resource inflight.
   *
   * @internal
   */
  public abstract _toInflight(): string;

  /**
   * "Lifts" a value into an inflight context. If the value is a resource (i.e. has a `_toInflight`
   * method), this method will be called and the result will be returned. Otherwise, the value is
   * returned as-is.
   *
   * @param value The value to lift.
   * @returns a string representation of the value in an inflight context.
   * @internal
   */
  protected _lift(value: any): string {
    return liftObject(this, value);
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

function isResource(obj: any): obj is Resource {
  return isIResourceType(obj.constructor);
}

function isIResourceType(t: any): t is new (...args: any[]) => IResource {
  return (
    t instanceof Function &&
    "prototype" in t &&
    typeof t.prototype.onLift === "function" &&
    typeof t.prototype._registerOnLift === "function"
  );
}

function isResourceType(t: any): t is typeof Resource {
  return typeof t._registerTypeOnLift === "function" && isIResourceType(t);
}
