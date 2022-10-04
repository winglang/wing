import Piscina from "piscina";
import { FunctionSchema } from "./schema";

// An array that stores all active Function simulations. This array is shared
// across different simulations -- in other words, you can start multiple
// simulations in parallel and they will all share the same pool of resources.
// When a simulation is cleaned up, it will remove its resources from this array.
export const FUNCTIONS = new Array<Function | undefined>();

export async function init(
  props: FunctionSchema["props"]
): Promise<FunctionSchema["attrs"]> {
  const fn = new Function(props);
  const addr = FUNCTIONS.push(fn) - 1;
  return {
    functionAddr: addr,
  };
}

export async function cleanup(attrs: FunctionSchema["attrs"]) {
  const functionAddr = attrs.functionAddr;
  const fn = FUNCTIONS[functionAddr];
  if (!fn) {
    throw new Error(`Invalid function id: ${functionAddr}`);
  }
  await fn.cleanup();
  FUNCTIONS[functionAddr] = undefined;
}

export class Function {
  private readonly worker: Piscina;
  private _timesCalled: number = 0;

  constructor(props: FunctionSchema["props"]) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.worker = new Piscina({
      filename: props.sourceCodeFile,
      env: {
        ...props.environmentVariables,
      },
    });
  }

  public async invoke(payload: string): Promise<string> {
    this._timesCalled += 1;
    let result = await this.worker.run(payload, {
      name: "handler",
    });
    return result;
  }

  public get timesCalled() {
    return this._timesCalled;
  }

  public async cleanup() {
    await this.worker.destroy();
  }
}
