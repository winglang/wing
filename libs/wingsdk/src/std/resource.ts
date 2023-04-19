import { Construct, IConstruct } from "constructs";
import { Duration } from ".";
import {
  WING_ATTRIBUTE_RESOURCE_CONNECTIONS,
  WING_ATTRIBUTE_RESOURCE_STATEFUL,
} from "../core/attributes";
import { Code } from "../core/inflight";
import { serializeImmutableData } from "../core/internal";
import { IInspectable, TreeInspector } from "../core/tree";
import { log } from "../util";

/**
 * A resource that can run inflight code.
 */
export interface IInflightHost extends IResource {}

/**
 * Abstract interface for `Resource`.
 */
export interface IResource extends IInspectable, IConstruct {
  /**
   * List of inbound and outbound connections to other resources.
   * @internal
   */
  _connections: Connection[];

  /**
   * Information on how to display a resource in the UI.
   */
  readonly display: Display;

  /**
   * Binds the resource to the host so that it can be used by inflight code.
   *
   * If the resource does not support any of the operations, it should throw an
   * error.
   *
   * @internal
   */
  _bind(host: IInflightHost, ops: string[]): void;

  /**
   * Register that the resource needs to be bound to the host for the given
   * operations. This means that the resource's `_bind` method will be called
   * during pre-synthesis.
   *
   * @internal
   */
  _registerBind(host: IInflightHost, ops: string[]): void;

  /**
   * Return a code snippet that can be used to reference this resource inflight.
   * Note this code snippet may by async code, so it's unsafe to run it in a
   * constructor or other sync context.
   * @internal
   */
  _toInflight(): Code;

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

const BIND_METADATA_PREFIX = "$bindings__";

/**
 * Shared behavior between all Wing SDK resources.
 */
export abstract class Resource extends Construct implements IResource {
  /**
   * Adds a connection between two resources. A connection is a piece of
   * metadata describing how one resource is related to another resource. This
   * metadata is recorded in the tree.json file.
   *
   * @experimental
   */
  public static addConnection(props: AddConnectionProps) {
    const from = props.from;
    const to = props.to;
    const implicit = props.implicit ?? false;

    const fromConnection = {
      resource: to,
      relationship: props.relationship,
      direction: Direction.OUTBOUND,
      implicit,
    };
    if (
      !from._connections.some(
        (c) =>
          c.resource === fromConnection.resource &&
          c.relationship === fromConnection.relationship &&
          c.direction === fromConnection.direction &&
          c.implicit === fromConnection.implicit
      )
    ) {
      from._connections.push(fromConnection);
    }

    const toConnection = {
      resource: from,
      relationship: props.relationship,
      direction: Direction.INBOUND,
      implicit,
    };
    if (
      !to._connections.some(
        (c) =>
          c.resource === toConnection.resource &&
          c.relationship === toConnection.relationship &&
          c.direction === toConnection.direction &&
          c.implicit === toConnection.implicit
      )
    ) {
      to._connections.push(toConnection);
    }
  }

  /**
   * Annotate a class with with metadata about what operations it supports
   * inflight, and what sub-resources each operation requires access to.
   *
   * For example if `MyBucket` has a `fancy_get` method that calls `get` on an
   * underlying `cloud.Bucket`, then it would be annotated as follows:
   * ```
   * MyBucket._annotateInflight("fancy_get", {
   *  "this.bucket": { ops: ["get"] }
   * });
   * ```
   *
   * The Wing compiler will automatically generate the correct annotations by
   * scanning the source code, but in the Wing SDK we have to add them manually.
   *
   * @internal
   */
  public static _annotateInflight(op: string, annotation: OperationAnnotation) {
    const sym = Symbol.for(BIND_METADATA_PREFIX + op);
    Object.defineProperty(this.prototype, sym, {
      value: annotation,
      enumerable: false,
      writable: false,
    });
  }

  private readonly bindMap: Map<IInflightHost, Set<string>> = new Map();

  /** @internal */
  public readonly _connections: Connection[] = [];

  /**
   * Information on how to display a resource in the UI.
   */
  public readonly display = new Display();

