import { InvokeCommand, LambdaClient, LogType } from "@aws-sdk/client-lambda";
import { fromUtf8, toUtf8 } from "@aws-sdk/util-utf8-node";
import { IFunctionClient } from "../cloud";
import { Trace, TraceType } from "../std";
import { FUNCTION_TYPE } from "../target-sim/schema-resources";

export class FunctionClient implements IFunctionClient {
  constructor(
    private readonly functionArn: string,
    private readonly lambdaClient = new LambdaClient({})
  ) {}

  /**
   * Invoke the function, passing the given payload as an argument.
   */
  public async invoke(
    payload: string,
    logsCollector?: Trace[]
  ): Promise<string> {
    const command = new InvokeCommand({
      FunctionName: this.functionArn,
      Payload: fromUtf8(JSON.stringify(payload)),
      LogType: LogType.Tail,
    });
    const response = await this.lambdaClient.send(command);
    const arnParts = this.functionArn.split(":");
    const functionName = arnParts[arnParts.indexOf("function") + 1];

    if (logsCollector) {
      const logs: string[] =
        atob(response.LogResult ?? "").match(
          // date, then any char then a line of winglog
          /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)(.*)winglogstart:[\s\S]+?:winglogend/gm
        ) ?? [];

      logsCollector.push(
        ...logs.map((item: string) => ({
          data: {
            message: (item.match(/(?<=winglogstart:)[\s\S]*?(?=:winglogend)/) ??
              [])[0],
          },
          sourceType: FUNCTION_TYPE,
          sourcePath: functionName, //TODO: is that the right thing to do?
          type: TraceType.LOG,
          timestamp:
            (item.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/) ??
              [])[0] ?? "non-existent",
        }))
      );
    } else {
      console.log(`Invoking ${functionName}:`);
      console.log(
        atob(response.LogResult ?? "")
          .match(/winglogstart:[\s\S]+?:winglogend/gm)
          ?.join("\n") ?? ""
      );
    }

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
}
