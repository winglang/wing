import {
  SQSClient,
  SendMessageCommand,
  PurgeQueueCommand,
  GetQueueAttributesCommand,
} from "@aws-sdk/client-sqs";
import { IQueueClient } from "../cloud";

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

  public async purge(): Promise<void> {
    const command = new PurgeQueueCommand({
      QueueUrl: this.queueUrl,
    });
    await this.client.send(command);
  }

  public async approxSize(): Promise<number> {
    const command = new GetQueueAttributesCommand({
      QueueUrl: this.queueUrl,
      AttributeNames: ["ApproximateNumberOfMessages"],
    });
    const data = await this.client.send(command);
    return Number.parseInt(data.Attributes?.ApproximateNumberOfMessages ?? "0");
  }
}
