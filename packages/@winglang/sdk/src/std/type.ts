import { InflightClient } from "../core/inflight";
import { normalPath } from "../shared/misc";
import { ILiftable } from "./resource";

/**
 * Type is a representation of a Wing type.
 *
 * Use the "kind" property to determine what kind of type this is, and use
 * one of the "as" methods to extract more specific information.
 */
export class Type implements ILiftable {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /** @internal */
  public _toInflight(): string {
    return `(new (require("${normalPath(__filename)}").Type)("${this.kind}", ${
      this.data?._toInflight() ?? "undefined"
    }))`;
  }

  /** @internal */
  public static _ofClass(cls: ClassType): Type {
    return new Type("class", cls);
  }

  /** @internal */
  public static _ofInterface(iface: InterfaceType): Type {
    return new Type("interface", iface);
  }

  /** @internal */
  public static _ofStruct(s: StructType): Type {
    return new Type("struct", s);
  }

  /** @internal */
  public static _ofEnum(e: EnumType): Type {
    return new Type("enum", e);
  }

  /** @internal */
  public static _ofNum(): Type {
    return new Type("num", undefined);
  }

  /** @internal */
  public static _ofStr(): Type {
    return new Type("str", undefined);
  }

  /** @internal */
  public static _ofDuration(): Type {
    return new Type("duration", undefined);
  }

  /** @internal */
  public static _ofRegex(): Type {
    return new Type("regex", undefined);
  }

  /** @internal */
  public static _ofBytes(): Type {
    return new Type("bytes", undefined);
  }

  /** @internal */
  public static _ofBool(): Type {
    return new Type("bool", undefined);
  }

  /** @internal */
  public static _ofVoid(): Type {
    return new Type("void", undefined);
  }

  /** @internal */
  public static _ofJson(): Type {
    return new Type("json", undefined);
  }

  /** @internal */
  public static _ofMutJson(): Type {
    return new Type("mutjson", undefined);
  }

  /** @internal */
  public static _ofDatetime(): Type {
    return new Type("datetime", undefined);
  }

  /** @internal */
  public static _ofAny(): Type {
    return new Type("any", undefined);
  }

  /** @internal */
  public static _ofOptional(t: Type): Type {
    return new Type("optional", new OptionalType(t));
  }

  /** @internal */
  public static _ofArray(t: Type, isMut: boolean): Type {
    return new Type(isMut ? "mutarray" : "array", new ArrayType(t, isMut));
  }

  /** @internal */
  public static _ofMap(t: Type, isMut: boolean): Type {
    return new Type(isMut ? "mutmap" : "map", new MapType(t, isMut));
  }

  /** @internal */
  public static _ofSet(t: Type, isMut: boolean): Type {
    return new Type(isMut ? "mutset" : "set", new SetType(t, isMut));
  }

  /** @internal */
  public static _ofFunction(f: FunctionType): Type {
    return new Type("function", f);
  }

  public readonly kind: string;
  private readonly data: ILiftable | undefined;

  private constructor(kind: string, data: ILiftable | undefined) {
    this.kind = kind;
    this.data = data;
  }

  /**
   * Get the ClassType if this is a class.
   * @returns The ClassType or undefined if this is not a class.
   */
  public asClass(): ClassType | undefined {
    if (this.kind === "class") {
      return this.data as ClassType;
    }
    return undefined;
  }

  /**
   * Get the InterfaceType if this is an interface.
   * @returns The InterfaceType or undefined if this is not an interface.
   */
  public asInterface(): InterfaceType | undefined {
    if (this.kind === "interface") {
      return this.data as InterfaceType;
    }
    return undefined;
  }

  /**
   * Get the StructType if this is a struct.
   * @returns The StructType or undefined if this is not a struct.
   */
  public asStruct(): StructType | undefined {
    if (this.kind === "struct") {
      return this.data as StructType;
    }
    return undefined;
  }

  /**
   * Get the EnumType if this is an enum.
   * @returns The EnumType or undefined if this is not an enum.
   */
  public asEnum(): EnumType | undefined {
    if (this.kind === "enum") {
      return this.data as EnumType;
    }
    return undefined;
  }

  /**
   * Get the FunctionType if this is a function.
   * @returns The FunctionType or undefined if this is not a function.
   */
  public asFunction(): FunctionType | undefined {
    if (this.kind === "function") {
      return this.data as FunctionType;
    }
    return undefined;
  }

  /**
   * Get the ArrayType if this is an array.
   * @returns The ArrayType or undefined if this is not an array.
   */
  public asArray(): ArrayType | undefined {
    if (this.kind === "array" || this.kind === "mutarray") {
      return this.data as ArrayType;
    }
    return undefined;
  }

  /**
   * Get the MapType if this is a map.
   * @returns The MapType or undefined if this is not a map.
   */
  public asMap(): MapType | undefined {
    if (this.kind === "map" || this.kind === "mutmap") {
      return this.data as MapType;
    }
    return undefined;
  }

