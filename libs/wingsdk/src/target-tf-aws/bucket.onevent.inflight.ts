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
    try {
      const message = JSON.parse(event);
      if (message?.Event === "s3:TestEvent") {
        // aws sends a test event to the topic before of the actual one, we're ignoring it for now
        return;
      }
      return await this.handler.handle(
        message.Records[0].s3.object.key,
        this.eventType
      );
    } catch (error) {
      console.warn("Error parsing the notification event message: ", error);
      console.warn("Event: ", event);
    }
  }
}
