import { IEventPublisher } from "./event-mapping";
import {
  EventMappingAttributes,
  EventMappingSchema,
  EventSubscription,
  ResourceHandle,
} from "./schema-resources";
import { ISimulatorContext } from "../simulator";
import { ISimulatorResourceInstance, UpdatePlan } from "../simulator/simulator";

export class EventMapping implements ISimulatorResourceInstance {
  private readonly publisher: ResourceHandle;
  private readonly subscriber: ResourceHandle;
  private readonly eventSubscription: EventSubscription;
  private _context: ISimulatorContext | undefined;

  constructor(props: EventMappingSchema) {
    this.publisher = props.publisher;
    this.subscriber = props.subscriber;
    this.eventSubscription = props.subscriptionProps;
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(
    context: ISimulatorContext
  ): Promise<EventMappingAttributes> {
    this._context = context;
    const client = this.context.getClient(
      this.publisher,
      true
    ) as IEventPublisher;
    await client.addEventSubscription(this.subscriber, this.eventSubscription);
    return {};
  }

  public async cleanup(): Promise<void> {
    const client = this.context.getClient(
      this.publisher,
      true
    ) as IEventPublisher;
    await client.removeEventSubscription(this.subscriber);
  }

  public async save(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }
}
