import * as reflect from "jsii-reflect";
import { PropertySchema } from "../schema";
import { Transpile } from "../transpile/transpile";
import { Property } from "./property";

export class Properties {
  private readonly properties: Property[];
  constructor(transpile: Transpile, properties: reflect.Property[]) {
    this.properties = properties
      .filter((p) => !p.protected && !p.const)
      .map((p) => new Property(transpile, p));
  }

  public toJson(): PropertySchema[] {
    return this.properties.map((p) => p.toJson());
  }
}
