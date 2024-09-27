import { InflightClient } from "../core/inflight";
import { normalPath } from "../shared/misc";
import { ILiftable } from "./resource";

/**
 * ITypeElement is a representation of a Wing type element.
 */
export interface ITypeElement extends ILiftable {
  /**
   * Get the immediate dependencies of this type element.
   * @returns The immediate dependencies of this type element.
   * @internal
   */
  _getDependencies(): Set<ITypeElement>;

  /**
   * Get the inflight representation of this type element.
   * @returns The inflight representation of this type element.
   * @internal
   */
  _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>];
}

/**
 * Type is a representation of a Wing type.
 *
 * Use the "kind" property to determine what kind of type this is, and use
 * one of the "as" methods to extract more specific information.
 */
export class Type implements ITypeElement {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /** @internal */
  public _toInflight(): string {
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").Type)("${this.kind}", undefined);`;
    const initialization = [];
    const dataVarName = context.get(this.data!);
    if (dataVarName) {
      initialization.push(`${varName}.data = ${dataVarName}`);
    }
    return [declaration, initialization];
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

  /**
   * What kind of type this is.
   */
  public readonly kind: string;
  private readonly data: ITypeElement | undefined;

  private constructor(kind: string, data: ITypeElement | undefined) {
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

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    if (this.data === undefined) {
      return new Set<ITypeElement>();
    }
    return new Set<ITypeElement>([this.data]);
  }
}

/**
 * ClassType is a representation of a Wing class type.
 */
export class ClassType implements ITypeElement {
  /** The name of the class. */
  public readonly name: string;
  /** The fully qualified name of the class. */
  public readonly fqn: string | undefined;
  /** The base class of the class. */
  public readonly base: ClassType | undefined;
  /** The interfaces that the class implements. */
  public readonly interfaces: ClassType[] = [];
  /** The properties of the class. */
  public readonly properties: { [key: string]: Property };
  /** The methods of the class. */
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
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").ClassType)("${this.name}", ${
      this.fqn ? `"${this.fqn}"` : "undefined"
    });`;
    const initialization = [];
    if (this.base) {
      const baseVarName = context.get(this.base)!;
      initialization.push(`${varName}.base = ${baseVarName};`);
    }
    for (const iface of this.interfaces) {
      const ifaceVarName = context.get(iface)!;
      initialization.push(`${varName}.interfaces.push(${ifaceVarName});`);
    }
    for (const prop of Object.values(this.properties)) {
      const propVarName = context.get(prop)!;
      initialization.push(
        `${varName}.properties["${prop.name}"] = ${propVarName};`
      );
    }
    for (const method of Object.values(this.methods)) {
      const methodVarName = context.get(method)!;
      initialization.push(
        `${varName}.methods["${method.name}"] = ${methodVarName};`
      );
    }
    return [declaration, initialization];
  }

  public toString(): string {
    return this.name;
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    const result = new Set<ITypeElement>();
    if (this.base) {
      result.add(this.base);
    }
    for (const iface of this.interfaces) {
      result.add(iface);
    }
    for (const prop of Object.values(this.properties)) {
      result.add(prop);
    }
    for (const method of Object.values(this.methods)) {
      result.add(method);
    }
    return result;
  }
}

/**
 * InterfaceType is a representation of a Wing interface type.
 */
export class InterfaceType implements ITypeElement {
  /** The name of the interface. */
  public readonly name: string;
  /** The fully qualified name of the interface. */
  public readonly fqn: string | undefined;
  /** The interfaces that the interface extends. */
  public readonly bases: InterfaceType[];
  /** The properties of the interface. */
  public readonly properties: { [key: string]: Property };
  /** The methods of the interface. */
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
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").InterfaceType)("${this.name}", ${
      this.fqn ? `"${this.fqn}"` : "undefined"
    });`;
    const initialization = [];
    for (const base of this.bases) {
      const baseVarName = context.get(base)!;
      initialization.push(`${varName}.bases.push(${baseVarName});`);
    }
    for (const prop of Object.values(this.properties)) {
      const propVarName = context.get(prop)!;
      initialization.push(
        `${varName}.properties["${prop.name}"] = ${propVarName};`
      );
    }
    for (const method of Object.values(this.methods)) {
      const methodVarName = context.get(method)!;
      initialization.push(
        `${varName}.methods["${method.name}"] = ${methodVarName};`
      );
    }
    return [declaration, initialization];
  }

  public toString(): string {
    return this.name;
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    const result = new Set<ITypeElement>();
    for (const base of this.bases) {
      result.add(base);
    }
    for (const prop of Object.values(this.properties)) {
      result.add(prop);
    }
    for (const method of Object.values(this.methods)) {
      result.add(method);
    }
    return result;
  }
}

