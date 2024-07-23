import { IFunctionClient } from "../cloud";
import { Trace, Json } from "../std";

export class FunctionClient implements IFunctionClient {
  private readonly functionName: string;
  constructor({ $functionName }: { $functionName: string }) {
    this.functionName = $functionName;
  }

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

      const resText = await res.text();

      if (!res.ok) {
        throw new Error(resText ?? "Invocation Error");
      }

      if (resText === "") {
        return undefined;
      }

      // If the response is not valid JSON, we'll assume it's string data and return it as is
      try {
        let resJson = JSON.parse(resText);
        return resJson;
      } catch (error) {
        return Json._fromAny(resText);
      }
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
