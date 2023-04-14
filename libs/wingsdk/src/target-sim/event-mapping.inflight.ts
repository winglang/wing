import { IEventPublisher } from "./event-mapping";
import {
  EventMappingAttributes,
  EventMappingSchema,
  EventSubscription,
  FunctionHandle,
  PublisherHandle,
} from "./schema-resources";
import { ISimulatorContext } from "../testing";
import { ISimulatorResourceInstance } from "../testing/simulator";

export class EventMapping implements ISimulatorResourceInstance {
  private readonly publisher: PublisherHandle;
  private readonly subscriber: FunctionHandle;
  private readonly eventSubscription: EventSubscription;
  private readonly context: ISimulatorContext;

  constructor(props: EventMappingSchema["props"], context: ISimulatorContext) {
    this.publisher = props.publisher;
    this.subscriber = props.subscriber;
    this.eventSubscription = props.eventSubscription;

    this.context = context;
  }

  public async init(): Promise<EventMappingAttributes> {
    const client = this.context.findInstance(this.publisher) as IEventPublisher;
    await client.addEventSubscription(this.subscriber, this.eventSubscription);
    return {};
  }

  public async cleanup(): Promise<void> {}
}
