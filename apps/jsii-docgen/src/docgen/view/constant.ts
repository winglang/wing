import * as reflect from "jsii-reflect";
import { Property } from "./property";
import { PropertySchema } from "../schema";
import { Transpile } from "../transpile/transpile";

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
