import { ISimulatorResource } from "./resource";
import { Construct } from "constructs";
import * as core from "../core";
import { BaseResourceSchema } from "./schema";
import { EventMapping } from "./event-mapping";
import { QUEUE_EVENT_MAP_TYPE, QueueEventMappingSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { simulatorHandleToken } from "./tokens";

export interface QueueEventMappingConsumer {
  resource: core.IResource;
  batchSize: number;
}

export interface QueueEventMappingProps {
  consumer: QueueEventMappingConsumer;
  producer: core.IResource; 
}

export class QueueEventMapping extends EventMapping implements ISimulatorResource {
  private consumer: QueueEventMappingConsumer;
  private producer: core.IResource;

  constructor(scope: Construct, id: string, props: QueueEventMappingProps) {
    super(scope, id);
    this.consumer = props.consumer;
    this.producer = props.producer;

    this.node.addDependency(this.consumer.resource);
    this.node.addDependency(this.producer);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: QueueEventMappingSchema = {
      type: QUEUE_EVENT_MAP_TYPE,
      path: this.node.path,
      props: {
        consumer: {
          batchSize: this.consumer.batchSize,
          functionHandle: simulatorHandleToken(this.consumer.resource)
        },
        producer: {
          producerHandle: simulatorHandleToken(this.producer),
        }
      },
      attrs: {} as any
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