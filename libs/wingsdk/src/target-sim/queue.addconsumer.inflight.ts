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
  public async handle(event: string) {
    let parsed = JSON.parse(event);
    if (!parsed.messages) throw new Error('No "messages" field in event.');
    for (const $message of parsed.messages) {
      await this.handler.handle($message);
    }
  }
}