/**
 * StructType is a representation of a Wing struct type.
 */
export class StructType implements ITypeElement {
  /** The name of the struct. */
  public readonly name: string;
  /** The fully qualified name of the struct. */
  public readonly fqn: string | undefined;
  /** The structs that the struct extends. */
  public readonly bases: StructType[];
  /** The fields of the struct. */
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
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").StructType)("${this.name}", ${
      this.fqn ? `"${this.fqn}"` : "undefined"
    });`;
    const initialization = [];
    for (const base of this.bases) {
      const baseVarName = context.get(base)!;
      initialization.push(`${varName}.bases.push(${baseVarName});`);
    }
    for (const field of Object.values(this.fields)) {
      const fieldVarName = context.get(field)!;
      initialization.push(
        `${varName}.fields["${field.name}"] = ${fieldVarName};`
      );
    }
    return [declaration, initialization];
  }

  public toString(): string {
    return this.name;
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    const result = new Set<ITypeElement>();
    for (const base of this.bases) {
      result.add(base);
    }
    for (const field of Object.values(this.fields)) {
      result.add(field);
    }
    return result;
  }
}

/**
 * EnumType is a representation of a Wing enum type.
 */
export class EnumType implements ITypeElement {
  /** The name of the enum. */
  public readonly name: string;
  /** The fully qualified name of the enum. */
  public readonly fqn: string | undefined;
  /** The variants of the enum. */
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
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").EnumType)("${this.name}", ${
      this.fqn ? `"${this.fqn}"` : "undefined"
    });`;
    const initialization = [];
    for (const variant of Object.values(this.variants)) {
      const variantVarName = context.get(variant)!;
      initialization.push(
        `${varName}.variants["${variant.name}"] = ${variantVarName};`
      );
    }
    return [declaration, initialization];
  }

  public toString(): string {
    return this.name;
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    const result = new Set<ITypeElement>();
    for (const variant of Object.values(this.variants)) {
      result.add(variant);
    }
    return result;
  }
}

/**
 * EnumVariant is a representation of a Wing enum variant.
 */
export class EnumVariant implements ITypeElement {
  /** The name of the enum variant. */
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  /** @internal */
  public _toInflight(): string {
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    return [
      `const ${varName} = new (require("${normalPath(
        __filename
      )}").EnumVariant)("${this.name}");`,
      [],
    ];
  }

  public toString(): string {
    return this.name;
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    return new Set<ITypeElement>();
  }
}

/**
 * Property is a representation of a Wing property.
 */
export class Property implements ITypeElement {
  /** The name of the property. */
  public readonly name: string;
  /** The type of the property. */
  public readonly child: Type;

  constructor(name: string, child: Type) {
    this.name = name;
    this.child = child;
  }

  /** @internal */
  public _toInflight(): string {
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").Property)("${this.name}");`;
    const initialization = [];
    const childVarName = context.get(this.child)!;
    initialization.push(`${varName}.child = ${childVarName};`);
    return [declaration, initialization];
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    return new Set<ITypeElement>([this.child]);
  }
}

/**
 * Method is a representation of a Wing method.
 */
export class Method implements ITypeElement {
  /** The name of the method. */
  public readonly name: string;
  /** Whether the method is static. */
  public readonly isStatic: boolean;
  /** The function type of the method. */
  public readonly child: FunctionType;

  constructor(name: string, isStatic: boolean, child: FunctionType) {
    this.name = name;
    this.isStatic = isStatic;
    this.child = child;
  }

  /** @internal */
  public _toInflight(): string {
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").Method)("${this.name}", ${this.isStatic});`;
    const initialization = [];
    const childVarName = context.get(this.child)!;
    initialization.push(`${varName}.child = ${childVarName};`);
    return [declaration, initialization];
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    return new Set<ITypeElement>([this.child]);
  }
}

/**
 * ArrayType is a representation of a Wing array or mutarray type.
 */
export class ArrayType implements ITypeElement {
  /** The type of the elements in the array. */
  public readonly child: Type;
  /** Whether the array is mutable. */
  public readonly isMut: boolean;

  constructor(child: Type, isMut: boolean) {
    this.child = child;
    this.isMut = isMut;
  }

  /** @internal */
  public _toInflight(): string {
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").ArrayType)(undefined, ${this.isMut});`;
    const initialization = [];
    const childVarName = context.get(this.child)!;
    initialization.push(`${varName}.child = ${childVarName};`);
    return [declaration, initialization];
  }

  public toString(): string {
    return `${this.isMut ? "Mut" : ""}Array<${this.child.toString()}>`;
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    return new Set<ITypeElement>([this.child]);
  }
}