  /**
   * Whether a resource is stateful, i.e. it stores information that is not
   * defined by your application.
   *
   * A non-stateful resource does not remember information about past
   * transactions or events, and can typically be replaced by a cloud provider
   * with a fresh copy without any consequences.
   */
  public readonly stateful: boolean = false;

  /**
   * Binds the resource to the host so that it can be used by inflight code.
   *
   * You can override this method to perform additional logic like granting
   * IAM permissions to the host based on what methods are being called. But
   * you must call `super._bind(host, ops)` to ensure that the resource is
   * actually bound.
   *
   * @internal
   */
  public _bind(host: IInflightHost, ops: string[]): void {
    // Do nothing by default
    host;
    ops;
  }

  /**
   * Register that the resource needs to be bound to the host for the given
   * operations. This means that the resource's `_bind` method will be called
   * during pre-synthesis.
   *
   * @internal
   */
  public _registerBind(host: IInflightHost, ops: string[]) {
    log(
      `Registering a binding for a resource (${this.node.path}) to a host (${
        host.node.path
      }) with ops: ${JSON.stringify(ops)}`
    );

    // Register the binding between this resource and the host
    if (!this.bindMap.has(host)) {
      this.bindMap.set(host, new Set());
    }
    for (const op of ops) {
      this.bindMap.get(host)!.add(op);
    }

    // Collect a list of all immediate child bindings
    const resources: Record<string, string[]> = {};
    for (const op of ops) {
      const sym = Symbol.for(BIND_METADATA_PREFIX + op);
      const bindAnnotation: OperationAnnotation = (this as any)[sym];
      if (!bindAnnotation) {
        throw new Error(
          `Unable to reference "${this.node.path}" from "${host.node.path}" because it does not support operation "${op}"`
        );
      }
      for (const resource of Object.keys(bindAnnotation)) {
        resources[resource] = resources[resource] ?? [];
        resources[resource].push(...bindAnnotation[resource].ops);
      }
    }

    // this is how resources will look:
    // resources = {
    //   "this.bucket": [ "put", "get" ],
    //   "this.foo.bar.baz": [ "bang" ],
    //   "counter": [ "inc" ]
    // };

    // Register the bindings for all child resources
    for (const field of Object.keys(resources)) {
      if (!field.startsWith("this.")) {
        log(`Skipped binding ${field} since it should be bound already.`);
        continue;
      }

      const key = field.substring(5);

      // traverse the object graph to find the target object we are referencing
      const resolveReference = (obj: any, parts: string[]): any => {
        const next = parts.shift();
        if (!next) {
          return obj;
        }
        return resolveReference(obj[next], parts);
      };

      // split the key into parts with "." as the separator
      const obj = resolveReference(this, key.split("."));
      if (obj === undefined) {
        throw new Error(
          `Resource ${this.node.path} does not have field ${key}`
        );
      }

      this.registerBindObject(obj, host, resources[field]);
    }
  }

  /**
   * Register a binding between an object (either data or resource) and a host.
   *
   * - Primitives and Duration objects are ignored.
   * - Arrays, sets and maps and structs (Objects) are recursively bound.
   * - Resources are bound to the host by calling their _bind() method.
   *
   * @param obj The object to bind.
   * @param host The host to bind to
   * @param ops The set of operations that may access the object (use "?" to indicate that we don't
   * know the operation)
   */
  private registerBindObject(
    obj: any,
    host: IResource,
    ops: string[] = []
  ): void {
    switch (typeof obj) {
      case "string":
      case "boolean":
      case "number":
        return;

      case "object":
        if (Array.isArray(obj)) {
          obj.forEach((item) => this.registerBindObject(item, host));
          return;
        }

        if (obj instanceof Duration) {
          return;
        }

        if (obj instanceof Set) {
          return Array.from(obj).forEach((item) =>
            this.registerBindObject(item, host)
          );
        }

        if (obj instanceof Map) {
          Array.from(obj.values()).forEach((item) =>
            this.registerBindObject(item, host)
          );
          return;
        }

        // if the object is a resource (i.e. has a "_bind" method"), register a binding between it and the host.
        if (isResource(obj)) {
          // Explicitly register the resource's `$inflight_init` op, which is a special op that can be used to makes sure
          // the host can instantiate a client for this resource.
          obj._registerBind(host, ["$inflight_init"]);

          obj._registerBind(host, ops);

          // add connection metadata
          for (const op of ops) {
            Resource.addConnection({
              from: host,
              to: obj,
              relationship: op,
            });
          }

          return;
        }

        // structs are just plain objects
        if (obj.constructor.name === "Object") {
          Object.values(obj).forEach((item) =>
            this.registerBindObject(item, host, ops)
          );
          return;
        }
    }

    throw new Error(
      `unable to serialize immutable data object of type ${obj.constructor?.name}`
    );
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
    // Perform the live bindings betweeen resources and hosts
    // By aggregating the binding operations, we can avoid performing
    // multiple bindings for the same resource-host pairs.
    for (const [host, ops] of this.bindMap.entries()) {
      this._bind(host, Array.from(ops));
    }
  }

