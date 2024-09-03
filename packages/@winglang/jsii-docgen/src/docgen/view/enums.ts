import * as reflect from "jsii-reflect";
import { Enum } from "./enum";
import { EnumSchema } from "../schema";
import { Transpile } from "../transpile/transpile";

export class Enums {
  private readonly enums: Enum[];
  constructor(transpile: Transpile, enums: reflect.EnumType[]) {
    this.enums = enums.map((e) => new Enum(transpile, e));
  }

  public toJson(): EnumSchema[] {
    return this.enums.map((enu) => enu.toJson());
  }
}
