import {
  CloudWatchLogsClient,
  GetLogEventsCommand,
  DescribeLogStreamsCommand,
  DescribeLogStreamsCommandOutput,
} from "@aws-sdk/client-cloudwatch-logs";
import { LogEvent } from "../cloud";
import { ILoggerClient } from "./logger";

export class LoggerClient implements ILoggerClient {
  private readonly client: CloudWatchLogsClient;
  constructor(private readonly logGroup: string) {
    this.client = new CloudWatchLogsClient({});
  }

  public async print(message: string): Promise<void> {
    console.log(message);
    return new Promise((resolve) => resolve());
  }

  public async fetchLatestLogs(): Promise<LogEvent[]> {
    // first: get the latest log stream in the log group
    let logStreams: DescribeLogStreamsCommandOutput;
    try {
      logStreams = await this.client.send(
        new DescribeLogStreamsCommand({
          logGroupName: this.logGroup,
          orderBy: "LastEventTime",
          limit: 1,
          descending: true,
        })
      );
    } catch (e) {
      // if the log group doesn't exist, the lambda probably hasn't run yet
      // so there are no logs to return
      if ((e as any).name === "ResourceNotFoundException") {
        return [];
      }
      throw e;
    }
    if (logStreams.logStreams === undefined) {
      return [];
    }
    const logStream = logStreams.logStreams[0];
    if (logStream.logStreamName === undefined) {
      return [];
    }

    // second: get the latest log events
    const events = await this.client.send(
      new GetLogEventsCommand({
        logGroupName: this.logGroup,
        logStreamName: logStream.logStreamName,
      })
    );
    if (events.events === undefined) {
      return [];
    }
    return events.events.map((e) => {
      return {
        message: e.message ?? "",
        timestamp: e.timestamp ?? 0,
      };
    });
  }
}
