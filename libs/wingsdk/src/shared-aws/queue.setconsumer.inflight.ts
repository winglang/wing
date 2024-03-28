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
  public async handle(event: any): Promise<any> {
    const batchItemFailures = [];
    for (const record of event.Records ?? []) {
      try {
        await this.handler.handle(record.body);
      } catch (error) {
        batchItemFailures.push({
          itemIdentifier: record.messageId,
        });
      }
    }
    return { batchItemFailures };
  }
}
