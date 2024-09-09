import * as reflect from "jsii-reflect";

export const CURRENT_SCHEMA_VERSION = "0.1";

/**
 * Describes any kind of type. This could be a primitive, a user-defined type
 * (like `Bucket`), or a composition of types (like `Map<string, Bucket>[]`).
 */
export interface TypeSchema {
  /**
   * The language-specific name of the type. May contain "%" placeholder
   * values to indicate references to types defined in the "types" field.
   *
   * @example "string"
   * @example "%"
   * @example "typing.List[%]"
   * @example "Map<%, %>"
   */
  readonly formattingPattern: string;

  /**
   * Types referenced within the "name" field. The order of these corresponds
   * to the order of the %'s in `formattingPattern`.
   */
  readonly types?: (TypeSchema | JsiiEntity)[];
}

/**
 * Describes a single "entity" in the jsii type system. This may be a type,
 * but it could also be a property, method, parameter, enum member, etc.
 */
export interface JsiiEntity extends AssemblyMetadataSchema {
  /**
   * An id that uniquely identifies this type among all entities in the
   * document and is same across languages.
   */
  readonly id: string;

  /**
   * The friendly language-specific name for the entity.
   */
  readonly displayName: string;

  /**
   * The language-specific type FQN.
   */
  readonly fqn: string;
}

/**
 * Describes a property.
 */
export interface PropertySchema extends Usage, Optional, Documentable {
  /**
   * An id that uniquely identifies this property among all entities in
   * the document and is same across languages.
   */
  readonly id: string;

  /**
   * The friendly language-specific name for the property.
   */
  readonly displayName: string;

  /**
   * The language-specific fqn.
   */
  readonly fqn: string;

  /**
   * The type of the property.
   */
  readonly type: TypeSchema;

  /**
   * Whether the property is a constant.
   * @default false
   */
  readonly const?: boolean;
}

/**
 * Describes a parameter.
 */
export interface ParameterSchema extends Optional, Documentable {
  /**
   * An id that uniquely identifies this parameter among all entities in
   * the document and is same across languages.
   */
  readonly id: string;

  /**
   * The friendly language-specific name for the parameter.
   */
  readonly displayName: string;

  /**
   * The language-specific fqn.
   */
  readonly fqn: string;

  /**
   * The type of the parameter.
   */
  readonly type: TypeSchema;
}

/**
 * Common properties of a callable.
 */
export interface CallableSchema extends Usage {
  /**
   * An id that uniquely identifies this callable among all entities in
   * the document and is same across languages.
   */
  readonly id: string;

  /**
   * The friendly language-specific name for the callable.
   */
  readonly displayName: string;

  /**
   * The language-specific fqn.
   */
  readonly fqn: string;

  /**
   * Parameters of the callable.
   */
  readonly parameters: ParameterSchema[];
}

/**
 * Describes a constructor.
 */
export interface InitializerSchema extends CallableSchema {}

/**
 * Describes a method.
 */
export interface MethodSchema extends CallableSchema, Documentable {}

/**
 * Describes a class.
 */
export interface ClassSchema extends Documentable {
  /**
   * An id that uniquely identifies this class among all entities in
   * the document and is same across languages.
   */
  readonly id: string;

  /**
   * The friendly language-specific name for the class.
   */
  readonly displayName: string;

  /**
   * The language-specific fqn.
   */
  readonly fqn: string;

  /**
   * Interfaces this class implements.
   */
  readonly interfaces: JsiiEntity[];

  /**
   * Class initializer.
   */
  readonly initializer?: InitializerSchema;

  /**
   * Instance methods.
   */
  readonly instanceMethods: MethodSchema[];

  /**
   * Static methods.
   */
  readonly staticMethods: MethodSchema[];

  /**
   * Properties.
   */
  readonly properties: PropertySchema[];

  /**
   * Constants.
   */
  readonly constants: PropertySchema[];

  /**
   * inflight interface.
   */
  readonly inflight?: InterfaceSchema;
}

/**
 * Describes a construct.
 */
export interface ConstructSchema extends ClassSchema {}

/**
 * Describes a struct.
 */
export interface StructSchema extends Usage, Documentable {
  /**
   * An id that uniquely identifies this struct among all entities in
   * the document and is same across languages.
   */
  readonly id: string;

  /**
   * The friendly language-specific name for the struct.
   */
  readonly displayName: string;

  /**
   * The language-specific fqn.
   */
  readonly fqn: string;

  /**
   * Properties.
   */
  readonly properties: PropertySchema[];
}

/**
 * Describes a behavioral interface, also sometimes known as a protocol.
 */
export interface InterfaceSchema extends Documentable {
  /**
   * An id that uniquely identifies this interface among all entities in
   * the document and is same across languages.
   */
  readonly id: string;

  /**
   * The friendly language-specific name for the interface.
   */
  readonly displayName: string;

  /**
   * The language-specific fqn.
   */
  readonly fqn: string;

  /**
   * Interfaces that this interface extends.
   */
  readonly interfaces: JsiiEntity[];

  /**
   * Types implementing this interface.
   */
  readonly implementations: JsiiEntity[];

  /**
   * Methods.
   */
  readonly instanceMethods: MethodSchema[];

  /**
   * Properties.
   */
  readonly properties: PropertySchema[];
}

/**
 * Describes an enum member.
 */
export interface EnumMemberSchema extends Documentable {
  /**
   * An id that uniquely identifies this enum member among all entities in
   * the document and is same across languages.
   */
  readonly id: string;

  /**
   * The friendly language-specific name for the enum member.
   */
  readonly displayName: string;

