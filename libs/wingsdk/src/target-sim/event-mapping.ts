import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { EVENT_MAPPING_TYPE, EventMappingSchema, EventSubscription } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { fqnForType } from "../constants";
import * as core from "../core";
import { Resource, App } from "../core";

export const EVENT_MAP_FQN = fqnForType("sim.EventMapping");

export interface EventProps {}

export interface IEventPublisher {
  addEventSubscription: (payload: any) => Promise<void>;
}

export abstract class EventMappingBase extends Resource {
  public static _newEvent(
    scope: Construct,
    id: string,
    props: EventProps = {}
  ): Event {
    return App.of(scope).newAbstract(EVENT_MAP_FQN, scope, id, props);
  }
  public readonly stateful = true;

  constructor(scope: Construct, id: string, props: EventProps = {}) {
    super(scope, id);
    props;
  }
}

export interface EventMappingProps {
  subscriber: core.IResource;
  publisher: core.IResource;
  eventSubscription: EventSubscription;
}

export class EventMapping
  extends EventMappingBase
  implements ISimulatorResource
{
  private readonly eventProps: EventMappingProps;

  constructor(scope: Construct, id: string, props: EventMappingProps) {
    super(scope, id);
    this.eventProps = props;

    // Add dependencies to the publisher and subscriber
    this.node.addDependency(props.subscriber);
    this.node.addDependency(props.publisher);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: EventMappingSchema = {
      type: EVENT_MAPPING_TYPE,
      path: this.node.path,
      props: {
        subscriber: simulatorHandleToken(this.eventProps.publisher),
        publisher: simulatorHandleToken(this.eventProps.publisher),
        eventSubscription: this.eventProps.eventSubscription,
      },
      attrs: {} as any,
    };
    return schema;
  }

  public _bind(host: core.IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
