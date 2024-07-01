import * as reflect from "jsii-reflect";
import { EnumMember } from "./enum-member";
import { EnumSchema, extractDocs } from "../schema";
import { Transpile, TranspiledEnum } from "../transpile/transpile";

export class Enum {
  private readonly transpiled: TranspiledEnum;
  private readonly members: EnumMember[];
  constructor(
    private readonly transpile: Transpile,
    private readonly enu: reflect.EnumType
  ) {
    this.transpiled = this.transpile.enum(this.enu);
    this.members = enu.members.map((em) => new EnumMember(transpile, em));
  }

  public toJson(): EnumSchema {
    return {
      fqn: this.transpiled.fqn,
      displayName: this.transpiled.fqn.split(".").pop()!,
      id: this.enu.fqn,
      members: this.members.map((em) => em.toJson()),
      docs: extractDocs(this.enu.docs),
    };
  }
}
