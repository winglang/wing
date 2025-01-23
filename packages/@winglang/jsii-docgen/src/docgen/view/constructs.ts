import * as reflect from "jsii-reflect";
import { Class } from "./class";
import { Construct } from "./construct";
import { Interface } from "./interface";
import { ConstructSchema } from "../schema";
import { Transpile } from "../transpile/transpile";

export type WingClassType = reflect.ClassType & { inflightFqn?: string };

export class Constructs {
  private readonly constructs: Construct[];
  constructor(
    transpile: Transpile,
    classes: WingClassType[],
    interfaces: Record<string, reflect.InterfaceType>,
  ) {
    this.constructs = classes
      .filter((c) => Class.isConstruct(c))
      .map((c) => {
        if (c.inflightFqn && !interfaces[c.inflightFqn]) {
          throw new Error(
            `Inflight interface "${c.inflightFqn}" not found for class "${c.fqn}"`,
          );
        }
        return new Construct(
          transpile,
          c,
          c.inflightFqn
            ? new Interface(transpile, interfaces[c.inflightFqn])
            : undefined,
        );
      });
  }

  public toJson(): ConstructSchema[] {
    return this.constructs.map((construct) => construct.toJson());
  }
}
