import { InvokeCommand, LambdaClient, LogType } from "@aws-sdk/client-lambda";
import { fromUtf8, toUtf8 } from "@aws-sdk/util-utf8-node";
import { IFunctionClient } from "../cloud";
import { Trace, TraceType } from "../std";

export class FunctionClient implements IFunctionClient {
  constructor(
    private readonly functionArn: string,
    private readonly constructPath: string,
    private readonly lambdaClient = new LambdaClient({})
  ) {}

  /**
   * Invokes the function with a payload and waits for the result.
   *  @returns the function response payload.
   */
  public async invoke(payload: string): Promise<string> {
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
      return "";
    }
    const value = JSON.parse(toUtf8(response.Payload)) ?? "";
    if (typeof value !== "string") {
      throw new Error(
        `function returned value of type ${typeof value}, not string`
      );
    }
    return value;
  }

  /**
   * Invokes the function asynchronously, passing the given payload as an argument.
   * @returns immediately once the event has been handed off to AWS Lambda.
   */
  public async invokeAsync(payload: string): Promise<void> {
    const command = new InvokeCommand({
      FunctionName: this.functionArn,
      Payload: fromUtf8(JSON.stringify(payload)),
      InvocationType: "Event",
    });
    const response = await this.lambdaClient.send(command);

    if (response.StatusCode !== 202) {
      throw new Error(
        `Failed to enqueue event. Received status code: ${response.StatusCode}`
      );
    }
  }

  /**
   * Invokes the function synchronously, passing the given payload as an argument.
   * @returns the function response payload with execution logs included.
   */
  public async invokeWithLogs(payload: string): Promise<[string, Trace[]]> {
    const command = new InvokeCommand({
      FunctionName: this.functionArn,
      Payload: fromUtf8(JSON.stringify(payload)),
      LogType: LogType.Tail,
    });
    const response = await this.lambdaClient.send(command);

    const logs = Buffer.from(response.LogResult ?? "", "base64").toString();
    const traces = parseLogs(logs, this.constructPath);

    if (response.FunctionError) {
      throw new Error(
        `Invoke failed with message: "${
          response.FunctionError
        }". Full error: "${toUtf8(response.Payload!)}"`
      );
    }
    if (!response.Payload) {
      return ["", traces];
    }
    const value = JSON.parse(toUtf8(response.Payload)) ?? "";
    if (typeof value !== "string") {
      throw new Error(
        `function returned value of type ${typeof value}, not string`
      );
    }
    return ["", traces];
  }
}

export function parseLogs(logs: string, sourcePath: string) {
  const lines = logs.split("\n");
  const traces: Trace[] = [];
  for (const line of lines) {
    const parts = line.split("\t");
    // 2023-08-04T16:40:47.309Z 6beb7628-d0c3-4fe9-bf5a-d64c559aa25f INFO hello
    // 2023-08-04T16:40:47.309Z 6beb7628-d0c3-4fe9-bf5a-d64c559aa25f Task timed out after 3.0 seconds
    if (
      parts.length >= 3 &&
      parts[0].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/) !==
        null &&
      parts[1].match(/^[0-9a-fA-F-]{36}$/) !== null
    ) {
      const timestamp = parts[0];
      if (parts.slice(2).join(" ").startsWith("Task timed out after")) {
        continue;
      }
      const message = parts.slice(3).join(" ");
      const trace: Trace = {
        data: { message },
        timestamp,
        sourceType: "@winglang/sdk.cloud.Function",
        sourcePath,
        type: TraceType.LOG,
      };
      traces.push(trace);
    }
  }
  return traces;
}
