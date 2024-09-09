import {
  SendMessageCommand,
  PurgeQueueCommand,
  GetQueueAttributesCommand,
  SQSClient,
  ReceiveMessageCommand,
  InvalidMessageContents,
  DeleteMessageCommand,
  ReceiveMessageCommandOutput,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";
import { mockClient } from "aws-sdk-client-mock";
import { test, expect, beforeEach } from "vitest";
import { QueueClient } from "../../src/shared-aws/queue.inflight";
import "aws-sdk-client-mock-jest";

const QUEUE_URL = "https://my-queue-url";
const sqsMock = mockClient(SQSClient);

beforeEach(() => {
  sqsMock.reset();
});

test("push - happy path", async () => {
  // GIVEN
  const MESSAGE = "MESSAGE";
  const RESPONSE = {
    MessageId: "MESSAGE_ID",
  };

  sqsMock
    .on(SendMessageCommand, { QueueUrl: QUEUE_URL, MessageBody: MESSAGE })
    .resolves(RESPONSE);

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });
  const response = await client.push(MESSAGE);

  // THEN
  expect(response).toEqual(undefined);
  expect(sqsMock).toHaveReceivedCommandTimes(SendMessageCommand, 1);
});

test("push batch - happy path", async () => {
  // GIVEN
  const MESSAGES = ["MESSAGE1", "MESSAGE2", "MESSAGE3"];
  const RESPONSE = {
    MessageId: "MESSAGE_ID",
  };

  sqsMock.on(SendMessageCommand).resolves(RESPONSE);

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });
  const response = await client.push(...MESSAGES);

  // THEN
  expect(response).toEqual(undefined);
  expect(sqsMock).toHaveReceivedCommandTimes(SendMessageCommand, 3);
  expect(sqsMock).toHaveReceivedNthCommandWith(1, SendMessageCommand, {
    QueueUrl: QUEUE_URL,
    MessageBody: MESSAGES[0],
  });
  expect(sqsMock).toHaveReceivedNthCommandWith(2, SendMessageCommand, {
    QueueUrl: QUEUE_URL,
    MessageBody: MESSAGES[1],
  });
  expect(sqsMock).toHaveReceivedNthCommandWith(3, SendMessageCommand, {
    QueueUrl: QUEUE_URL,
    MessageBody: MESSAGES[2],
  });
});

test("push - sad path invalid message", async () => {
  // GIVEN
  const MESSAGE = "INVALID_MESSAGE";

  sqsMock
    .on(SendMessageCommand, { QueueUrl: QUEUE_URL, MessageBody: MESSAGE })
    .rejects(
      new InvalidMessageContents({
        message: "InvalidMessageContents error",
        $metadata: {},
      })
    );

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });

  // THEN
  await expect(() => client.push(MESSAGE)).rejects.toThrowError(
    /The message contains characters outside the allowed set/
  );
});

test("push - sad path empty message", async () => {
  // GIVEN
  const MESSAGE = "";

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });

  // THEN
  await expect(() => client.push(MESSAGE)).rejects.toThrowError(
    /Empty messages are not allowed/
  );
  expect(sqsMock, "never invoked").toHaveReceivedCommandTimes(
    SendMessageCommand,
    0
  );
});

test("push - sad path unknown error", async () => {
  // GIVEN
  const MESSAGE = "MESSAGE";

  sqsMock
    .on(SendMessageCommand, { QueueUrl: QUEUE_URL, MessageBody: MESSAGE })
    .rejects(new Error("unknown error"));

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });

  // THEN
  await expect(() => client.push(MESSAGE)).rejects.toThrowError(
    /unknown error/
  );
});

test("purge - happy path", async () => {
  // GIVEN
  const RESPONSE = {};

  sqsMock.on(PurgeQueueCommand, { QueueUrl: QUEUE_URL }).resolves(RESPONSE);

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });
  const response = await client.purge();

  // THEN
  expect(response).toEqual(undefined);
});

