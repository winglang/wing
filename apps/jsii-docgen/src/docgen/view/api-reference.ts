import * as reflect from "jsii-reflect";
import { ApiReferenceSchema } from "../schema";
import { Language, Transpile } from "../transpile/transpile";
import { Classes } from "./classes";
import { Constructs } from "./constructs";
import { Enums } from "./enums";
import { Interfaces } from "./interfaces";
import { Structs } from "./structs";

/**
 * Render an API reference based on the jsii assembly.
 */
export class ApiReference {
  private readonly constructs: Constructs;
  private readonly structs: Structs;
  private readonly interfaces: Interfaces;
  private readonly classes: Classes;
  private readonly enums: Enums;
  constructor(
    transpile: Transpile,
    assembly: reflect.Assembly,
    submodule?: reflect.Submodule,
    allSubmodules?: boolean
  ) {
    let classes: reflect.ClassType[];
    let interfaces: reflect.InterfaceType[];
    let enums: reflect.EnumType[];

    let submodules = assembly.submodules;

    // TODO WING HACK
    const wingHacks = transpile.language === Language.WING;
    if (wingHacks) {
      submodules = submodules.filter(
        (s) => s.name === "cloud" || s.name === "core" || s.name === "fs"
      );
    }

    if (allSubmodules ?? false) {
      classes = this.sortByName([
        ...assembly.classes,
        ...flatMap(submodules, (submod) => [...submod.classes]),
      ]);
      interfaces = this.sortByName([
        ...assembly.interfaces,
        ...flatMap(submodules, (submod) => [...submod.interfaces]),
      ]);
      enums = this.sortByName([
        ...assembly.enums,
        ...flatMap(submodules, (submod) => [...submod.enums]),
      ]);
    } else {
      classes = this.sortByName(
        submodule ? submodule.classes : assembly.classes
      );
      interfaces = this.sortByName(
        submodule ? submodule.interfaces : assembly.interfaces
      );
      enums = this.sortByName(submodule ? submodule.enums : assembly.enums);
    }

    // TODO WING HACK
    // ignore certain concrete classes from wingsdk
    let constructClasses = classes;
    if (wingHacks) {
      classes = classes.filter((c) => !c.abstract);
      constructClasses = classes.filter(
        (c) => !c.abstract && c.docs.customTag("inflight")
      );
    }

    this.constructs = new Constructs(transpile, constructClasses);
    this.classes = new Classes(transpile, classes);
    this.structs = new Structs(transpile, interfaces);
    this.interfaces = new Interfaces(transpile, interfaces);
    this.enums = new Enums(transpile, enums);
  }

  /**
   * Generate JSON.
   */
  public toJson(): ApiReferenceSchema {
    return {
      constructs: this.constructs.toJson(),
      classes: this.classes.toJson(),
      structs: this.structs.toJson(),
      interfaces: this.interfaces.toJson(),
      enums: this.enums.toJson(),
    };
  }

  private sortByName<Type extends reflect.Type>(arr: readonly Type[]): Type[] {
    return [...arr].sort((s1, s2) => s1.name.localeCompare(s2.name));
  }
}

function flatMap<T, U>(
  xs: readonly T[],
  fn: (value: T, index: number, array: readonly T[]) => U[]
): U[] {
  return Array.prototype.concat(...xs.map(fn));
}
