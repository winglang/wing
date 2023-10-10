import { IFunctionClient } from "../cloud";
import { Util as http } from "../http";
import { Trace } from "../std";

export class FunctionClient implements IFunctionClient {
  constructor(private functionName: string) {}

  /**
   * Invoke the function, passing the given payload as an argument.
   *  @returns the function returned payload only
   */
  public async invoke(payload: string): Promise<string> {
    try {
      const res = await http.post(
        `https://${this.functionName}.azurewebsites.net/api/${this.functionName}`,
        { body: payload }
      );
      return res.body ?? "";
    } catch (error) {
      throw new Error(
        `Error while invoking the function ${this.functionName}:\n${
          (error as Error).message
        }`
      );
    }
  }

  /**
   * Invoke the function, passing the given payload as an argument.
   *
   * @returns the function returned payload and logs
   */
  public async invokeWithLogs(payload: string): Promise<[string, Trace[]]> {
    console.error("invokeWithLogs is not implemented yet on tf-azure");
    return [await this.invoke(payload), []];
  }
}
