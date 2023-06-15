import type {
  IFunctionHandlerClient,
  IQueueSetConsumerHandlerClient,
} from "../cloud";

export class QueueSetConsumerHandlerClient
  implements IQueueSetConsumerHandlerClient
{
  private readonly handler: IFunctionHandlerClient;
  constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event: any) {
    for (const record of event.Records ?? []) {
      await this.handler.handle(record.body);
    }
  }
}
