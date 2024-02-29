import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { ITopicClient } from "../cloud";

export class TopicClient implements ITopicClient {
  constructor(
    private readonly topicArn: string,
    private readonly client: SNSClient = new SNSClient({}),
  ) {}

  public async publish(message: string): Promise<void> {
    const command = new PublishCommand({
      Message: message,
      TopicArn: this.topicArn,
    });
    await this.client.send(command);
  }
}
