import * as reflect from "jsii-reflect";
import { Interface } from "./interface";
import { Struct } from "./struct";
import { StructSchema } from "../schema";
import { Transpile } from "../transpile/transpile";

export class Structs {
  private readonly structs: Struct[];
  constructor(transpile: Transpile, interfaces: reflect.InterfaceType[]) {
    this.structs = interfaces
      .filter((i) => Interface.isStruct(i))
      .map((i) => new Struct(transpile, i));
  }

  public toJson(): StructSchema[] {
    return this.structs.map((s) => s.toJson());
  }
}
