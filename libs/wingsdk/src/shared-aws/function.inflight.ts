import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { fromUtf8, toUtf8 } from "@aws-sdk/util-utf8-node";
import { Context } from "aws-lambda";
import { IFunctionClient } from "../cloud";
import { Trace } from "../std";

export class FunctionClient implements IFunctionClient {
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

  private readLogs(logs: Trace[]): Trace[] {
    const logsCollector: Trace[] = [];

    for (const log of logs) {
      const invocationLog = log.data.message?.match(/Invoking .*:/gm);

      if (invocationLog) {
        const logData = log.data.message.split("\t") ?? [];
        const parsedLogs: Trace[] =
          JSON.parse(
            Buffer.from(logData[logData.length - 1], "base64").toString(
              "binary"
            )
          )?.logs ?? [];

        logsCollector.push(...this.readLogs(parsedLogs));
      } else {
        logsCollector.push(log);
      }
    }

    return logsCollector;
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
  private async executeFunction(payload: string): Promise<{
    context?: Context & {
      logs: Trace[];
    };
    payload: string;
  }> {
    const command = new InvokeCommand({
      FunctionName: this.functionArn,
      Payload: fromUtf8(JSON.stringify(payload)),
      ClientContext: Buffer.from(
        JSON.stringify({ constructPath: this.constructPath }),
        "binary"
      ).toString("base64"),
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
    const value = await this.executeFunction(payload);
    const functionName = value?.context?.functionName;

    // kind of hacky, but this is the most convenient way to pass those arguments to the calling function
    console.log(
      `Invoking ${functionName}:\t${Buffer.from(
        JSON.stringify({
          logs: value?.context?.logs,
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

    if (value.context?.logs) {
      traces.push(...this.readLogs(value.context.logs));
    }

    return [this.verify(value), traces];
  }
}
