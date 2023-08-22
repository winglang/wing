import { BucketEventType, IBucketEventHandlerClient } from "../cloud";

export class BucketEventHandlerClient implements IBucketEventHandlerClient {
  private readonly handler: IBucketEventHandlerClient;
  private readonly eventType: BucketEventType;
  constructor({
    handler,
    args,
  }: {
    handler: IBucketEventHandlerClient;
    args: { eventType: BucketEventType };
  }) {
    this.handler = handler;
    this.eventType = args.eventType;
  }
  public async handle(event: string) {
    return this.handler.handle(event, this.eventType);
  }
}
