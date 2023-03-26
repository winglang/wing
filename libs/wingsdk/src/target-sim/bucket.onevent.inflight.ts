import { IBucketEventHandlerClient, IFunctionHandlerClient } from "../cloud";

export class BucketEventHandlerClient implements IBucketEventHandlerClient {
  private readonly handler: IFunctionHandlerClient;
  constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event: string) {
    return this.handler.handle(event);
  }
}
