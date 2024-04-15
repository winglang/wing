import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import {
  EventMappingSchema,
  EventSubscription,
  ResourceHandle,
} from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { fqnForType } from "../constants";
import { LiftDepsMatrixRaw } from "../core";
import {
  ISimulatorResourceInstance,
  ToSimulatorOutput,
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
    subscriber: ResourceHandle,
    subscriptionProps: EventSubscription
  ) => Promise<void>;

  /**
   * Removes event subscription from the publisher client.
   * @param subscriber the subscriber function
   * @param subscriptionProps additional subscription properties
   */
  removeEventSubscription: (subscriber: ResourceHandle) => Promise<void>;
}

export const EVENT_MAPPING_FQN = fqnForType("sim.EventMapping");

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
  public get _liftMap(): LiftDepsMatrixRaw {
    return {};
  }

  public get eventProps(): EventMappingProps {
    return this._eventProps;
  }

  public toSimulator(): ToSimulatorOutput {
    const props: EventMappingSchema = {
      subscriber: simulatorHandleToken(this.eventProps.subscriber),
      publisher: simulatorHandleToken(this.eventProps.publisher),
      subscriptionProps: this.eventProps.subscriptionProps,
    };
    return {
      type: EVENT_MAPPING_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
