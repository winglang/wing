import * as reflect from "jsii-reflect";
import { Classes } from "./classes";
import { Constructs } from "./constructs";
import { Enums } from "./enums";
import { Interfaces } from "./interfaces";
import { Structs } from "./structs";
import { HIDDEN_CLASSES, VISIBLE_SUBMODULES } from "./wing-filters";
import { ApiReferenceSchema } from "../schema";
import { Transpile } from "../transpile/transpile";

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

    // TODO WING SDK HACK
    const wingSdkHacks = assembly.name === "@winglang/sdk";
    if (wingSdkHacks) {
      submodules = submodules.filter((s) =>
        VISIBLE_SUBMODULES.includes(s.name)
      );
    }
    if (allSubmodules ?? false) {
      classes = this.sortByName([
        ...assembly.classes,
        ...flatMap(submodules, (submod) => [...submod.classes]),
      ]);
      classes = classes.filter((c) => !HIDDEN_CLASSES.includes(c.name));
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

    this.constructs = new Constructs(transpile, classes);
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
