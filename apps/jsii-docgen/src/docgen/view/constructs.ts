import * as reflect from "jsii-reflect";
import { ConstructSchema } from "../schema";
import { Transpile } from "../transpile/transpile";
import { Class } from "./class";
import { Construct } from "./construct";
import { Interface } from "./interface";

export type WingClassType = reflect.ClassType & { inflightFqn?: string };

export class Constructs {
  private readonly constructs: Construct[];
  constructor(
    transpile: Transpile,
    classes: WingClassType[],
    interfaces: Record<string, reflect.InterfaceType>
  ) {
    this.constructs = classes
      .filter((c) => Class.isConstruct(c))
      .map((c) => {
        return new Construct(
          transpile,
          c,
          c.inflightFqn
            ? new Interface(transpile, interfaces[c.inflightFqn])
            : undefined
        );
      });
  }

  public toJson(): ConstructSchema[] {
    return this.constructs.map((construct) => construct.toJson());
  }
}
