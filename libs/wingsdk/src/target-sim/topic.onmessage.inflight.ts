import type {
  IFunctionHandlerClient,
  ITopicOnMessageHandlerClient,
} from "../cloud";

export class TopicOnMessageHandlerClient
  implements ITopicOnMessageHandlerClient
{
  private readonly handler: IFunctionHandlerClient;
  constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event: string) {
    await this.handler.handle(JSON.parse(event));
  }
}
