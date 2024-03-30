import type {
  IFunctionHandlerClient,
  IQueueSetConsumerHandlerClient,
} from "../cloud";

export class QueueSetConsumerHandlerClient implements IFunctionHandlerClient {
  private readonly handler: IQueueSetConsumerHandlerClient;
  constructor({ handler }: { handler: IQueueSetConsumerHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event?: string) {
    const batchItemFailures = [];
    let parsed = JSON.parse(event ?? "{}");
    if (!parsed.messages) throw new Error('No "messages" field in event.');
    for (const $message of parsed.messages) {
      try {
        await this.handler.handle($message);
      } catch (error) {
        batchItemFailures.push($message);
      }
    }
    return batchItemFailures.length > 0
      ? JSON.stringify(batchItemFailures)
      : undefined;
  }
}
