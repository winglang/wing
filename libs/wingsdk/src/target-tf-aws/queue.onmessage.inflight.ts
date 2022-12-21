import type {
  IFunctionHandlerClient,
  IQueueOnMessageHandlerClient,
} from "../cloud";

export class QueueOnMessageHandlerClient
  implements IQueueOnMessageHandlerClient
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
