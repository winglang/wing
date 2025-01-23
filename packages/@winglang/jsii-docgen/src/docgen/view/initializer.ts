import * as reflect from "jsii-reflect";
import { Parameter } from "./parameter";
import { InitializerSchema } from "../schema";
import { Transpile, TranspiledCallable } from "../transpile/transpile";

export class Initializer {
  private readonly transpiled: TranspiledCallable;
  private readonly parameters: Parameter[];
  constructor(
    private readonly transpile: Transpile,
    private readonly initializer: reflect.Initializer,
  ) {
    this.transpiled = transpile.callable(initializer);
    this.parameters = this.transpiled.parameters.map(
      (p) => new Parameter(this.transpile, p),
    );
  }

  public toJson(): InitializerSchema {
    return {
      fqn: `${this.transpiled.parentType.fqn}.Initializer`,
      displayName: "Initializer",
      id: `${this.initializer.parentType.fqn}.Initializer`,
      parameters: this.parameters.map((param) => param.toJson()),
      usage: [this.transpiled.import, this.transpiled.invocations]
        .filter((item) => !!item)
        .join("\n\n"),
    };
  }
}
