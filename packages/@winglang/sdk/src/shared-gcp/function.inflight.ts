import { GoogleAuth } from "google-auth-library";
import { IFunctionClient } from "../cloud";
import { RequestRedirect, Util as http } from "../http";
import { Trace, Json } from "../std";

export class FunctionClient implements IFunctionClient {
  private readonly functionName: string;
  private readonly projectId: string;
  private readonly region: string;
  constructor({
    $functionName,
    $projectId,
    $region,
  }: {
    $functionName: string;
    $projectId: string;
    $region: string;
  }) {
    this.functionName = $functionName;
    this.projectId = $projectId;
    this.region = $region;
  }

  private get functionURL(): string {
    return `https://${this.region}-${this.projectId}.cloudfunctions.net/${this.functionName}`;
  }

  private async _invokeLocally(
    payload: string,
    token: string
  ): Promise<string> {
    try {
      const res = await http.post(this.functionURL, {
        headers: {
          body: payload,
          "Content-Type": "text/plain",
          authorization: `bearer ${token}`,
        },
        redirect: RequestRedirect.FOLLOW,
      });
      if (!res.ok) {
        throw new Error(res.body);
      }
      return res.body;
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
   *  @returns the function returned payload only
   */
  public async invoke(payload?: Json): Promise<Json | undefined> {
    try {
      const auth = new GoogleAuth();
      const client = await auth.getIdTokenClient(this.functionURL);

      const res = await client.request({
        url: this.functionURL,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "text/plain",
        },
        retryConfig: {
          retry: 8,
          retryDelay: 15 * 1000,
          shouldRetry: ({ code }) => {
            // unauthorized - means that the permissions for the invocation are not yet established
            return code === "403";
          },
        },
      });
      /// The gcp call returns "" even for an undefined call
      return (res.data as undefined | Json) || undefined;
    } catch (error) {
      throw new Error(
        `Error while invoking the function ${this.functionName}:\n${
          (error as Error).message
        }`
      );
    }
  }

  public async invokeAsync(_payload?: Json): Promise<void> {
    throw new Error("invokeAsync not implemented");
  }

  /**
   * Invoke the function, passing the given payload as an argument.
   *
   * @returns the function returned payload and logs
   */
  public async invokeWithLogs(
    payload: string,
    token: string
  ): Promise<[string, Trace[]]> {
    console.error("Test invocation on tf-gcp doesn't include logs yet");
    //TODO: add traces to tf-gcp tests- https://github.com/winglang/wing/issues/4904
    return [await this._invokeLocally(payload, token), []];
  }
}
