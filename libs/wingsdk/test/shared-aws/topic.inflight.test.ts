import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";
import { test, expect, beforeEach, vi } from "vitest";
import { TopicClient } from "../../src/shared-aws/topic.inflight";

const snsMock = mockClient(SNSClient);

beforeEach(() => {
  snsMock.reset();
});

test("publish - happy path", async () => {
  // GIVEN
  const TOPIC_ARN = "SOME:TOPIC_ARN:that-is/fake";
  const MESSAGE = "SOME MESSAGE";
  snsMock.on(PublishCommand).resolves({ $metadata: { httpStatusCode: 200 } });

  // WHEN
  const client = new TopicClient(TOPIC_ARN);
  await client.publish(MESSAGE);

  // THEN
  expect(snsMock).toHaveReceivedCommandTimes(PublishCommand, 1);
  expect(snsMock).toHaveReceivedCommandWith(PublishCommand, {
    Message: MESSAGE,
    TopicArn: TOPIC_ARN,
  });
});
