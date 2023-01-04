import * as reflect from "jsii-reflect";
import { PropertySchema } from "../schema";
import { Transpile } from "../transpile/transpile";
import { Property } from "./property";

export class Constant {
  private readonly constant: Property;
  constructor(transpile: Transpile, property: reflect.Property) {
    this.constant = new Property(transpile, property);
  }

  public toJson(): PropertySchema {
    return {
      ...this.constant.toJson(),
      const: true,
    };
  }
}