/**
 * MapType is a representation of a Wing map or mutmap type.
 */
export class MapType implements ITypeElement {
  /** The type of the elements in the map. */
  public readonly child: Type;
  /** Whether the map is mutable. */
  public readonly isMut: boolean;

  constructor(child: Type, isMut: boolean) {
    this.child = child;
    this.isMut = isMut;
  }

  /** @internal */
  public _toInflight(): string {
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").MapType)(undefined, ${this.isMut});`;
    const initialization = [];
    const childVarName = context.get(this.child)!;
    initialization.push(`${varName}.child = ${childVarName};`);
    return [declaration, initialization];
  }

  public toString(): string {
    return `${this.isMut ? "Mut" : ""}Map<${this.child.toString()}>`;
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    return new Set<ITypeElement>([this.child]);
  }
}

/**
 * SetType is a representation of a Wing set or mutset type.
 */
export class SetType implements ITypeElement {
  /** The type of the elements in the set. */
  public readonly child: Type;
  /** Whether the set is mutable. */
  public readonly isMut: boolean;

  constructor(child: Type, isMut: boolean) {
    this.child = child;
    this.isMut = isMut;
  }

  /** @internal */
  public _toInflight(): string {
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").SetType)(undefined, ${this.isMut});`;
    const initialization = [];
    const childVarName = context.get(this.child)!;
    initialization.push(`${varName}.child = ${childVarName};`);
    return [declaration, initialization];
  }

  public toString(): string {
    return `${this.isMut ? "Mut" : ""}Set<${this.child.toString()}>`;
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    return new Set<ITypeElement>([this.child]);
  }
}

/**
 * OptionalType is a representation of a Wing optional type.
 */
export class OptionalType implements ITypeElement {
  /** The type of the optional. */
  public readonly child: Type;

  constructor(child: Type) {
    this.child = child;
  }

  /** @internal */
  public _toInflight(): string {
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").OptionalType)(undefined);`;
    const initialization = [];
    const childVarName = context.get(this.child)!;
    initialization.push(`${varName}.child = ${childVarName};`);
    return [declaration, initialization];
  }

  public toString(): string {
    return `${this.child.toString()}?`;
  }

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    return new Set<ITypeElement>([this.child]);
  }
}

/**
 * FunctionType is a representation of a Wing function type.
 */
export class FunctionType implements ITypeElement {
  /** The phase of the function. */
  public readonly phase: Phase;
  /** The parameters of the function. */
  public readonly params: Type[];
  /** The return type of the function. */
  public readonly returns: Type;

  constructor(phase: Phase, params: Type[], returns: Type) {
    this.phase = phase;
    this.params = params ?? [];
    this.returns = returns;
  }

  /** @internal */
  public _toInflight(): string {
    return toInflightTypeElement(this);
  }

  /** @internal */
  public _toInflightWithContext(
    context: Map<ITypeElement, string>
  ): [string, Array<string>] {
    const varName = context.get(this)!;
    const declaration = `const ${varName} = new (require("${normalPath(
      __filename
    )}").FunctionType)("${this.phase}", [], undefined);`;
    const initialization = [];
    for (const param of this.params) {
      const paramVarName = context.get(param)!;
      initialization.push(`${varName}.params.push(${paramVarName});`);
    }
    const returnsVarName = context.get(this.returns)!;
    initialization.push(`${varName}.returns = ${returnsVarName};`);
    return [declaration, initialization];
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

  /** @internal */
  public _getDependencies(): Set<ITypeElement> {
    return new Set<ITypeElement>([this.returns, ...this.params]);
  }
}

/**
 * Phase is a representation of a Wing function type phase.
 */
export enum Phase {
  /** Inflight phase. */
  INFLIGHT = "inflight",
  /** Preflight phase. */
  PREFLIGHT = "preflight",
  /** Unphased phase. */
  UNPHASED = "unphased",
}

function toInflightTypeElement(root: ITypeElement): string {
  const context = findAllTypeElements(root);
  const declarations = [];
  const initializations = [];
  for (const element of context.keys()) {
    const [declaration, initialization] =
      element._toInflightWithContext(context);
    declarations.push(declaration);
    initializations.push(...initialization);
  }
  return `(function() {
      ${declarations.concat(initializations).join("\n")}
      return ${context.get(root)};
    })()`;
}

function findAllTypeElements(root: ITypeElement): Map<ITypeElement, string> {
  const result = new Map<ITypeElement, string>();
  const queue: ITypeElement[] = [root];
  let i = 0;
  while (queue.length > 0) {
    const current = queue.shift();
    if (current !== undefined && !result.has(current)) {
      result.set(current, `t${i++}`);
      queue.push(...current._getDependencies());
    }
  }
  return result;
}
