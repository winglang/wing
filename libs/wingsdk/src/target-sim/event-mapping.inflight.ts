import { IEventPublisher } from "./event-mapping";
import {
  EventMappingAttributes,
  EventMappingSchema,
  EventSubscription,
  FunctionHandle,
  PublisherHandle,
} from "./schema-resources";
import { ISimulatorContext } from "../simulator";
import { ISimulatorResourceInstance } from "../simulator/simulator";

export class EventMapping implements ISimulatorResourceInstance {
  private readonly publisher: PublisherHandle;
  private readonly subscriber: FunctionHandle;
  private readonly eventSubscription: EventSubscription;
  private readonly context: ISimulatorContext;

  constructor(props: EventMappingSchema["props"], context: ISimulatorContext) {
    this.publisher = props.publisher;
    this.subscriber = props.subscriber;
    this.eventSubscription = props.subscriptionProps;

    this.context = context;
  }

  public async init(): Promise<EventMappingAttributes> {
    const client = this.context.getClient(this.publisher) as IEventPublisher;
    await client.addEventSubscription(this.subscriber, this.eventSubscription);
    return {};
  }

  public async cleanup(): Promise<void> {
    const client = this.context.getClient(this.publisher) as IEventPublisher;
    await client.removeEventSubscription(this.subscriber);
  }

  public async save(): Promise<void> {}
}
