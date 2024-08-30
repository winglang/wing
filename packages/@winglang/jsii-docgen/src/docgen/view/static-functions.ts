import * as reflect from "jsii-reflect";
import { StaticFunction } from "./static-function";
import { MethodSchema } from "../schema";
import { Transpile } from "../transpile/transpile";

export class StaticFunctions {
  private readonly staticFunctions: StaticFunction[];
  constructor(transpile: Transpile, methods: reflect.Method[]) {
    this.staticFunctions = methods
      .filter((m) => !m.protected && m.static)
      .map((m) => new StaticFunction(transpile, m));
  }

  public toJson(): MethodSchema[] {
    return this.staticFunctions.map((method) => method.toJson());
  }
}
