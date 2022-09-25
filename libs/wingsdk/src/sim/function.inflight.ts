import { IFunctionClient } from "../cloud";
import { Function, FUNCTIONS } from "./function.sim";

export class FunctionClient implements IFunctionClient {
  private readonly fn: Function;
  constructor(functionId: number) {
    const fn = FUNCTIONS[functionId];
    if (!fn) {
      throw new Error(`Invalid function id: ${functionId}`);
    }
    this.fn = fn;
  }

  public async invoke(message: string): Promise<string> {
    return this.fn.invoke(message);
  }

  public get timesCalled() {
    return this.fn.timesCalled;
  }
}
