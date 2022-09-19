import Piscina from "piscina";
import { IFunctionClient } from "../cloud";

export class FunctionClient implements IFunctionClient {
  private readonly client: Piscina;

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

  public async invoke(payload: any): Promise<any> {
    return this.client.run(payload, {
      name: "handler",
    });
  }
}
