import * as reflect from "jsii-reflect";
import { extractDocs, PropertySchema } from "../schema";
import { Transpile, TranspiledProperty } from "../transpile/transpile";

export class Property {
  private readonly transpiled: TranspiledProperty;
  constructor(
    transpile: Transpile,
    private readonly property: reflect.Property,
  ) {
    this.transpiled = transpile.property(property);
  }

  public toJson(): PropertySchema {
    return {
      fqn: `${this.transpiled.parentType.fqn}.property.${this.transpiled.name}`,
      displayName: this.transpiled.name,
      id: `${this.property.parentType.fqn}.property.${this.property.name}`,
      optional: this.transpiled.optional === true ? true : undefined, // to save space
      default: this.property.spec.docs?.default,
      type: this.transpiled.typeReference.toJson(),
      docs: extractDocs(this.property.docs),
      usage: this.transpiled.declaration,
    };
  }
}
