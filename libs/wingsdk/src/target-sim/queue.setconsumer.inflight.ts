import type {
  IFunctionHandlerClient,
  IQueueSetConsumerHandlerClient,
} from "../cloud";
import type { Json } from "../std";

export class QueueSetConsumerHandlerClient implements IFunctionHandlerClient {
  private readonly handler: IQueueSetConsumerHandlerClient;
  constructor({ handler }: { handler: IQueueSetConsumerHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event?: Json) {
    if (!event) {
      throw new Error("Invalid topic message event");
    }

    const typedEvent = event as unknown as { messages: string[] };

    if (!typedEvent.messages) {
      throw new Error('No "messages" field in event.');
    }

    for (const message of typedEvent.messages) {
      await this.handler.handle(message);
    }

    return undefined;
  }
}