  /**
   * Return a code snippet that can be used to reference this resource inflight.
   *
   * TODO: support passing an InflightRuntime enum to indicate which language
   * runtime we're targeting.
   *
   * @internal
   */
  public abstract _toInflight(): Code;

  /**
   * @internal
   */
  public _inspect(inspector: TreeInspector): void {
    inspector.addAttribute(WING_ATTRIBUTE_RESOURCE_STATEFUL, this.stateful);
    inspector.addAttribute(
      WING_ATTRIBUTE_RESOURCE_CONNECTIONS,
      this._connections.map((conn) => ({
        direction: conn.direction,
        relationship: conn.relationship,
        resource: conn.resource.node.path,
        implicit: conn.implicit,
      }))
    );
  }

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
    return serializeImmutableData(value);
  }
}

// The `init` op is a placeholder for any annotations needed for an instance of a resource's client to be instantiated
Resource._annotateInflight("$inflight_init", {});

/**
 * The direction of a connection.
 *
 * Visually speaking, if a resource A has an outbound connection with resource B,
 * the arrow would point from A to B, and vice versa for inbound connections.
 */
export enum Direction {
  /**
   * Indicates that this resource calls, triggers, or references
   * the resource it is connected to.
   */
  OUTBOUND = "outbound",

  /**
   * Indicates that this resource is called, triggered, or referenced by
   * the resource it is connected to.
   */
  INBOUND = "inbound",
}

/**
 * Props for `Resource.addConnection`.
 */
export interface AddConnectionProps {
  /**
   * The resource creating the connection to `to`.
   */
  readonly from: IResource;

  /**
   * The resource `from` is connecting to.
   */
  readonly to: IResource;

  /**
   * The type of relationship between the resources.
   */
  readonly relationship: string;

  /**
   * Whether the relationship is implicit, i.e. it is not explicitly
   * defined by the user.
   * @default false
   */
  readonly implicit?: boolean;
}

/**
 * A connection between two resources.
 */
export interface Connection {
  /**
   * The resource this connection is to.
   */
  readonly resource: IResource;

  /**
   * The type of relationship with the resource.
   */
  readonly relationship: string;

  /**
   * The direction of the connection.
   */
  readonly direction: Direction;

  /**
   * Whether the relationship is implicit, i.e. it is not explicitly
   * defined by the user.
   */
  readonly implicit: boolean;
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

/**
 * Properties for the Display class.
 */
export interface DisplayProps {
  /**
   * Title of the resource.
   * @default - No title.
   */
  readonly title?: string;

  /**
   * Description of the resource.
   * @default - No description.
   */
  readonly description?: string;

  /**
   * Whether the resource should be hidden from the UI.
   * @default - Undefined
   */
  readonly hidden?: boolean;
}

/**
 * Information on how to display a resource in the UI.
 */
export class Display {
  /**
   * Title of the resource.
   */
  public title?: string;

  /**
   * Description of the resource.
   */
  public description?: string;

  /**
   * Whether the resource should be hidden from the UI.
   */
  public hidden?: boolean;

  public constructor(props?: DisplayProps) {
    this.title = props?.title;
    this.description = props?.description;
    this.hidden = props?.hidden;
  }
}

function isResource(obj: any): obj is IResource {
  return (
    typeof (obj as IResource)._bind === "function" &&
    typeof (obj as IResource)._registerBind === "function"
  );
}
