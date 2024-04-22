import { SNSClient, PublishBatchCommand } from "@aws-sdk/client-sns";
import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";
import { test, expect, beforeEach } from "vitest";
import { TopicClient } from "../../src/shared-aws/topic.inflight";
import { Util } from "../../src/util";

const snsMock = mockClient(SNSClient);

beforeEach(() => {
  snsMock.reset();
});

test("publish - happy path", async () => {
  // GIVEN
  const TOPIC_ARN = "SOME:TOPIC_ARN:that-is/fake";
  const MESSAGE = "SOME MESSAGE";
  snsMock
    .on(PublishBatchCommand)
    .resolves({ $metadata: { httpStatusCode: 200 } });

  // WHEN
  const client = new TopicClient(TOPIC_ARN);
  await client.publish(MESSAGE);

  // THEN
  expect(snsMock).toHaveReceivedCommandTimes(PublishBatchCommand, 1);
  expect(snsMock).toHaveReceivedCommandWith(PublishBatchCommand, {
    TopicArn: TOPIC_ARN,
    PublishBatchRequestEntries: [
      {
        Id: Util.sha256(`${MESSAGE}-1`),
        Message: MESSAGE,
      },
    ],
  });
});

test("publish multiple messages", async () => {
  // GIVEN
  const TOPIC_ARN = "SOME:TOPIC_ARN:that-is/fake";
  const FIRST_MESSAGE = "FIRST MESSAGE";
  const SECOND_MESSAGE = "SECOND MESSAGE";
  snsMock
    .on(PublishBatchCommand)
    .resolves({ $metadata: { httpStatusCode: 200 } });

  // WHEN
  const client = new TopicClient(TOPIC_ARN);
  await client.publish(FIRST_MESSAGE, SECOND_MESSAGE);

  // THEN
  expect(snsMock).toHaveReceivedCommandTimes(PublishBatchCommand, 1);
  expect(snsMock).toHaveReceivedCommandWith(PublishBatchCommand, {
    TopicArn: TOPIC_ARN,
    PublishBatchRequestEntries: [
      {
        Id: Util.sha256(`${FIRST_MESSAGE}-1`),
        Message: FIRST_MESSAGE,
      },
      {
        Id: Util.sha256(`${SECOND_MESSAGE}-2`),
        Message: SECOND_MESSAGE,
      },
    ],
  });
});