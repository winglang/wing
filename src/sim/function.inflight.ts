import fetch from "node-fetch";
import { IFunctionClient } from "../cloud";
import { createWingLocalClient } from "./util.inflight";

export class FunctionClient implements IFunctionClient {
  private readonly baseUrl: string;
  private readonly client: ReturnType<typeof createWingLocalClient>;

  constructor(private readonly functionId: string) {
    this.baseUrl = process.env.WING_LOCAL_URL ?? "http://localhost:4000";
    this.client = createWingLocalClient({
      url: this.baseUrl,
      //TODO: check why typeof fetch doesn't work
      // @ts-ignore
      fetch,
    });
  }

  public async invoke(payload: string): Promise<string> {
    return this.client.mutation("function.Invoke", {
      resourceId: this.functionId,
      input: payload,
    } as any);
  }
}
