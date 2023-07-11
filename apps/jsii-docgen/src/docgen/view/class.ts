import * as reflect from "jsii-reflect";
import { Constants } from "./constants";
import { Initializer } from "./initializer";
import { InstanceMethods } from "./instance-methods";
import { Properties } from "./properties";
import { StaticFunctions } from "./static-functions";
import { HIDDEN_METHODS, HIDDEN_STATIC } from "./wing-filters";
import { ClassSchema, extractDocs } from "../schema";
import {
  Transpile,
  TranspiledClass,
  TranspiledType,
} from "../transpile/transpile";

const CONSTRUCT_CLASS = "constructs.Construct";

export class Class {
  public static isConstruct(klass: reflect.ClassType): boolean {
    if (klass.fqn === CONSTRUCT_CLASS) return true;

    if (!klass.base) {
      return false;
    }

    return this.isConstruct(klass.base);
  }

  private readonly transpiled: TranspiledClass;

  private readonly initializer?: Initializer;
  private readonly instanceMethods: InstanceMethods;
  private readonly staticFunctions: StaticFunctions;
  private readonly constants: Constants;
  private readonly properties: Properties;
  private readonly interfaces: TranspiledType[];

  constructor(
    private readonly transpile: Transpile,
    private readonly klass: reflect.ClassType
  ) {
    if (klass.initializer) {
      this.initializer = new Initializer(transpile, klass.initializer);
    }
    this.instanceMethods = new InstanceMethods(
      transpile,
      klass.allMethods.filter((m) => !HIDDEN_METHODS.includes(m.name))
    );
    this.staticFunctions = new StaticFunctions(
      transpile,
      klass.allMethods.filter((m) => !HIDDEN_STATIC.includes(m.name))
    );
    this.constants = new Constants(transpile, klass.allProperties);
    this.properties = new Properties(transpile, klass.allProperties);
    this.interfaces = klass.interfaces.map((iface) =>
      this.transpile.type(iface)
    );
    this.transpiled = transpile.class(klass);
  }

  public toJson(): ClassSchema {
    const name = this.transpiled.type.fqn.split(".").pop()!;
    const namespace = this.transpiled.type.namespace;
    return {
      initializer: this.initializer?.toJson(),
      interfaces: this.interfaces.map((iface) => iface.toJson()),
      instanceMethods: this.instanceMethods.toJson(),
      staticMethods: this.staticFunctions.toJson(),
      constants: this.constants.toJson(),
      properties: this.properties.toJson(),
      fqn: this.transpiled.type.fqn,
      displayName:
        name === "Util" && namespace
          ? // capitalized namespace
            namespace.charAt(0).toUpperCase() + namespace.slice(1)
          : name,
      id: this.klass.fqn,
      docs: extractDocs(this.klass.docs),
    };
  }
}
