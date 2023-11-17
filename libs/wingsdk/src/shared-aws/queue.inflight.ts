import {
  SQSClient,
  SendMessageCommand,
  PurgeQueueCommand,
  GetQueueAttributesCommand,
  ReceiveMessageCommand,
  InvalidMessageContents,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { IQueueClient } from "../cloud";

export class QueueClient implements IQueueClient {
  constructor(
    private readonly queueUrl: string,
    private readonly client: SQSClient = new SQSClient({})
  ) {}

  public async push(...messages: string[]): Promise<void> {
    if (messages.includes("")) {
      throw new Error("Empty messages are not allowed");
    }
    const messagePromises = messages.map(async (message) => {
      try {
        const command = new SendMessageCommand({
          QueueUrl: this.queueUrl,
          MessageBody: message,
        });
        await this.client.send(command);
      } catch (e) {
        if (e instanceof InvalidMessageContents) {
          throw new Error(
            `The message contains characters outside the allowed set (message=${message}): ${
              (e as Error).stack
            })}`
          );
        }
        throw new Error((e as Error).stack);
      }
    });

    await Promise.all(messagePromises);
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

  public async pop(): Promise<string | undefined> {
    const receiveCommand = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 1,
    });
    const data = await this.client.send(receiveCommand);
    if (!data.Messages || data.Messages.length === 0) {
      return undefined;
    }

    const message = data.Messages[0];

    if (message.ReceiptHandle) {
      const deleteCommand = new DeleteMessageCommand({
        QueueUrl: this.queueUrl,
        ReceiptHandle: message.ReceiptHandle,
      });
      await this.client.send(deleteCommand);
    } else {
      console.warn(
        `No receipt handle found, message not deleted. Message: ${JSON.stringify(
          message
        )}`
      );
    }

    return message.Body;
  }
}
