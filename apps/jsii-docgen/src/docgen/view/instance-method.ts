import * as reflect from "jsii-reflect";
import { Parameter } from "./parameter";
import { extractDocs, MethodSchema } from "../schema";
import { Transpile, TranspiledCallable } from "../transpile/transpile";

export class InstanceMethod {
  private readonly transpiled: TranspiledCallable;
  private readonly parameters: Parameter[];
  constructor(
    private readonly transpile: Transpile,
    private readonly method: reflect.Method
  ) {
    this.transpiled = transpile.callable(method);
    this.parameters = this.transpiled.parameters.map(
      (p) => new Parameter(this.transpile, p)
    );
  }

  public toJson(): MethodSchema {
    return {
      fqn: `${this.transpiled.parentType.fqn}.${this.transpiled.name}`,
      displayName: this.transpiled.name,
      id: `${this.method.parentType.fqn}.${this.method.name}`,
      parameters: this.parameters.map((p) => p.toJson()),
      docs: extractDocs(this.method.docs),
      usage: this.transpiled.signatures.join("\n"),
    };
  }
}