  /**
   * Get the SetType if this is a set.
   * @returns The SetType or undefined if this is not a set.
   */
  public asSet(): SetType | undefined {
    if (this.kind === "set" || this.kind === "mutset") {
      return this.data as SetType;
    }
    return undefined;
  }

  /**
   * Get the OptionalType if this is an optional.
   * @returns The OptionalType or undefined if this is not an optional.
   */
  public asOptional(): OptionalType | undefined {
    if (this.kind === "optional") {
      return this.data as OptionalType;
    }
    return undefined;
  }

  /**
   * Get the string representation of this type.
   * @returns The string representation of this type.
   */
  public toString(): string {
    switch (this.kind) {
      case "class":
      case "interface":
      case "struct":
      case "enum":
      case "function":
      case "array":
      case "mutarray":
      case "map":
      case "mutmap":
      case "set":
      case "mutset":
      case "optional":
        return this.data!.toString();
      case "json":
        return "Json";
      case "mutjson":
        return "MutJson";
    }
    return this.kind;
  }
}

/**
 * ClassType is a representation of a Wing class type.
 */
export class ClassType implements ILiftable {
  public readonly name: string;
  public readonly fqn: string | undefined;
  public readonly base: ClassType | undefined;
  public readonly interfaces: ClassType[] = [];
  public readonly properties: { [key: string]: Property };
  public readonly methods: { [key: string]: Method };

  constructor(
    name: string,
    fqn: string | undefined,
    base?: ClassType,
    interfaces: ClassType[] = [],
    properties: { [key: string]: Property } = {},
    methods: { [key: string]: Method } = {}
  ) {
    this.name = name;
    this.fqn = fqn;
    this.base = base;
    this.interfaces = interfaces;
    this.properties = properties;
    this.methods = methods;
  }

  /** @internal */
  public _toInflight(): string {
    const args = [
      `"${this.name}"`,
      `"${this.fqn}"`,
      this.base?._toInflight(),
      arrayToInflight(this.interfaces),
      mapToInflight(this.properties),
      mapToInflight(this.methods),
    ];
    return `(require("${normalPath(__filename)}").ClassType)(${args.join(
      ", "
    )})`;
  }

  public toString(): string {
    return this.name;
  }
}

/**
 * InterfaceType is a representation of a Wing interface type.
 */
export class InterfaceType implements ILiftable {
  public readonly name: string;
  public readonly fqn: string | undefined;
  public readonly bases: InterfaceType[];
  public readonly properties: { [key: string]: Property };
  public readonly methods: { [key: string]: Method };

  constructor(
    name: string,
    fqn: string | undefined,
    bases: InterfaceType[] = [],
    properties: { [key: string]: Property } = {},
    methods: { [key: string]: Method } = {}
  ) {
    this.name = name;
    this.fqn = fqn;
    this.bases = bases;
    this.properties = properties;
    this.methods = methods;
  }

  /** @internal */
  public _toInflight(): string {
    const args = [
      `"${this.name}"`,
      `"${this.fqn}"`,
      arrayToInflight(this.bases),
      mapToInflight(this.properties),
      mapToInflight(this.methods),
    ];
    return `(require("${normalPath(__filename)}").InterfaceType)(${args.join(
      ", "
    )})`;
  }

  public toString(): string {
    return this.name;
  }
}

/**
 * StructType is a representation of a Wing struct type.
 */
export class StructType implements ILiftable {
  public readonly name: string;
  public readonly fqn: string | undefined;
  public readonly bases: StructType[];
  public readonly fields: { [key: string]: Property };

  constructor(
    name: string,
    fqn: string | undefined,
    bases: StructType[] = [],
    fields: { [key: string]: Property } = {}
  ) {
    this.name = name;
    this.fqn = fqn;
    this.bases = bases;
    this.fields = fields;
  }

  /** @internal */
  public _toInflight(): string {
    const args = [
      `"${this.name}"`,
      `"${this.fqn}"`,
      arrayToInflight(this.bases),
      mapToInflight(this.fields),
    ];
    return `(require("${normalPath(__filename)}").StructType)(${args.join(
      ", "
    )})`;
  }
  public toString(): string {
    return this.name;
  }
}

/**
 * EnumType is a representation of a Wing enum type.
 */
export class EnumType implements ILiftable {
  public readonly name: string;
  public readonly fqn: string | undefined;
  public readonly variants: { [key: string]: EnumVariant };

  constructor(
    name: string,
    fqn: string | undefined,
    variants: { [key: string]: EnumVariant } = {}
  ) {
    this.name = name;
    this.fqn = fqn;
    this.variants = variants;
  }

  /** @internal */
  public _toInflight(): string {
    const args = [
      `"${this.name}"`,
      `"${this.fqn}"`,
      mapToInflight(this.variants),
    ];
    return `(require("${normalPath(__filename)}").EnumType)(${args.join(
      ", "
    )})`;
  }

  public toString(): string {
    return this.name;
  }
}

/**
 * EnumVariant is a representation of a Wing enum variant.
 */
