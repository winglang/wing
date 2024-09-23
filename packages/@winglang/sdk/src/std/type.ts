import { InflightClient } from "../core/inflight";

/**
 * Type is a representation of a Wing type.
 *
 * Use the "kind" property to determine what kind of type this is, and use
 * one of the "as" methods to extract more specific information.
 */
export class Type {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
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
  private readonly data: any;

  private constructor(kind: string, data: any) {
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
        return this.data.toString();
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
export class ClassType {
  public readonly name: string;
  public readonly fqn: string | undefined;
  public readonly base: ClassType | undefined;
  public readonly interfaces: ClassType[];
  public readonly properties: { [key: string]: Property };
  public readonly methods: { [key: string]: Method };

  constructor(
    name: string,
    fqn: string,
    base: ClassType | undefined,
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

  public toString(): string {
    return this.name;
  }
}

/**
 * InterfaceType is a representation of a Wing interface type.
 */
export class InterfaceType {
  public readonly name: string;
  public readonly fqn: string;
  public readonly bases: InterfaceType[];
  public readonly properties: { [key: string]: Property };
  public readonly methods: { [key: string]: Method };

  constructor(
    name: string,
    fqn: string,
    bases: InterfaceType[],
    properties: { [key: string]: Property } = {},
    methods: { [key: string]: Method } = {}
  ) {
    this.name = name;
    this.fqn = fqn;
    this.bases = bases;
    this.properties = properties;
    this.methods = methods;
  }

  public toString(): string {
    return this.name;
  }
}

/**
 * StructType is a representation of a Wing struct type.
 */
export class StructType {
  public readonly name: string;
  public readonly fqn: string;
  public readonly bases: StructType | undefined;
  public readonly fields: { [key: string]: Property };
  public readonly methods: { [key: string]: Method };

  constructor(
    name: string,
    fqn: string,
    bases: StructType | undefined,
    fields: { [key: string]: Property } = {},
    methods: { [key: string]: Method } = {}
  ) {
    this.name = name;
    this.fqn = fqn;
    this.bases = bases;
    this.fields = fields;
    this.methods = methods;
  }

  public toString(): string {
    return this.name;
  }
}

/**
 * EnumType is a representation of a Wing enum type.
 */
export class EnumType {
  public readonly name: string;
  public readonly fqn: string;
  public readonly variants: { [key: string]: string };

  constructor(name: string, fqn: string, variants: { [key: string]: string }) {
    this.name = name;
    this.fqn = fqn;
    this.variants = variants;
  }

  public toString(): string {
    return this.name;
  }
}

/**
 * Property is a representation of a Wing property.
 */
export class Property {
  public readonly name: string;
  public readonly child: Type;

  constructor(name: string, child: Type) {
    this.name = name;
    this.child = child;
  }
}

/**
 * Method is a representation of a Wing method.
 */
export class Method {
  public readonly name: string;
  public readonly child: Type;

  constructor(name: string, child: Type) {
    this.name = name;
    this.child = child;
  }
}

/**
 * ArrayType is a representation of a Wing array or mutarray type.
 */
export class ArrayType {
  public readonly child: Type;
  public readonly isMut: boolean;

  constructor(child: Type, isMut: boolean) {
    this.child = child;
    this.isMut = isMut;
  }

  public toString(): string {
    return `${this.isMut ? "Mut" : ""}Array<${this.child.toString()}>`;
  }
}

/**
 * MapType is a representation of a Wing map or mutmap type.
 */
export class MapType {
  public readonly child: Type;
  public readonly isMut: boolean;

  constructor(child: Type, isMut: boolean) {
    this.child = child;
    this.isMut = isMut;
  }

  public toString(): string {
    return `${this.isMut ? "Mut" : ""}Map<${this.child.toString()}>`;
  }
}

/**
 * SetType is a representation of a Wing set or mutset type.
 */
export class SetType {
  public readonly child: Type;
  public readonly isMut: boolean;

  constructor(child: Type, isMut: boolean) {
    this.child = child;
    this.isMut = isMut;
  }

  public toString(): string {
    return `${this.isMut ? "Mut" : ""}Set<${this.child.toString()}>`;
  }
}

/**
 * OptionalType is a representation of a Wing optional type.
 */
export class OptionalType {
  public readonly child: Type;

  constructor(child: Type) {
    this.child = child;
  }

  public toString(): string {
    return `${this.child.toString()}?`;
  }
}

/**
 * FunctionType is a representation of a Wing function type.
 */
export class FunctionType {
  public readonly phase: Phase;
  public readonly params: Type[];
  public readonly returns: Type;

  constructor(phase: Phase, params: Type[], returns: Type) {
    this.phase = phase;
    this.params = params;
    this.returns = returns;
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
