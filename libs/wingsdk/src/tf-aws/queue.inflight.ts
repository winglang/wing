import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { IQueueClient } from "./queue";

export class QueueClient implements IQueueClient {
  constructor(
    private readonly queueUrl: string,
    private readonly client: SQSClient = new SQSClient({})
  ) {}

  public async push(message: string): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: message,
    });
    await this.client.send(command);
  }
}
