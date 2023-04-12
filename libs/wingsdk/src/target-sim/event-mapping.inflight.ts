import { IEventPublisher } from "./event-mapping";
import { ISimulatorResourceInstance } from "./resource";
import {
  EventMappingAttributes,
  EventMappingSchema,
  EventSubscription,
  FunctionHandle,
} from "./schema-resources";
import { ISimulatorContext } from "../testing";

export class EventMapping implements ISimulatorResourceInstance {
  private readonly publisher: FunctionHandle;
  private readonly eventSubscription: EventSubscription;
  private readonly context: ISimulatorContext;

  constructor(props: EventMappingSchema["props"], context: ISimulatorContext) {
    this.publisher = props.publisher;
    this.eventSubscription = props.eventSubscription;

    this.context = context;
  }

  public async init(): Promise<EventMappingAttributes> {
    const client = this.context.findInstance(
      this.publisher
    ) as IEventPublisher & ISimulatorResourceInstance;
    await client.addEventSubscription(this.eventSubscription);
    return {};
  }

  public async cleanup(): Promise<void> {}
}