  /**
   * The language-specific fqn.
   */
  readonly fqn: string;
}

/**
 * Describes an enum.
 */
export interface EnumSchema extends Documentable {
  /**
   * An id that uniquely identifies this enum among all entities in
   * the document and is same across languages.
   */
  readonly id: string;

  /**
   * The friendly language-specific name for the enum.
   */
  readonly displayName: string;

  /**
   * The language-specific fqn.
   */
  readonly fqn: string;

  /**
   * Enum members.
   */
  readonly members: EnumMemberSchema[];
}

/**
 * Describes the API Reference.
 */
export interface ApiReferenceSchema {
  /**
   * Constructs.
   */
  readonly constructs: ConstructSchema[];

  /**
   * Classes.
   */
  readonly classes: ClassSchema[];

  /**
   * Structs.
   */
  readonly structs: StructSchema[];

  /**
   * Interfaces.
   */
  readonly interfaces: InterfaceSchema[];

  /**
   * Enums.
   */
  readonly enums: EnumSchema[];
}

/**
 * Metadata about a particular jsii assembly.
 */
export interface AssemblyMetadataSchema {
  /**
   * Name of the jsii assembly/package.
   */
  readonly packageName: string;

  /**
   * Version of the jsii assembly/package.
   */
  readonly packageVersion: string;

  /**
   * Language-independent name of the jsii submodule.
   * if undefined, it is implicitly the root module.
   *
   * @example `aws_sqs`
   */
  readonly submodule?: string;
}

/**
 * Describes the top-level schema.
 */
export interface Schema {
  /**
   * Schema version number.
   */
  readonly version: string;

  /**
   * Language that the documentation has been transliterated to.
   */
  readonly language: string;

  /**
   * Whether this document represents documentation for all submodules
   * (including the root).
   *
   * @default false
   */
  readonly allSubmodules?: boolean;

  /**
   * Assembly metadata.
   */
  readonly metadata: AssemblyMetadataSchema;

  /**
   * Readme.
   */
  readonly readme?: string;

  /**
   * API Reference.
   */
  readonly apiReference?: ApiReferenceSchema;
}

//
// SHARED INTERFACES
//

/**
 * An entity that can have a doc string.
 */
export interface Documentable {
  /**
   * Doc string.
   */
  readonly docs: DocsSchema;
}

/**
 * Docstring information.
 *
 * @see jsii.Docs
 */
export interface DocsSchema {
  /**
   * Summary documentation for an API item.
   *
   * The first part of the documentation before hitting a `@remarks` tags, or
   * the first line of the doc comment block if there is no `@remarks` tag.
   */
  readonly summary?: string;

  /**
   * Detailed information about an API item.
   *
   * Either the explicitly tagged `@remarks` section, otherwise everything
   * past the first paragraph if there is no `@remarks` tag.
   */
  readonly remarks?: string;

  /**
   * `@see` and `@link` links with more information.
   */
  readonly links?: string[];

  /**
   * Code snippet showing example usage of an API item, that has been provided
   * by the construct library authors.
   */
  readonly example?: string;

  /**
   * Whether or not it is deprecated.
   */
  readonly deprecated?: boolean;

  /**
   * Deprecation reason (if applicable).
   */
  readonly deprecationReason?: string;

  /**
   * Inflight client
   */
  readonly inflight?: string;

  /**
   * Skipping documentation
   */
  readonly skipDocs?: boolean;

  /**
   * Showing the wingType instead of the written type
   */
  readonly wingType?: string;
}

/**
 * An entity that may include a code snippet showing how to use it.
 */
export interface Usage {
  /**
   * Code snippet.
   * @default - none
   */
  readonly usage?: string;
}

/**
 * An entity that may be optional.
 */
export interface Optional {
  /**
   * Whether or not it is optional.
   * @default false
   */
  readonly optional?: boolean;

  /**
   * The default value, if applicable.
   * @default - none
   */
  readonly default?: string;
}

export function extractDocs(docs: reflect.Docs): DocsSchema {
  const links = [];
  const see = docs.docs.see; // @see
  if (see && see.length > 0) {
    links.push(see);
  }
  const link = docs.customTag("link"); // @link
  if (link && link.length > 0) {
    links.push(link);
  }
  return filterUndefined({
    // ignore defaults and empty strings to save space
    summary: docs.summary.length > 0 ? docs.summary : undefined,
    remarks: docs.remarks.length > 0 ? docs.remarks : undefined,
    example: docs.example.length > 0 ? docs.example : undefined,
    links: links.length > 0 ? links : undefined,
    deprecated: docs.deprecated === true ? true : undefined,
    deprecationReason: docs.deprecationReason,
    skipDocs: docs.customTag("skipDocs") === "true" ? true : undefined,
    inflight: docs.customTag("inflight"),
  });
}

export function isInflightMethod(docs: reflect.Docs): boolean {
  return docs.customTag("inflight") === "true";
}

export function isSkipped(docs: reflect.Docs): boolean {
  return docs.customTag("skipDocs") === "true";
}

export function getWingType(docs: reflect.Docs): string | undefined {
  return docs.customTag("wingType");
}

export function getInflight(docs: reflect.Docs): string | undefined {
  return docs.customTag("inflight");
}

/**
 * Generates the name of the submodule.
 */
export function submodulePath(module?: reflect.Submodule): string | undefined {
  if (!module) return undefined;
  const path = module.fqn.split(".").splice(1).join(".");
  return path.length > 0 ? path : undefined;
}

export function filterUndefined<T extends object>(obj: T): T {
  const ret: any = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) {
      ret[k] = v;
    }
  }
  return ret;
}
