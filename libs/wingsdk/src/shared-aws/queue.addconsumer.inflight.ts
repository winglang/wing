import type {
  IFunctionHandlerClient,
  IQueueAddConsumerHandlerClient,
} from "../cloud";

export class QueueAddConsumerHandlerClient
  implements IQueueAddConsumerHandlerClient
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
