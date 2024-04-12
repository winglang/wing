import { IFunctionClient } from "../cloud";
import { Trace, Json } from "../std";

export class FunctionClient implements IFunctionClient {
  constructor(private functionName: string) {}

  /**
   * Invoke the function, passing the given payload as an argument.
   * @returns the function returned payload only
   */
  public async invoke(payload?: Json): Promise<Json | undefined> {
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload ? JSON.stringify(payload) : undefined,
      };

      const res = await fetch(
        `https://${this.functionName}.azurewebsites.net/api/${this.functionName}`,
        requestOptions
      );

      if (!res.ok) {
        throw new Error((await res.text()) || "Invocation Error");
      }

      const responseBody = await res.json();
      return responseBody as Json;
    } catch (error) {
      throw new Error(
        `Error while invoking the function ${this.functionName}: ${
          (error as Error).message
        }`
      );
    }
  }

  /**
   * Invokes the function asynchronously, passing the given payload as an argument.
   * @returns immediately once the event has been handed off to AWS Lambda.
   */
  public async invokeAsync(payload: Json): Promise<void> {
    payload;
    throw new Error("invokeAsync is not implemented");
  }

  /**
   * Invoke the function, passing the given payload as an argument.
   *
   * @returns the function returned payload and logs
   */
  public async invokeWithLogs(
    payload?: Json
  ): Promise<[Json | undefined, Trace[]]> {
    console.error("Test invocation on tf-azure doesn't include logs yet");
    //TODO: add traces to tf-azure tests- https://github.com/winglang/wing/issues/4574
    return [await this.invoke(payload), []];
  }
}
