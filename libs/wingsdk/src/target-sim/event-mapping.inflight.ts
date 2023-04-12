import { IEventProducer } from "./event-mapping";
import { ISimulatorResourceInstance } from "./resource";
import {
  EventMappingAttributes,
  EventMappingSchema,
  FunctionHandle,
} from "./schema-resources";
import { ISimulatorContext } from "../testing";

export class EventMapping implements ISimulatorResourceInstance {
  private readonly producer: FunctionHandle;
  private readonly payload: any;
  private readonly context: ISimulatorContext;

  constructor(
    props: EventMappingSchema["props"],
    context: ISimulatorContext
  ) {
    this.producer = props.producer;
    this.payload = props.payload;

    this.context = context;
  }

  public async init(): Promise<EventMappingAttributes> {
    const client = this.context.findInstance(
      this.producer
    ) as IEventProducer & ISimulatorResourceInstance;
    await client.addEventConsumer(this.payload);
    return {};
  }

  public async cleanup(): Promise<void> {}
}
