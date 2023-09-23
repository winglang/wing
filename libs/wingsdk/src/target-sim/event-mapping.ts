import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import {
  EVENT_MAPPING_TYPE,
  EventMappingSchema,
  EventSubscription,
  FunctionHandle,
} from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { fqnForType } from "../constants";
import {
  BaseResourceSchema,
  ISimulatorResourceInstance,
} from "../simulator/simulator";
import { IInflightHost, IResource, Node, Resource } from "../std";

/**
 * Interface shared by all event publishing simulator resources.
 */
export interface IEventPublisher extends ISimulatorResourceInstance {
  /**
   * Adds event subscription to publisher client.
   * @param subscriber the subscriber function
   * @param subscriptionProps additional subscription properties
   */
  addEventSubscription: (
    subscriber: FunctionHandle,
    subscriptionProps: EventSubscription
  ) => Promise<void>;
}

export const EVENT_MAP_FQN = fqnForType("sim.EventMapping");

export interface EventMappingProps {
  subscriber: IResource;
  publisher: IResource;
  subscriptionProps: EventSubscription;
}

/**
 * Implementation of `sim.EventMapping`.
 *
 * @inflight `@winglang/sdk.sim.EventMapping`
 */
export class EventMapping extends Resource implements ISimulatorResource {
  private readonly _eventProps: EventMappingProps;

  constructor(scope: Construct, id: string, props: EventMappingProps) {
    super(scope, id);
    this._eventProps = props;
    Node.of(this).hidden = true;

    // Add dependencies to the publisher and subscriber
    this.node.addDependency(props.subscriber);
    this.node.addDependency(props.publisher);
  }

  /** @internal */
  public _getInflightOps(): string[] {
    return [];
  }

  public get eventProps(): EventMappingProps {
    return this._eventProps;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: EventMappingSchema = {
      type: EVENT_MAPPING_TYPE,
      path: this.node.path,
      props: {
        subscriber: simulatorHandleToken(this.eventProps.subscriber),
        publisher: simulatorHandleToken(this.eventProps.publisher),
        subscriptionProps: this.eventProps.subscriptionProps,
      },
      attrs: {} as any,
    };
    return schema;
  }

  public bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.bind(host, ops);
  }

  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
