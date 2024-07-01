import {
  SQSClient,
  SendMessageCommand,
  PurgeQueueCommand,
  GetQueueAttributesCommand,
  ReceiveMessageCommand,
  InvalidMessageContents,
  DeleteMessageCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";
import { IAwsQueueClient } from "./queue";

export class QueueClient implements IAwsQueueClient {
  private _queueUrl?: string;

  constructor(
    private readonly _queueUrlOrArn: string,
    private readonly client: SQSClient = new SQSClient({})
  ) {}

  public async push(...messages: string[]): Promise<void> {
    if (messages.includes("")) {
      throw new Error("Empty messages are not allowed");
    }

    const messagePromises = messages.map(async (message) => {
      try {
        const command = new SendMessageCommand({
          QueueUrl: await this.queueUrl(),
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

  public async queueUrl(): Promise<string> {
    if (!this._queueUrl) {
      // if we have the queue name instead of the url, then we need to resolve it first
      if (this._queueUrlOrArn.startsWith("https://")) {
        this._queueUrl = this._queueUrlOrArn;
      } else {
        // extract the queue name from its ARN
        const arnParts = this._queueUrlOrArn.split(":");
        const queueName = arnParts[arnParts.length - 1].split("/").pop();
        if (!queueName) {
          throw new Error(
            `Unable to extract queue name from ARN: ${this._queueUrlOrArn}`
          );
        }

        const command = new GetQueueUrlCommand({ QueueName: queueName });
        const data = await this.client.send(command);
        if (!data.QueueUrl) {
          throw new Error(
            `Unable to resolve queue URL from SQS queue ARN: ${this._queueUrlOrArn}`
          );
        }

        this._queueUrl = data.QueueUrl;
      }
    }

    return this._queueUrl;
  }

  public async purge(): Promise<void> {
    const command = new PurgeQueueCommand({
      QueueUrl: await this.queueUrl(),
    });
    await this.client.send(command);
  }

  public async approxSize(): Promise<number> {
    const command = new GetQueueAttributesCommand({
      QueueUrl: await this.queueUrl(),
      AttributeNames: ["ApproximateNumberOfMessages"],
    });
    const data = await this.client.send(command);
    return Number.parseInt(data.Attributes?.ApproximateNumberOfMessages ?? "0");
  }

  public async pop(): Promise<string | undefined> {
    const receiveCommand = new ReceiveMessageCommand({
      QueueUrl: await this.queueUrl(),
      MaxNumberOfMessages: 1,
    });
    const data = await this.client.send(receiveCommand);
    if (!data.Messages || data.Messages.length === 0) {
      return undefined;
    }

    const message = data.Messages[0];

    if (message.ReceiptHandle) {
      const deleteCommand = new DeleteMessageCommand({
        QueueUrl: await this.queueUrl(),
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
