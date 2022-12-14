import { Construct } from "constructs";
import {
  WING_ATTRIBUTE_RESOURCE_CONNECTIONS,
  WING_ATTRIBUTE_RESOURCE_STATEFUL,
} from "./attributes";
import { Code, ICapturable, Policy } from "./inflight";
import { IInspectable, TreeInspector } from "./tree";

/**
 * Shared behavior between all Wing SDK resources.
 */
export abstract class Resource
  extends Construct
  implements ICapturable, IInspectable
{
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
   * @internal
   */
  public abstract _policies: ResourcePolicy;

  /**
   * @internal
   */
  public abstract _bind(host: Resource, policy: Policy): Code;

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
 * A policy containing all of the policies for each of the methods and
 * properties of a resource.
 *
 * @example
 * The following policy says that the resource has a method named "handle"
 * that may call "put" on a resource named "inner", or it may call "get" on a
 * resource passed as an argument named "other".
 * { "handle": { "inner": { methods: ["put"] }, "$arg:other": { methods: ["get"] } } }
 */
export interface ResourcePolicy {
  [operation: string]: OperationPolicy;
}

/**
 * A policy specifying what resources an operation may access.
 *
 * @example
 * The following policy says that the operation may call "put" on a resource
 * named "inner", or it may call "get" on a resource passed as an argument
 * named "other".
 * { "inner": { methods: ["put"] }, "$arg:other": { methods: ["get"] } }
 */
export interface OperationPolicy {
  [resource: string]: {
    methods: string[];
  };
}
