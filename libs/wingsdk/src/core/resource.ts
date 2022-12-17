import { Construct, IConstruct } from "constructs";
import { log } from "../util";
import {
  WING_ATTRIBUTE_RESOURCE_CONNECTIONS,
  WING_ATTRIBUTE_RESOURCE_STATEFUL,
} from "./attributes";
import { Code } from "./inflight";
import { IInspectable, TreeInspector } from "./tree";

/**
 * Abstract interface for `Resource`.
 */
export interface IResource extends IInspectable, IConstruct {
  /**
   * Binds the resource to the host so that it can be used by inflight code.
   * @internal
   */
  _bind(host: Resource, ops: string[]): void;

  /**
   * Return a code snippet that can be used to reference this resource inflight.
   * @internal
   */
  _inflightJsClient(): Code;
}

const BIND_METADATA_PREFIX = "$bind__";

/**
 * Shared behavior between all Wing SDK resources.
 */
export abstract class Resource extends Construct implements IInspectable {
  /**
   * @internal
   */
  public static _annotateInflight(
    cls: any,
    op: string,
    policy: OperationPolicy
  ) {
    Object.defineProperty(cls.prototype, BIND_METADATA_PREFIX + op, {
      value: policy,
      enumerable: false,
      writable: false,
    });
  }

  private readonly connections: Connection[] = [];

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
   * Set up any permissions required for this resource to be used by the host.
   * @internal
   */
  public _bind(host: Resource, ops: string[]): void {
    log(
      `Binding a resource (${this.node.path}) to a host (${
        host.node.path
      }) with ops: ${JSON.stringify(ops)}`
    );

    const resources: Record<string, string[]> = {};
    for (let op of ops) {
      const bindMap: OperationPolicy = (this as any)[BIND_METADATA_PREFIX + op];
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
      } else {
        log(`Skipped binding ${field} since it should be bound already.`);
      }
    }
  }

  /**
   * Return a code snippet that can be used to reference this resource inflight.
   * @internal
   */
  public abstract _inflightJsClient(): Code;

  /**
   * Adds a connection to this resource. A connection is a piece of metadata
   * describing how this resource is related to another resource.
   *
   * @experimental
   */
  public addConnection(...connections: Connection[]) {
    this.connections.push(...connections);
  }

  /**
   * @internal
   */
  public _inspect(inspector: TreeInspector): void {
    inspector.addAttribute(WING_ATTRIBUTE_RESOURCE_STATEFUL, this.stateful);
    inspector.addAttribute(
      WING_ATTRIBUTE_RESOURCE_CONNECTIONS,
      this.connections.map((conn) => ({
        direction: conn.direction,
        relationship: conn.relationship,
        resource: conn.resource.node.path,
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
 * A connection between two resources.
 */
export interface Connection {
  /**
   * The resource this connection is to.
   */
  readonly resource: Resource;

  /**
   * The type of relationship with the resource.
   */
  readonly relationship: string;

  /**
   * The direction of the connection.
   */
  readonly direction: Direction;
}

/**
 * A policy specifying what resources an operation may access.
 *
 * The following example policy says that the operation may call "put" on a
 * resource named "inner", or it may call "get" on a resource passed as an
 * argument named "other".
 * @example
 * { "inner": { ops: ["put"] }, "$arg:other": { ops: ["get"] } }
 */
export interface OperationPolicy {
  [resource: string]: {
    ops: string[];
  };
}
