import { IFunctionClient } from "../cloud";

export class FunctionClient implements IFunctionClient {
  constructor(
    private readonly functionName: string,
  ) { }

  invoke(payload: string): Promise<string> {
    throw new Error(`Unimplemented, cannot use ${payload} with ${this.functionName}`);
  }
}
