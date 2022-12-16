import { Construct, IConstruct } from "constructs";
import { log } from "../util";
import {
  WING_ATTRIBUTE_RESOURCE_CONNECTIONS,
  WING_ATTRIBUTE_RESOURCE_STATEFUL,
} from "./attributes";
import { Code } from "./inflight";
import { ResourcePolicy } from "./policies";
import { IInspectable, TreeInspector } from "./tree";

/**
 * Abstract interface for `Resource`.
 */
export interface IResource extends IInspectable, IConstruct {
  /** @internal */
  readonly _policies: ResourcePolicy;

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

/**
 * Shared behavior between all Wing SDK resources.
 */
export abstract class Resource extends Construct implements IInspectable {
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
   * Set up any permissions required for this resource to be used by the host.
   * @internal
   */
  public _bind(host: Resource, ops: string[]): void {
    log(
      `Binding a resource (${this.node.path}) to a host (${
        host.node.path
      }) with ops: ${JSON.stringify(ops)}`
    );
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
