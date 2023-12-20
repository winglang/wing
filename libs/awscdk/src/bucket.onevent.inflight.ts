import { cloud } from "@winglang/sdk";

export class BucketEventHandlerClient implements cloud.IBucketEventHandlerClient {
  private readonly handler: cloud.IFunctionHandlerClient;
  constructor({ handler }: { handler: cloud.IFunctionHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event: any) {
    try {
      await this.handler.handle(event.Records[0].s3.object.key);
    } catch (error) {
      //TODO: change to some sort of warning- console.warn doesn't seems to work
      console.log("Error parsing the notification event message: ", error);
      console.log("Event: ", event);
    }
  }
}
