import {
  InvokeCommand,
  InvokeCommandOutput,
  LambdaClient,
  LogType,
} from "@aws-sdk/client-lambda";
import { fromUtf8, toUtf8 } from "@smithy/util-utf8";
import { IFunctionClient } from "../cloud";
import { Trace, TraceType } from "../std";

export class FunctionClient implements IFunctionClient {
  constructor(
    private readonly functionArn: string,
    private readonly constructPath: string,
    private readonly lambdaClient = new LambdaClient({})
  ) {}

  /**
   * Invoke the function, passing the given payload as an argument.
   *  @returns the function returned payload only
   */
  public async invoke(payload: string): Promise<string> {
    const command = new InvokeCommand({
      FunctionName: this.functionArn,
      Payload: fromUtf8(JSON.stringify(payload)),
    });
    const response = await this.lambdaClient.send(command);

    const value = parseCommandOutput(response);

    if (!value) {
      return "";
    }
    if (typeof value !== "string") {
      throw new Error(
        `function returned value of type ${typeof value}, not string`
      );
    }
    return value;
  }

  /**
   * Invoke the function, passing the given payload as an argument.
   *
   * @returns the function returned payload and logs
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

    const value = parseCommandOutput(response);

    if (!value) {
      return ["", traces];
    }
    if (typeof value !== "string") {
      throw new Error(
        `function returned value of type ${typeof value}, not string`
      );
    }
    return ["", traces];
  }
}

function parseCommandOutput(payload: InvokeCommandOutput): any | undefined {
  if (payload.FunctionError) {
    let errorText = toUtf8(payload.Payload!);
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch (_) {}

    if (errorData && "errorMessage" in errorData) {
      const newError = new Error(
        `Invoke failed with message: "${errorData.errorMessage}"`
      );
      newError.name = errorData.errorType;
      newError.stack = errorData.trace?.join("\n");
      throw newError;
    }
    throw new Error(
      `Invoke failed with message: "${payload.FunctionError}". Full error: "${errorText}"`
    );
  } else {
    if (!payload.Payload) {
      return undefined;
    } else {
      return JSON.parse(toUtf8(payload.Payload));
    }
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
