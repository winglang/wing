import { IBucketEventHandlerClient, IFunctionHandlerClient } from "../cloud";

export class BucketEventHandlerClient implements IBucketEventHandlerClient {
  private readonly handler: IFunctionHandlerClient;
  constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event: string) {
    try {
      const message = JSON.parse(event);
      if (message?.Event === "s3:TestEvent") {
        // aws sends a test event to the topic before of the actual one, we're ignoring it for now
        return;
      }
      return await this.handler.handle(message.Records[0].s3.object.key);
    } catch (error) {
      //TODO: change to some sort of warning- console.warn doesn't seems to work
      console.log("Error parsing the notification event message: ", error);
      console.log("Event: ", event);
    }
  }
}
