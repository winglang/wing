import * as reflect from "jsii-reflect";
import { Class } from "./class";
import { Interface } from "./interface";
import { ConstructSchema } from "../schema";
import { Transpile } from "../transpile/transpile";

export class Construct {
  private readonly construct: Class;
  private readonly inflightInterface?: Interface;
  constructor(
    transpile: Transpile,
    klass: reflect.ClassType,
    inflight?: Interface,
  ) {
    this.inflightInterface = inflight;
    this.construct = new Class(transpile, klass);
  }

  public toJson(): ConstructSchema {
    return {
      ...this.construct.toJson(),
      inflight: this.inflightInterface?.toJson(),
    };
  }
}
