import { IFunctionClient } from "../cloud";
import { Util as http } from "../http";
import { Trace } from "../std";

export class FunctionClient implements IFunctionClient {
  constructor(private functionName: string) {}

  /**
   * Invoke the function, passing the given payload as an argument.
   *  @returns the function returned payload only
   */
  public async invoke(payload?: string): Promise<string | undefined> {
    try {
      const res = await http.post(
        `https://${this.functionName}.azurewebsites.net/api/${this.functionName}`,
        { body: payload },
      );
      if (!res.ok) {
        throw new Error(res.body || "Invocation Error");
      }
      return res.body;
    } catch (error) {
      throw new Error(
        `Error while invoking the function ${this.functionName}:\n${
          (error as Error).message
        }`,
      );
    }
  }

  /**
   * Invokes the function asynchronously, passing the given payload as an argument.
   * @returns immediately once the event has been handed off to AWS Lambda.
   */
  public async invokeAsync(payload: string): Promise<void> {
    payload;
    throw new Error("invokeAsync is not implemented");
  }

  /**
   * Invoke the function, passing the given payload as an argument.
   *
   * @returns the function returned payload and logs
   */
  public async invokeWithLogs(
    payload?: string,
  ): Promise<[string | undefined, Trace[]]> {
    console.error("Test invocation on tf-azure doesn't include logs yet");
    //TODO: add traces to tf-azure tests- https://github.com/winglang/wing/issues/4574
    return [await this.invoke(payload), []];
  }
}
