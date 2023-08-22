import { Construct, IConstruct } from "constructs";
import { Datetime } from "./datetime";
import { Duration } from "./duration";
import { App, Bindings, Connections } from "../core";

/**
 * A resource that can run inflight code.
 * @skipDocs
 */
export interface IInflightHost extends IConstruct {}

/**
 * A resource with inflight operations.
 */
export interface IInflightConstruct extends IConstruct {
  /**
   * Return a code snippet that can be used to reference this resource inflight.
   *
   * Note this code snippet may by async code, so it's unsafe to run it in a
   * constructor or other sync context.
   *
   * @internal
   */
  _toInflight(): string;
}

/**
 * This interface contains documentation for methods that the Wing compiler generates but may
 * not be needed by all constructs.
 */
// @ts-ignore allow unused declaration
interface IExtraInflightOperations {
  /**
   * Binds the resource to the host so that it can be used by inflight code.
   *
   * If a construct implements this method, it will not be called no more than
   * once with a given `host`.
   *
   * If a construct doesn't implement this method, it just means that none of its
   * inflight operations add any requirements on the host (like IAM permissions or
   * environment variables).
   *
   * This method shouldn't call `bind` on any other constructs besides its parent `super`.
   */
  bind(host: IInflightHost, ops: string[]): void;

  /**
   * Return a list of supported inflight operations supported by the resource.
   *
   * If a construct doesn't implement this method, it's assumed that the construct
   * doesn't support any inflight operations.
   */
  _getInflightOps(): string[];

  /**
   * Register any relationships between
   * the class and any transitively referenced classes. For example, if calling
   * the inflight method "foo" on a class requires calling the inflight methods
   * "bar" and "baz" on another class, then the compiler might generate:
   *
   * ```
   * _registerBind(host, ops) {
   *   if (ops.includes("foo")) {
   *     this._bar._registerBind(host, ["bar", "baz"]);
   *   }
   * }
   * ```
   *
   * The method's implementation shouldn't contain any actual binding logic
   * (like adding IAM permissions or environment variables to the host).
   *
   * If the method isn't implemented, it can be assumed that the class doesn't
   * reference any other classes.
   */
  _registerBind(host: IInflightHost, ops: string[]): void;

  /**
   * (static method) Register that the resource type needs to be bound to the host for the given
   * operations. A type being bound to a host means that that type's static members
   * will be bound to the host.
   */
  _registerTypeBind(host: IInflightHost, ops: string[]): void;
}

/**
 * Shared behavior between all Wing SDK resources.
 * @skipDocs
 */
export class Resource {
  /**
   * Register a binding between an object (either data or class or instance) and a host.
   * All of the registered bindings will be aggregated, so that when synthesis is
   * performed, all of the necessary `bind()` calls will be invoked.
   *
   * - Primitives, Duration, and Datetime objects are ignored.
   * - Arrays, sets and maps and structs (Objects) are recursively bound.
   * - Class instances are bound to the host by calling their bind() method.
   * - (TODO) Classes and their static methods are bound to their host by calling their bindType() method.
   *
   * @param obj The object to bind.
   * @param host The host to bind to
   * @param ops The set of operations that may access the object
   *
   * @internal
   */
  public static _registerBindObject(
    obj: any,
    host: IInflightHost,
    ops: string[] = []
  ): void {
    const tokens = App.of(host)._tokens;
    if (tokens.isToken(obj)) {
      return tokens.bindValue(host, obj);
    }

    switch (typeof obj) {
      case "string":
      case "boolean":
      case "number":
      case "undefined":
        return;

      case "object":
        if (Array.isArray(obj)) {
          obj.forEach((item) => Resource._registerBindObject(item, host));
          return;
        }

        if (obj instanceof Duration) {
          return;
        }

        if (obj instanceof Datetime) {
          return;
        }

        if (obj instanceof Set) {
          return Array.from(obj).forEach((item) =>
            Resource._registerBindObject(item, host)
          );
        }

        if (obj instanceof Map) {
          Array.from(obj.values()).forEach((item) =>
            Resource._registerBindObject(item, host)
          );
          return;
        }

        // if the object is a resource (i.e. has a "bind" method"), register a binding between it and the host.
        if (Construct.isConstruct(obj)) {
          // Explicitly register the resource's `$inflight_init` op, which is a special op that can be used to makes sure
          // the host can instantiate a client for this resource.
          let extendedOps = [...ops, "$inflight_init"];

          const bindings = Bindings.of(obj);

          // For each operation, check if the host supports it. If it does, register the binding.
          const supportedOps = [
            ...((obj as any)._getInflightOps?.() ?? []),
            "$inflight_init",
          ];

          for (const op of extendedOps) {
            if (!supportedOps.includes(op)) {
              throw new Error(
                `Resource ${obj.node.path} does not support inflight operation ${op} (requested by ${host.node.path})`
              );
            }

            if (bindings.has(host, op)) {
              // this resource is already bound to the host for this operation
              continue;
            }

            // add the operation to the set of operations for the host so that we can avoid
            // infinite recursion.
            bindings.add(host, op);

            if (typeof (obj as any)._registerBind === "function") {
              (obj as any)._registerBind?.(host, [op]);
            }

            // add connection metadata
            Connections.of(obj).add({
              source: host,
              target: obj,
              name: op.endsWith("()") ? op : `${op}()`,
            });
          }
          return;
        }

        // structs are just plain objects
        if (obj.constructor.name === "Object") {
          Object.values(obj).forEach((item) =>
            Resource._registerBindObject(item, host, ops)
          );
          return;
        }
        break;

      case "function":
        // If the object is actually a resource type, call the type's _registerTypeBind static method
        if (typeof (obj as any)._registerTypeBind === "function") {
          obj._registerTypeBind(host, ops);
          return;
        }
        break;
    }

    throw new Error(
      `unable to serialize immutable data object of type ${obj.constructor?.name}`
    );
  }
}
