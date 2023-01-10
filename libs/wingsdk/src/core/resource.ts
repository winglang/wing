import { Construct, IConstruct } from "constructs";
import { log } from "../util";
import {
  WING_ATTRIBUTE_RESOURCE_CONNECTIONS,
  WING_ATTRIBUTE_RESOURCE_STATEFUL,
} from "./attributes";
import { Code } from "./inflight";
import { IInspectable, TreeInspector } from "./tree";

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
   * Return a code snippet that can be used to reference this resource inflight.
   * @internal
   */
  _toInflight(): Code;
}

const BIND_METADATA_PREFIX = "$bindings__";

/**
 * Shared behavior between all Wing SDK resources.
 */
export abstract class Resource
  extends Construct
  implements IInspectable, IResource
{
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
    from._connections.push({
      resource: to,
      relationship: props.relationship,
      direction: Direction.OUTBOUND,
      implicit,
    });
    to._connections.push({
      resource: from,
      relationship: props.relationship,
      direction: Direction.INBOUND,
      implicit,
    });
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
  public abstract readonly stateful: boolean;

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
    log(
      `Binding a resource (${this.node.path}) to a host (${
        host.node.path
      }) with ops: ${JSON.stringify(ops)}`
    );

    const resources: Record<string, string[]> = {};
    for (let op of ops) {
      const sym = Symbol.for(BIND_METADATA_PREFIX + op);
      const bindMap: OperationAnnotation = (this as any)[sym];
      if (!bindMap) {
        throw new Error(
          `Resource ${this.node.path} does not support operation ${op}`
        );
      }
      for (let resource of Object.keys(bindMap)) {
        resources[resource] = resources[resource] ?? [];
        resources[resource].push(...bindMap[resource].ops);
      }
    }

    // this is how resources will look:
    // resources = {
    //   "this.bucket": [ "put", "get" ],
    //   "counter": [ "inc" ]
    // };

    for (const field of Object.keys(resources)) {
      if (field.startsWith("this.")) {
        const key = field.substring(5);
        const obj: Resource = (this as any)[key];
        if (!obj) {
          throw new Error(
            `Resource ${this.node.path} does not have field ${key}`
          );
        }
        if (!("_bind" in obj)) {
          throw new Error(
            `Resource ${this.node.path} field ${key} does not have a bind method`
          );
        }
        obj._bind(host, resources[field]);

        // add connection metadata
        for (const op of resources[field]) {
          Resource.addConnection({
            from: host,
            to: obj,
            relationship: op,
          });
        }
      } else {
        log(`Skipped binding ${field} since it should be bound already.`);
      }
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
}

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
   * @default false
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
  public hidden: boolean;

  public constructor(props?: DisplayProps) {
    this.title = props?.title;
    this.description = props?.description;
    this.hidden = props?.hidden ?? false;
  }
}
