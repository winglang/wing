import type {
  IFunctionHandlerClient,
  ITopicOnMessageHandlerClient,
} from "../cloud";
import { Json } from "../std";

export class TopicOnMessageHandlerClient implements IFunctionHandlerClient {
  private readonly handler: ITopicOnMessageHandlerClient;
  constructor({ handler }: { handler: ITopicOnMessageHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event?: Json) {
    if (!event) {
      throw new Error("invalid topic message event");
    }
    if (typeof event !== "string") {
      throw new Error(
        "invalid topic message event - expected a string, but got " +
          typeof event
      );
    }
    await this.handler.handle(event);
    return undefined;
  }
}
