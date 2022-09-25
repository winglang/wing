import Piscina from "piscina";

export const FUNCTIONS = new Array<Function | undefined>();

export interface QueueProps {
  readonly sourceCodeFile: string;
  readonly sourceCodeLanguage: string;
  readonly environmentVariables: Record<string, string>;
}

export async function init(props: QueueProps): Promise<{ functionId: number }> {
  const fn = new Function(props);
  const id = FUNCTIONS.push(fn) - 1;
  return {
    functionId: id,
  };
}

export async function cleanup(functionId: number) {
  const fn = FUNCTIONS[functionId];
  if (!fn) {
    throw new Error(`Invalid function id: ${functionId}`);
  }
  await fn.cleanup();
  FUNCTIONS[functionId] = undefined;
}

export class Function {
  private readonly worker: Piscina;
  private _timesCalled: number = 0;

  constructor(props: QueueProps) {
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
