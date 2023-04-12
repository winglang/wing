import { Queue } from "./queue.inflight";
import { ISimulatorResourceInstance } from "./resource";
import {
  EventProducer,
  QueueEventMappingAttributes,
  QueueEventMappingSchema,
  QueueSubscriber,
} from "./schema-resources";
import { ISimulatorContext } from "../testing";

export class QueueEventMapping implements ISimulatorResourceInstance {
  private readonly consumer: QueueSubscriber;
  private readonly producer: EventProducer;
  private readonly context: ISimulatorContext;

  constructor(
    props: QueueEventMappingSchema["props"],
    context: ISimulatorContext
  ) {
    this.consumer = props.consumer;
    this.producer = props.producer;
    this.context = context;
  }

  public async init(): Promise<QueueEventMappingAttributes> {
    const queueClient = this.context.findInstance(
      this.producer.producerHandle
    ) as Queue & ISimulatorResourceInstance;
    await queueClient.addSubscriber(this.consumer);
    return {};
  }

  public async cleanup(): Promise<void> {}
}
