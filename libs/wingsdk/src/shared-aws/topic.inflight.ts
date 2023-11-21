import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { captureAWSv3Client } from "aws-xray-sdk";
import { ITopicClient } from "../cloud";

export class TopicClient implements ITopicClient {
  constructor(
    private readonly topicArn: string,
    private readonly client: SNSClient = captureAWSv3Client(new SNSClient({}))
  ) {}

  public async publish(message: string): Promise<void> {
    const command = new PublishCommand({
      Message: message,
      TopicArn: this.topicArn,
    });
    await this.client.send(command);
  }
}
