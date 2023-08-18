import { Construct, IConstruct } from "constructs";
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

// interface IInflightConstruct extends IConstruct {
//   bind: ((host: IInflightHost, ops: string[]) => void) | undefined;
//   _registerBind: ((host: IInflightHost, ops: string[]) => void) | undefined;
//   _getInflightOps: (() => string[]) | undefined;
//   _toInflight(): (() => string) | undefined;
// }

// /**
//  * Abstract interface for `Resource`.
//  * @skipDocs
//  */
// export interface IInflightConstruct extends IConstruct {
//   /**
//    * Binds the resource to the host so that it can be used by inflight code.
//    *
//    * If `ops` contains any operations not supported by the resource, it should throw an
//    * error.
//    */
//   bind(host: IInflightHost, ops: string[]): void;

//   /**
//    * Register that the resource needs to be bound to the host for the given
//    * operations. This means that the resource's `bind` method will be called
//    * during pre-synthesis.
//    *
//    * @internal
//    */
//   _registerBind(host: IInflightHost, ops: string[]): void;

//   /**
//    * Return a code snippet that can be used to reference this resource inflight.
//    *
//    * Note this code snippet may by async code, so it's unsafe to run it in a
//    * constructor or other sync context.
//    *
//    * @internal
//    */
//   _toInflight(): string;

//   /**
//    * Return a list of all inflight operations that are supported by this resource.
//    *
//    * If this method doesn't exist, the resource is assumed to not support any inflight operations.
//    *
//    * @internal
//    */
//   _getInflightOps(): string[];
// }

/**
 * Shared behavior between all Wing SDK resources.
 * @skipDocs
 */
export class Resource {
  // /**
  //  * Register that the resource type needs to be bound to the host for the given
  //  * operations. A type being bound to a host means that that type's static members
  //  * will be bound to the host.
  //  *
  //  * @internal
  //  */
  // public static _registerTypeBind(host: IInflightHost, ops: string[]): void {
  //   // Do nothing by default
  //   host;
  //   ops;
  // }

  /**
   * Register a binding between an object (either data or class or instance) and a host.
   *
   * - Primitives and Duration objects are ignored.
   * - Arrays, sets and maps and structs (Objects) are recursively bound.
   * - Class instances are bound to the host by calling their bind() method.
   * - (TODO) Classes are bound to their host by calling their bindType() method.
   *
   * @param obj The object to bind.
   * @param host The host to bind to
   * @param ops The set of operations that may access the object (use "?" to indicate that we don't
   * know the operation)
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
          let opsWithInit = [...ops, "$inflight_init"];

          // Register the binding between this resource and the host
          const bindings = Bindings.of(obj);

          // For each operation, check if the host supports it. If it does, register the binding.
          const supportedOps = [
            ...((obj as any)._getInflightOps?.() ?? []),
            "$inflight_init",
          ];

          for (const op of opsWithInit) {
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

  // /**
  //  * Binds the resource to the host so that it can be used by inflight code.
  //  *
  //  * You can override this method to perform additional logic like granting
  //  * IAM permissions to the host based on what methods are being called. But
  //  * you must call `super.bind(host, ops)` to ensure that the resource is
  //  * actually bound.
  //  */
  // public bind(host: IInflightHost, ops: string[]): void {
  //   // Do nothing by default
  //   host;
  //   ops;
  // }

  // /**
  //  * Register that the resource needs to be bound to the host for the given
  //  * operations. This means that the resource's `bind` method will be called
  //  * during pre-synthesis.
  //  *
  //  * @internal
  //  */
  // public _registerBind(_host: IInflightHost, _ops: string[]) {
  //   return;
  // }
}
