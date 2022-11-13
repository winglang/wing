import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { mockClient } from "aws-sdk-client-mock";
import { QueueClient } from "../../src/target-tf-aws/queue.inflight";

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
