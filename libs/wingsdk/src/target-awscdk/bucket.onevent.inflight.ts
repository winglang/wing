import { IBucketEventHandlerClient, IFunctionHandlerClient } from "../cloud";

export class BucketEventHandlerClient implements IBucketEventHandlerClient {
  private readonly handler: IFunctionHandlerClient;
  constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event: any) {
    try {
      return await this.handler.handle(event.Records[0].s3.object.key);
    } catch (error) {
      //TODO: change to some sort of warning- console.warn doesn't seems to work
      console.log("Error parsing the notification event message: ", error);
      console.log("Event: ", event);
    }
  }
}
