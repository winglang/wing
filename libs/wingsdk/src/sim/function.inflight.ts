import { IFunctionClient } from "../cloud";
import { Function, FUNCTIONS } from "./function.sim";

export class FunctionClient implements IFunctionClient {
  private readonly fn: Function;
  constructor(functionAddr: number) {
    const fn = FUNCTIONS[functionAddr];
    if (!fn) {
      throw new Error(`Invalid function id: ${functionAddr}`);
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
