import { IFunctionClient } from "../cloud";

export class FunctionClient implements IFunctionClient {
  constructor(
  ) { }

  invoke(payload: string): Promise<string> {
    throw new Error(`Method not implemented. Can not use ${payload}`);
  }

}
