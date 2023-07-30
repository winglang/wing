import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { fromUtf8, toUtf8 } from "@aws-sdk/util-utf8-node";
import { IFunctionClient } from "../cloud";
import { Trace, TraceType } from "../std";
import { FUNCTION_TYPE } from "../target-sim/schema-resources";
import {
  CloudWatchLogsClient,
  GetLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";
import { Context } from "aws-lambda";

export class FunctionClient implements IFunctionClient {
  private readonly cloudWatchClient = new CloudWatchLogsClient({});
  constructor(
    private readonly functionArn: string,
    private readonly constructPath: string,
    private readonly lambdaClient = new LambdaClient({})
  ) {}

  /**
   * Reading the function's logs,
   * along with any logs of a function that was called by the parent function
   *
   * @param logGroupName function's context logGroupName
   * @param logStreamName function's context logGroupName
   * @param constructPath cdk's path to construct
   * @returns a list of Traces
   */

  private async readLogs(
    logGroupName: string,
    logStreamName: string,
    constructPath: string
  ): Promise<Trace[]> {
    const logsCollector: Trace[] = [];

    const command = new GetLogEventsCommand({ logGroupName, logStreamName });
    const response = await this.cloudWatchClient.send(command);

    const reads: Promise<Trace[]>[] = [];

    for (const event of response.events ?? []) {
      const wingLog = event.message?.match(
        /(?<=winglogstart:)[\s\S]*?(?=:winglogend)/
      );
      const invocationLog = event.message?.match(/Invoking .*:/gm);

      if (wingLog) {
        logsCollector.push({
          data: { message: wingLog[0] },
          sourceType: FUNCTION_TYPE,
          sourcePath: constructPath,
          type: TraceType.LOG,
          timestamp: event.timestamp
            ? new Date(event.timestamp).toISOString()
            : "n/a",
        });
      }
      if (invocationLog) {
        const logData = event.message?.split("\t") ?? [];
        const parsedData = JSON.parse(
          Buffer.from(logData[logData.length - 1], "base64").toString("binary")
        );

        reads.push(
          this.readLogs(
            parsedData.logGroupName,
            parsedData.logStreamName,
            parsedData.constructPath
          )
        );
      }
    }

    const logs = await Promise.all(reads);

    return [
      ...logsCollector,
      ...logs.reduce((acc, logs) => [...acc, ...logs], []),
    ];
  }

  /**
   * Verify the function's return payload
   *
   * @returns the function's return payload, if verified
   */
  private verify(value: { context?: Context; payload: string }): string {
    if (typeof value.payload !== "string") {
      throw new Error(
        `function returned value of type ${typeof value.payload}, not string`
      );
    }
    return value.payload;
  }

  /**
   * Invoke the function
   */
  private async executeFunction(
    payload: string
  ): Promise<{ context?: Context; payload: string }> {
    const command = new InvokeCommand({
      FunctionName: this.functionArn,
      Payload: fromUtf8(JSON.stringify(payload)),
    });
    const response = await this.lambdaClient.send(command);

    if (response.FunctionError) {
      throw new Error(
        `Invoke failed with message: "${
          response.FunctionError
        }". Full error: "${toUtf8(response.Payload!)}"`
      );
    }
    if (!response.Payload) {
      return { payload: "" };
    }
    const value = JSON.parse(toUtf8(response.Payload)) ?? "";
    return value;
  }

  /**
   * Invoke the function, passing the given payload as an argument.
   *  @returns the function returned payload only
   */
  public async invoke(payload: string): Promise<string> {
    const arnParts = this.functionArn.split(":");
    const functionName = arnParts[arnParts.indexOf("function") + 1];
    const value = await this.executeFunction(payload);

    // kind of hacky, but this is the most convenient way to pass those arguments to the calling function
    console.log(
      `Invoking ${functionName}:\t${Buffer.from(
        JSON.stringify({
          logGroupName: value?.context?.logGroupName,
          logStreamName: value?.context?.logStreamName,
          constructPath: this.constructPath,
        }),
        "binary"
      ).toString("base64")}`
    );

    return this.verify(value);
  }

  /**
   * Invoke the function, passing the given payload as an argument.
   *
   * @returns the function returned payload and logs
   */
  public async invokeWithLogs(payload: string): Promise<[string, Trace[]]> {
    const traces: Trace[] = [];

    const value = await this.executeFunction(payload);

    if (value?.context?.logGroupName && value?.context?.logStreamName) {
      // waiting for the logs to be created
      await new Promise((resolve) => setTimeout(resolve, 10000));
      traces.push(
        ...(await this.readLogs(
          value?.context?.logGroupName,
          value?.context?.logStreamName,
          this.constructPath
        ))
      );
    }

    return [this.verify(value), traces];
  }
}
