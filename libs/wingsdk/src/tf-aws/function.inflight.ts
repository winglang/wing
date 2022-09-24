import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { fromUtf8, toUtf8 } from "@aws-sdk/util-utf8-node";
import { IFunctionClient } from "../cloud";

export class FunctionClient implements IFunctionClient {
  constructor(
    private readonly functionArn: string,
    private readonly lambdaClient = new LambdaClient({})
  ) {}

  /**
   * Invoke the function, passing the given payload as an argument.
   */
  public async invoke(payload: string): Promise<string> {
    const command = new InvokeCommand({
      FunctionName: this.functionArn,
      Payload: fromUtf8(payload),
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
    return toUtf8(response.Payload);
  }
}
