import Piscina from "piscina";
import { IFunctionClient } from "../cloud";

export class FunctionClient implements IFunctionClient {
  private readonly client: Piscina;
  private _timesCalled: number = 0;

  constructor(props: {
    sourceCodeFile: string;
    sourceCodeLanguage: string;
    environmentVariables: Record<string, string>;
  }) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.client = new Piscina({
      filename: props.sourceCodeFile,
      env: {
        ...props.environmentVariables,
      },
    });
  }

  public async invoke(payload: string): Promise<string> {
    this._timesCalled += 1;
    let result = await this.client.run(payload, {
      name: "handler",
    });
    return result;
  }

  public get timesCalled() {
    return this._timesCalled;
  }
}
