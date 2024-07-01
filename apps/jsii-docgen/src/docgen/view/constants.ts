import * as reflect from "jsii-reflect";
import { Constant } from "./constant";
import { PropertySchema } from "../schema";
import { Transpile } from "../transpile/transpile";

export class Constants {
  private readonly constants: Constant[];
  constructor(transpile: Transpile, properties: reflect.Property[]) {
    this.constants = properties
      .filter((p) => !p.protected && p.const)
      .map((p) => new Constant(transpile, p));
  }

  public toJson(): PropertySchema[] {
    return this.constants.map((c) => c.toJson());
  }
}
