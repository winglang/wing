import * as reflect from "jsii-reflect";
import { ConstructSchema } from "../schema";
import { Transpile } from "../transpile/transpile";
import { Class } from "./class";
import { Construct } from "./construct";
import { Interface } from "./interface";

export class Constructs {
  private readonly constructs: Construct[];
  constructor(
    transpile: Transpile,
    classes: (reflect.ClassType & { inflightId?: string })[],
    interfaces: Record<string, reflect.InterfaceType>
  ) {
    this.constructs = classes
      .filter((c) => Class.isConstruct(c))
      .map((c) => {
        return new Construct(
          transpile,
          c,
          c.inflightId
            ? new Interface(transpile, interfaces[c.inflightId])
            : undefined
        );
      });
  }

  public toJson(): ConstructSchema[] {
    return this.constructs.map((construct) => construct.toJson());
  }
}