export class EnumVariant implements ILiftable {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  /** @internal */
  public _toInflight(): string {
    return `(require("${normalPath(__filename)}").EnumVariant)("${this.name}")`;
  }

  public toString(): string {
    return this.name;
  }
}

/**
 * Property is a representation of a Wing property.
 */
export class Property implements ILiftable {
  public readonly name: string;
  public readonly child: Type;

  constructor(name: string, child: Type) {
    this.name = name;
    this.child = child;
  }

  /** @internal */
  public _toInflight(): string {
    return `(require("${normalPath(__filename)}").Property)("${
      this.name
    }", ${this.child._toInflight()})`;
  }
}

/**
 * Method is a representation of a Wing method.
 */
export class Method implements ILiftable {
  public readonly name: string;
  public readonly isStatic: boolean;
  public readonly child: FunctionType;

  constructor(name: string, isStatic: boolean, child: FunctionType) {
    this.name = name;
    this.isStatic = isStatic;
    this.child = child;
  }

  /** @internal */
  public _toInflight(): string {
    return `(require("${normalPath(__filename)}").Method)("${this.name}", ${
      this.isStatic
    }, ${this.child._toInflight()})`;
  }
}

/**
 * ArrayType is a representation of a Wing array or mutarray type.
 */
export class ArrayType implements ILiftable {
  public readonly child: Type;
  public readonly isMut: boolean;

  constructor(child: Type, isMut: boolean) {
    this.child = child;
    this.isMut = isMut;
  }

  /** @internal */
  public _toInflight(): string {
    return `(require("${normalPath(
      __filename
    )}").ArrayType)(${this.child._toInflight()}, ${this.isMut})`;
  }

  public toString(): string {
    return `${this.isMut ? "Mut" : ""}Array<${this.child.toString()}>`;
  }
}

/**
 * MapType is a representation of a Wing map or mutmap type.
 */
export class MapType implements ILiftable {
  public readonly child: Type;
  public readonly isMut: boolean;

  constructor(child: Type, isMut: boolean) {
    this.child = child;
    this.isMut = isMut;
  }

  /** @internal */
  public _toInflight(): string {
    return `(require("${normalPath(
      __filename
    )}").MapType)(${this.child._toInflight()}, ${this.isMut})`;
  }

  public toString(): string {
    return `${this.isMut ? "Mut" : ""}Map<${this.child.toString()}>`;
  }
}

/**
 * SetType is a representation of a Wing set or mutset type.
 */
export class SetType implements ILiftable {
  public readonly child: Type;
  public readonly isMut: boolean;

  constructor(child: Type, isMut: boolean) {
    this.child = child;
    this.isMut = isMut;
  }

  /** @internal */
  public _toInflight(): string {
    return `(require("${normalPath(
      __filename
    )}").SetType)(${this.child._toInflight()}, ${this.isMut})`;
  }

  public toString(): string {
    return `${this.isMut ? "Mut" : ""}Set<${this.child.toString()}>`;
  }
}

/**
 * OptionalType is a representation of a Wing optional type.
 */
export class OptionalType implements ILiftable {
  public readonly child: Type;

  constructor(child: Type) {
    this.child = child;
  }

  /** @internal */
  public _toInflight(): string {
    return `(require("${normalPath(
      __filename
    )}").OptionalType)(${this.child._toInflight()})`;
  }

  public toString(): string {
    return `${this.child.toString()}?`;
  }
}

/**
 * FunctionType is a representation of a Wing function type.
 */
export class FunctionType implements ILiftable {
  public readonly phase: Phase;
  public readonly params: Type[];
  public readonly returns: Type;

  constructor(phase: Phase, params: Type[], returns: Type) {
    this.phase = phase;
    this.params = params;
    this.returns = returns;
  }

  /** @internal */
  public _toInflight(): string {
    return `(require("${normalPath(__filename)}").FunctionType)("${
      this.phase
    }", ${arrayToInflight(this.params)}, ${this.returns._toInflight()})`;
  }

  public toString(): string {
    let str = "";
    if (this.phase === Phase.INFLIGHT) {
      str += "inflight ";
    } else if (this.phase === Phase.PREFLIGHT) {
      str += "preflight ";
    } else if (this.phase === Phase.UNPHASED) {
      str += "unphased ";
    }
    str += `(${this.params.map((p) => p.toString()).join(", ")})`;
    str += `: ${this.returns.toString()}`;
    return str;
  }
}

/**
 * Phase is a representation of a Wing function type phase.
 */
export enum Phase {
  INFLIGHT = "inflight",
  PREFLIGHT = "preflight",
  UNPHASED = "unphased",
}

function arrayToInflight(arr: ILiftable[]): string {
  return "[" + arr.map((a) => a._toInflight()).join(", ") + "]";
}

function mapToInflight(obj: Record<string, ILiftable>): string {
  return (
    "{" +
    Object.entries(obj)
      .map(([key, value]) => `${key}: ${value._toInflight()}`)
      .join(", ") +
    "}"
  );
}
