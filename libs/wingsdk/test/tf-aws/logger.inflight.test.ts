import {
  CloudWatchLogsClient,
  DescribeLogStreamsCommand,
  GetLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";
import { mockClient } from "aws-sdk-client-mock";
import { LoggerClient } from "../../src/tf-aws/logger.inflight";

const cwlMock = mockClient(CloudWatchLogsClient);

beforeEach(() => {
  cwlMock.reset();
});

test("getLatestLogs - happy path", async () => {
  // GIVEN
  const LOG_GROUP_NAME = "/aws/lambda/Test";
  const LOG_STREAM_NAME = "2021/01/01/[$LATEST]1234567890";
  const LOG_EVENTS = [
    {
      message: "hello world!\n",
      timestamp: 1640995200000,
    },
    {
      message: "Function finished successfully.\n",
      timestamp: 1640995200001,
    },
  ];

  cwlMock
    .on(DescribeLogStreamsCommand, {
      logGroupName: LOG_GROUP_NAME,
      orderBy: "LastEventTime",
      limit: 1,
      descending: true,
    })
    .resolves({ logStreams: [{ logStreamName: LOG_STREAM_NAME }] });
  cwlMock
    .on(GetLogEventsCommand, {
      logGroupName: LOG_GROUP_NAME,
      logStreamName: LOG_STREAM_NAME,
    })
    .resolves({ events: LOG_EVENTS });

  // WHEN
  const client = new LoggerClient(LOG_GROUP_NAME);
  const response = await client.fetchLatestLogs();

  // THEN
  expect(response).toEqual(LOG_EVENTS);
});
