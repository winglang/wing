import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";
import { TopicClient } from "../../src/target-tf-aws/topic.inflight";
import {test, expect, beforeEach, vi} from "vitest";

const snsMock = mockClient(SNSClient);
const spy = vi.spyOn(snsMock, "on");
beforeEach(() => {
  snsMock.reset();
});

test("publish - happy path", async () => {
  // GIVEN
  const TOPIC_ARN = "SOME:TOPIC_ARN:that-is/fake";
  const MESSAGE = "SOME MESSAGE";

  // snsMock.on(PublishCommand).resolves({ $metadata: { httpStatusCode: 200 } });

  // WHEN
  const client = new TopicClient(TOPIC_ARN);
  const response  = await client.publish(MESSAGE);

  // THEN
  expect(response).toEqual(undefined);
});
