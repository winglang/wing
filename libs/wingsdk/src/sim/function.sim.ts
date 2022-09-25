import Piscina from "piscina";

export const FUNCTIONS = new Array<Function | undefined>();

export interface FunctionProps {
  readonly sourceCodeFile: string;
  readonly sourceCodeLanguage: string;
  readonly environmentVariables: Record<string, string>;
}

export async function init(
  props: FunctionProps
): Promise<{ functionAddr: number }> {
  const fn = new Function(props);
  const addr = FUNCTIONS.push(fn) - 1;
  return {
    functionAddr: addr,
  };
}

export async function cleanup(attributes: { functionAddr: number }) {
  const functionAddr = attributes.functionAddr;
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

  constructor(props: FunctionProps) {
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
