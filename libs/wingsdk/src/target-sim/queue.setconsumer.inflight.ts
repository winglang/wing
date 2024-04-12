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
    // let parsed = JSON.stringify(event ?? "{}");
    // if (!parsed.messages) throw new Error('No "messages" field in event.');
    // for (const $message of parsed.messages) {
    //   await this.handler.handle($message);
    // }
    this.handler;
    return event;
  }
}
