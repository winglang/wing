import { SNSClient, PublishBatchCommand, PublishBatchRequestEntry, InvalidBatchEntryIdException } from "@aws-sdk/client-sns";
import { ITopicClient } from "../cloud";
import { Util } from "../util/util";

const CHUNK_SIZE = 10;

export class TopicClient implements ITopicClient {
  constructor(
    private readonly topicArn: string,
    private readonly client: SNSClient = new SNSClient({})
  ) { }

  public async publish(...messages: string[]): Promise<void> {
    if (messages.includes("")) {
      throw new Error("Empty messages are not allowed");
    }

    let batchMessages: Array<PublishBatchRequestEntry[]> = [];
    for (let i = 0; i < messages.length; i += CHUNK_SIZE) {
      const chunk = messages.slice(i, i + CHUNK_SIZE);
      batchMessages.concat(await this.processBatchMessages(chunk, i));
    }

    const messagePromises = batchMessages.map(async (messages) => {
      try {
        const command = new PublishBatchCommand({
          TopicArn: this.topicArn,
          PublishBatchRequestEntries: messages
        });
        await this.client.send(command);
      } catch (e) {
        if (e instanceof InvalidBatchEntryIdException) {
          throw new Error(
            `The Id of a batch entry in a batch request doesn't abide by the specification. (message=${messages}): ${(e as Error).stack
            })}`
          );
        }
        throw new Error((e as Error).stack);
      }
    });

    await Promise.all(messagePromises)
  }

  private async processBatchMessages(messages: string[], idx: number): Promise<Array<PublishBatchRequestEntry>> {
    const batchMessages: Array<PublishBatchRequestEntry> = [];
    let index = idx;
    for (const message in messages) {
      batchMessages.push({
        Id: Util.sha256(`${message}-${++index}`),
        Message: message
      })
    }
    return Promise.all(batchMessages);
  }
}
