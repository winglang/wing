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
  public async handle(event: any) {
    for (const record of event.Records ?? []) {
      await this.handler.handle(record.Sns.Message);
    }
  }
}
