import * as reflect from "jsii-reflect";
import { ConstructSchema } from "../schema";
import { Transpile } from "../transpile/transpile";
import { Class } from "./class";
import { Construct } from "./construct";

export class Constructs {
  private readonly constructs: Construct[];
  constructor(transpile: Transpile, classes: reflect.ClassType[]) {
    this.constructs = classes
      .filter((c) => Class.isConstruct(c))
      .map((c) => new Construct(transpile, c));
  }

  public toJson(): ConstructSchema[] {
    return this.constructs.map((construct) => construct.toJson());
  }
}
