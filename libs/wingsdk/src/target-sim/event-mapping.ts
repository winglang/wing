import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { Resource, App } from "../core";
import { ISimulatorResource } from "./resource";
import * as core from "../core";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { BaseResourceSchema } from "./schema";
import { EVENT_MAPPING_TYPE, EventMappingSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";

export const EVENT_MAP_FQN = fqnForType("sim.EventMapping");

export interface EventProps {}

export interface IEventProducer {
  addEventConsumer: (payload: any) => Promise<void>;
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
  consumer: core.IResource;
  producer: core.IResource;
  payload: any; // TODO: payload is a terrible name and should not be any
}

export class EventMapping extends EventMappingBase implements ISimulatorResource {
  private eventProps: EventMappingProps;

  constructor(scope: Construct, id: string, props: EventMappingProps) {
    super(scope, id);
    this.eventProps = props;

    this.node.addDependency(props.consumer);
    this.node.addDependency(props.producer);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: EventMappingSchema = {
      type: EVENT_MAPPING_TYPE,
      path: this.node.path,
      props: {
        consumer: simulatorHandleToken(this.eventProps.producer),
        producer: simulatorHandleToken(this.eventProps.producer),
        payload: this.eventProps.payload,
      },
      attrs: {} as any,
    }
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