test("approxSize - happy path", async () => {
  // GIVEN
  const QUEUE_SIZE = 3;
  const GET_QUEUE_ATTRIBUTES_RESPONSE = {
    Attributes: { ApproximateNumberOfMessages: QUEUE_SIZE.toString() },
  };

  sqsMock
    .on(GetQueueAttributesCommand, { QueueUrl: QUEUE_URL })
    .resolves(GET_QUEUE_ATTRIBUTES_RESPONSE);

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });
  const response = await client.approxSize();

  // THEN
  expect(response).toEqual(QUEUE_SIZE);
});

test("pop - happy path", async () => {
  // GIVEN
  const MESSAGE = "MESSAGE";
  const ONE_MSG_RESPONSE: ReceiveMessageCommandOutput = {
    Messages: [
      {
        Body: MESSAGE,
        ReceiptHandle: "RECEIPT_HANDLE",
      },
    ],
    $metadata: {},
  };
  const NO_MSG_RESPONSE = {};

  sqsMock
    .on(ReceiveMessageCommand, { QueueUrl: QUEUE_URL })
    .resolvesOnce(ONE_MSG_RESPONSE)
    .resolves(NO_MSG_RESPONSE);

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });
  const firstPopResponse = await client.pop();
  const secondPopResponse = await client.pop();

  // THEN
  expect(firstPopResponse).toEqual(MESSAGE);
  expect(secondPopResponse).toBeUndefined();
  expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 2);
  expect(sqsMock).toHaveReceivedCommandTimes(DeleteMessageCommand, 1);
});

test("pop - happy path w/o message receipt", async () => {
  // GIVEN
  const MESSAGE = "MESSAGE";
  const ONE_MSG_RESPONSE: ReceiveMessageCommandOutput = {
    Messages: [
      {
        Body: MESSAGE,
        ReceiptHandle: undefined, // <- no receipt handle, unusual but it's fine
      },
    ],
    $metadata: {},
  };
  const NO_MSG_RESPONSE = {};

  sqsMock
    .on(ReceiveMessageCommand, { QueueUrl: QUEUE_URL })
    .resolvesOnce(ONE_MSG_RESPONSE)
    .resolves(NO_MSG_RESPONSE);

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });
  const firstPopResponse = await client.pop();
  const secondPopResponse = await client.pop();

  // THEN
  expect(firstPopResponse).toEqual(MESSAGE);
  expect(secondPopResponse).toBeUndefined();
  expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 2);
  expect(sqsMock).toHaveReceivedCommandTimes(DeleteMessageCommand, 0); // <- delete message command skipped
});

test("pop - happy path w/ no message in the queue", async () => {
  // GIVEN
  const NO_MSG_RESPONSE = {};

  sqsMock
    .on(ReceiveMessageCommand, { QueueUrl: QUEUE_URL })
    .resolves(NO_MSG_RESPONSE);

  // WHEN
  const client = new QueueClient({ $queueUrlOrArn: QUEUE_URL });
  const firstPopResponse = await client.pop();
  const secondPopResponse = await client.pop();

  // THEN
  expect(firstPopResponse).toBeUndefined();
  expect(secondPopResponse).toBeUndefined();
  expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 2);
  expect(sqsMock).toHaveReceivedCommandTimes(DeleteMessageCommand, 0);
});

test("if a queue name is provided, the url is resolved", async () => {
  const queueName = "MyQueueName";

  // GIVEN
  sqsMock.on(GetQueueUrlCommand, { QueueName: queueName }).resolves({
    QueueUrl: "https://my-queue-url",
  });

  sqsMock
    .on(SendMessageCommand, {
      QueueUrl: "https://my-queue-url",
      MessageBody: "test",
    })
    .resolves({});

  const client = new QueueClient({ $queueUrlOrArn: queueName });
  await client.push("test");

  expect(sqsMock).toHaveReceivedCommandTimes(GetQueueUrlCommand, 1);
  expect(sqsMock).toHaveReceivedCommandTimes(SendMessageCommand, 1);
});
