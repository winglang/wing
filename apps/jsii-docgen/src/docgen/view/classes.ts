import * as reflect from "jsii-reflect";
import { ClassSchema } from "../schema";
import { Transpile } from "../transpile/transpile";
import { Class } from "./class";

export class Classes {
  private readonly classes: Class[];
  constructor(transpile: Transpile, classes: reflect.ClassType[]) {
    this.classes = classes
      .filter((c) => !Class.isConstruct(c))
      .map((c) => new Class(transpile, c));
  }

  public toJson(): ClassSchema[] {
    return this.classes.map((klass) => klass.toJson());
  }
}
