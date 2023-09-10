import { PolicyStatement } from "../shared-gcp/types";
import { IInflightHost } from "../std";

export interface IGcpFunction {
  addEnvironment(key: string, value: string): void;
  addPolicyStatements(policies: PolicyStatement): void;
}

export class Function {
  public static from(host: IInflightHost): IGcpFunction | undefined {
    if (this.isGcpFunction(host)) {
      return host;
    }

    return undefined;
  }

  private static isGcpFunction(obj: any): obj is IGcpFunction {
    return (
      typeof obj.addPolicyStatements === "function" &&
      typeof obj.addEnvironment === "function"
    );
  }
}
