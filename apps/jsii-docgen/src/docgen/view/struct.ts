import * as reflect from "jsii-reflect";
import { extractDocs, StructSchema } from "../schema";
import { Transpile, TranspiledStruct } from "../transpile/transpile";
import { Properties } from "./properties";

export class Struct {
  private readonly transpiled: TranspiledStruct;
  private readonly properties: Properties;
  constructor(
    transpile: Transpile,
    private readonly iface: reflect.InterfaceType
  ) {
    this.transpiled = transpile.struct(iface);
    this.properties = new Properties(transpile, this.iface.allProperties);
  }

  public toJson(): StructSchema {
    return {
      fqn: this.transpiled.type.fqn,
      displayName: this.transpiled.type.fqn.split(".").pop()!,
      id: this.iface.fqn,
      properties: this.properties.toJson(),
      docs: extractDocs(this.iface.docs),
      usage: `${this.transpiled.import}\n\n${this.transpiled.initialization}`,
    };
  }
}
