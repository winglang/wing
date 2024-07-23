import {
  InvokeCommand,
  InvokeCommandOutput,
  LambdaClient,
  LogType,
} from "@aws-sdk/client-lambda";
import { fromUtf8, toUtf8 } from "@smithy/util-utf8";
import { ILambdaContext } from "./function";
import { IFunctionClient } from "../cloud";
import { LogLevel, Trace, TraceType, Json } from "../std";

export class FunctionClient implements IFunctionClient {
  public static async context(): Promise<ILambdaContext | undefined> {
    const obj = (globalThis as any).$awsLambdaContext;
    if (!obj) {
      return undefined;
    }
    // workaround for the fact that JSII doesn't allow methods to start with "get"
    obj.remainingTimeInMillis = obj.getRemainingTimeInMillis;
    return obj;
  }

  private readonly lambdaClient = new LambdaClient({});
  private readonly functionArn: string;
  private readonly constructPath: string;
  constructor({
    $functionArn,
    $constructPath,
  }: {
    $functionArn: string;
    $constructPath: string;
  }) {
    this.functionArn = $functionArn;
    this.constructPath = $constructPath;
  }

  /**
   * Invokes the function with a payload and waits for the result.
   *  @returns the function response payload.
   */
  public async invoke(payload?: Json): Promise<Json | undefined> {
    const command = new InvokeCommand({
      FunctionName: this.functionArn,
      // If payload is undefined, pass json `null` as the payload to the function
      // to ensure the received event will be `null` (which will be converted to `undefined` in the function code)
      // If the Payload is undefined, the resulting event will instead be `{}`
      Payload: fromUtf8(
        payload !== undefined ? JSON.stringify(payload) : "null"
      ),
    });
    const response = await this.lambdaClient.send(command);
    return parseCommandOutput(response, this.functionArn);
  }

  /**
   * Kicks off the execution of the function with a payload and returns immediately while the function is running.
   * @returns immediately once the event has been handed off to AWS Lambda.
   */
  public async invokeAsync(payload: Json): Promise<void> {
    const command = new InvokeCommand({
      FunctionName: this.functionArn,
      Payload: fromUtf8(JSON.stringify(payload)),
      InvocationType: "Event",
    });
    const response = await this.lambdaClient.send(command);

    if (response.StatusCode !== 202) {
      console.error("Error: " + response.FunctionError);
      console.error(response.Payload ? toUtf8(response.Payload) : "");
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

    const value = parseCommandOutput(response, this.functionArn);

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

function parseCommandOutput(
  payload: InvokeCommandOutput,
  functionArn: string
): Json | undefined {
  if (payload.FunctionError) {
    let errorText = toUtf8(payload.Payload!);
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch (_) {}

    if (errorData && "errorMessage" in errorData) {
      let errorMessage = `Invoke failed with message: "${
        errorData.errorMessage
      }"\nLogs: ${cloudwatchLogsPath(functionArn)}`;
      errorMessage = errorMessage.replace(
        "Task timed out after",
        "Function timed out after"
      );

      const newError = new Error();
      newError.message = errorMessage;
      newError.name = errorData.errorType;
      newError.stack = errorData.trace?.join("\n");
      throw newError;
    }

    throw new Error(
      `Invoke failed with message: "${
        payload.FunctionError
      }"\nLogs: ${cloudwatchLogsPath(functionArn)}\nFull Error: "${errorText}"`
    );
  }

  if (!payload.Payload) {
    return undefined;
  } else {
    const returnObject = JSON.parse(toUtf8(payload.Payload));
    return returnObject === null ? undefined : returnObject;
  }
}

function cloudwatchLogsPath(functionArn: string): string {
  const functionName = encodeURIComponent(functionArn.split(":").slice(-1)[0]);
  const region = functionArn.split(":")[3];
  return `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:log-groups/log-group/%2Faws%2Flambda%2F${functionName}`;
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
        level: LogLevel.INFO,
      };
      traces.push(trace);
    }
  }
  return traces;
}
