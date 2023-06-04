import {
  SendMessageCommand,
  PurgeQueueCommand,
  GetQueueAttributesCommand,
  SQSClient,
  ReceiveMessageCommand,
} from "@aws-sdk/client-sqs";
import { mockClient } from "aws-sdk-client-mock";
import { test, expect, beforeEach } from "vitest";
import { QueueClient } from "../../src/shared-aws/queue.inflight";

const sqsMock = mockClient(SQSClient);

beforeEach(() => {
  sqsMock.reset();
});

test("push - happy path", async () => {
  // GIVEN
  const QUEUE_URL = "QUEUE_URL";
  const MESSAGE = "MESSAGE";
  const RESPONSE = {
    MessageId: "MESSAGE_ID",
  };

  sqsMock
    .on(SendMessageCommand, { QueueUrl: QUEUE_URL, MessageBody: MESSAGE })
    .resolves(RESPONSE);

  // WHEN
  const client = new QueueClient(QUEUE_URL);
  const response = await client.push(MESSAGE);

  // THEN
  expect(response).toEqual(undefined);
});

test("purge - happy path", async () => {
  // GIVEN
  const QUEUE_URL = "QUEUE_URL";
  const RESPONSE = {};

  sqsMock.on(PurgeQueueCommand, { QueueUrl: QUEUE_URL }).resolves(RESPONSE);

  // WHEN
  const client = new QueueClient(QUEUE_URL);
  const response = await client.purge();

  // THEN
  expect(response).toEqual(undefined);
});

test("approxSize - happy path", async () => {
  // GIVEN
  const QUEUE_SIZE = 3;
  const QUEUE_URL = "QUEUE_URL";
  const GET_QUEUE_ATTRIBUTES_RESPONSE = {
    Attributes: { ApproximateNumberOfMessages: QUEUE_SIZE.toString() },
  };

  sqsMock
    .on(GetQueueAttributesCommand, { QueueUrl: QUEUE_URL })
    .resolves(GET_QUEUE_ATTRIBUTES_RESPONSE);

  // WHEN
  const client = new QueueClient(QUEUE_URL);
  const response = await client.approxSize();

  // THEN
  expect(response).toEqual(QUEUE_SIZE);
});

test("pop - happy path", async () => {
  // GIVEN
  const QUEUE_URL = "QUEUE_URL";
  const MESSAGE = "MESSAGE";
  const ONE_MSG_RESPONSE = {
    Messages: [
      {
        Body: MESSAGE,
      },
    ],
  };
  const NO_MSG_RESPONSE = {};

  sqsMock
    .on(ReceiveMessageCommand, { QueueUrl: QUEUE_URL })
    .resolvesOnce(ONE_MSG_RESPONSE)
    .resolves(NO_MSG_RESPONSE);

  // WHEN
  const client = new QueueClient(QUEUE_URL);
  const firstPopResponse = await client.pop();
  const secondPopResponse = await client.pop();

  // THEN
  expect(firstPopResponse).toEqual(MESSAGE);
  expect(secondPopResponse).toBeUndefined();
});
