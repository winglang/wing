import * as reflect from "jsii-reflect";
import { InstanceMethod } from "./instance-method";
import { MethodSchema } from "../schema";
import { Transpile } from "../transpile/transpile";

export class InstanceMethods {
  private readonly instanceMethods: InstanceMethod[];
  constructor(transpile: Transpile, methods: reflect.Method[]) {
    this.instanceMethods = methods
      .filter((m) => !m.protected && !m.static)
      .map((m) => new InstanceMethod(transpile, m));
  }

  public toJson(): MethodSchema[] {
    return this.instanceMethods.map((m) => m.toJson());
  }
}
