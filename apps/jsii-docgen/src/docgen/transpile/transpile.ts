import * as reflect from "jsii-reflect";
import { filterUndefined, JsiiEntity, TypeSchema } from "../schema";

/**
 * Supported languages to generate documentation in.
 */
export class Language {
  /**
   * TypeScript.
   */
  public static readonly TYPESCRIPT = new Language({
    name: "typescript",
    validator: () => true,
  });

  /**
   * Python.
   */
  public static readonly PYTHON = new Language({
    name: "python",
    validator: validatePythonConfig,
  });

  /**
   * Java.
   */
  public static readonly JAVA = new Language({
    name: "java",
    validator: validateJavaConfig,
  });

  /**
   * C#
   */
  public static readonly CSHARP = new Language({
    name: "csharp",
    targetName: "dotnet",
    validator: validateDotNetConfig,
  });

  /**
   *
   * Go
   */
  public static readonly GO = new Language({
    name: "go",
    targetName: "go",
    validator: validateGoConfig,
  });

  /**
   *
   * Wing
   */
  public static readonly WING = new Language({
    name: "wing",
    targetName: "wing",
    validator: validateWingConfig,
  });

  /**
   * Transform a literal string to the `Language` object.
   *
   * Throws an `UnsupportedLanguageError` if the language is not supported.
   */
  public static fromString(lang: string) {
    switch (lang) {
      case Language.TYPESCRIPT.name:
      case Language.TYPESCRIPT.targetName:
        return Language.TYPESCRIPT;
      case Language.PYTHON.name:
      case Language.PYTHON.targetName:
        return Language.PYTHON;
      case Language.JAVA.name:
      case Language.JAVA.targetName:
        return Language.JAVA;
      case Language.CSHARP.name:
      case Language.CSHARP.targetName:
        return Language.CSHARP;
      case Language.GO.name:
      case Language.GO.targetName:
        return Language.GO;
      case Language.WING.name:
      case Language.WING.targetName:
        return Language.WING;
      default:
        throw new UnsupportedLanguageError(lang, Language.values());
    }
  }

  public static values() {
    return [
      Language.TYPESCRIPT,
      Language.PYTHON,
      Language.JAVA,
      Language.CSHARP,
      Language.GO,
      Language.WING,
    ];
  }

  public readonly name: string;
  public readonly targetName: string;
  private readonly validator: (config: Record<string, unknown>) => boolean;

  private constructor({
    name,
    targetName = name,
    validator,
  }: {
    name: string;
    targetName?: string;
    validator: (config: Record<string, unknown>) => boolean;
  }) {
    this.name = name;
    this.targetName = targetName;
    this.validator = validator;
  }

  public isValidConfiguration(
    config: Record<string, unknown> | undefined
  ): boolean {
    // TypeScript does not need configuration, all other languages do
    if (config == null) {
      // TODO WING HACK
      // allow wing to ignore config
      return this === Language.TYPESCRIPT || this === Language.WING;
    }

    return this.validator(config);
  }

  public toString() {
    return this.name;
  }
}

function validateDotNetConfig(config: Record<string, any>): boolean {
  // See: https://aws.github.io/jsii/user-guides/lib-author/configuration/targets/dotnet/
  return (
    typeof config.namespace === "string" && typeof config.packageId === "string"
  );
}

function validateJavaConfig(config: Record<string, any>): boolean {
  // See: https://aws.github.io/jsii/user-guides/lib-author/configuration/targets/java/
  return (
    typeof config.package === "string" &&
    typeof config.maven?.groupId === "string" &&
    typeof config.maven?.artifactId === "string"
  );
}

function validatePythonConfig(config: Record<string, any>): boolean {
  // See: https://aws.github.io/jsii/user-guides/lib-author/configuration/targets/python/
  return (
    typeof config.module === "string" && typeof config.distName === "string"
  );
}

function validateGoConfig(config: Record<string, any>): boolean {
  // See: https://aws.github.io/jsii/user-guides/lib-author/configuration/targets/go/
  return typeof config.moduleName === "string";
}

function validateWingConfig(_config: Record<string, any>): boolean {
  // TODO WING HACK
  return true;
}

export class UnsupportedLanguageError extends Error {
  constructor(lang: string, supported: Language[]) {
    super(
      `Unsupported language: ${lang}. Supported languages are: [${supported}]`
    );
  }
}

/**
 * Outcome of transpiling a jsii struct.
 */
export interface TranspiledStruct {
  /**
   * The (transpiled) type.
   */
  readonly type: TranspiledType;
  /**
   * The name.
   */
  readonly name: string;
  /**
   * The import statement needed in order to use this struct.
   */
  readonly import: string;
  /**
   * How to initialize this struct.
   */
  readonly initialization: string;
}

/**
 * Outcome of transpiling a jsii class.
 */
export interface TranspiledClass {
  /**
   * The (transpiled) type.
   */
  readonly type: TranspiledType;
  /**
   * The name.
   */
  readonly name: string;
}

/**
 * Outcome of transpiling a jsii callable.
 */
export interface TranspiledCallable {
  /**
   * The (transpiled) parent type.
   */
  readonly parentType: TranspiledType;
  /**
   * How a signature of the callable looks like. In some languages
   * (like Java), a callable may be transliterated to multiple overloaded
   * methods, so there may be multiple signatures
   */
  readonly signatures: string[];
  /**
   * The name.
   */
  readonly name: string;
  /**
   * The import statement needed in order to use this callable.
   */
  readonly import: string;
  /**
   * How a invocations of this callable look like. In some languages
   * (like Java), a callable may be transliterated to multiple overloaded
   * methods, so there may be multiple invocations.
   */
  readonly invocations: string[];
  /**
   * The jsii parameters this callable accepts.
   */
  readonly parameters: reflect.Parameter[];
  /**
   * The (transpiled) return type - this is undefined if void or initializer.
   */
  readonly returnType?: TranspiledTypeReference;
}

/**
 * Outcome of transpiling a jsii parameter.
 */
export interface TranspiledParameter {
  /**
   * The name.
   */
  readonly name: string;
  /**
   * The (transpiled) parent type.
   */
  readonly parentType: TranspiledType;
  /**
   * The (transpiled) type reference.
   */
  readonly typeReference: TranspiledTypeReference;
  /**
   * Whether or not the parameter is optional.
   */
  readonly optional: boolean;
  /**
   * The signature of the property, or its getter if the language
   * supports that.
   */
  readonly declaration: string;

  /**
   * Is the parameter variadic
   */
  readonly variadic?: boolean;
}

/**
 * Outcome of transpiling a jsii interface (not data type).
 */
export interface TranspiledInterface {
  /**
   * The (transpiled) type.
   */
  readonly type: TranspiledType;
  /**
   * The name.
   */
  readonly name: string;
}

/**
 * Outcome of transpiling a generic jsii type.
 */
export class TranspiledType {
  /**
   * The source type this was transliterated from.
   */
  public readonly source: reflect.Type;

  /**
   * The transliteration language.
   */
  public readonly language: Language;

  /**
   * The language specific fqn.
   */
  public readonly fqn: string;
  /**
   * Simple name of the type.
   */
  public readonly name: string;
  /**
   * Namespace of the type.
   */
  public readonly namespace?: string;
  /**
   * The language specific module name the type belongs to.
   */
  public readonly module: string;
  /**
   * The language specific submodule name the type belongs to.
   */
  public readonly submodule?: string;
  /**
   * The language-independent name of the submodule the type belongs to.
   */
  public readonly submodulePath?: string;

  public constructor(options: {
    source: reflect.Type;
    language: Language;
    fqn: string;
    name: string;
    namespace?: string;
    module: string;
    submodule?: string;
    submodulePath?: string;
  }) {
    this.source = options.source;
    this.language = options.language;
    this.fqn = options.fqn;
    this.name = options.name;
    this.namespace = options.namespace;
    this.module = options.module;
    this.submodule = options.submodule;
    this.submodulePath = options.submodulePath;
  }

  toJson(): JsiiEntity {
    return filterUndefined({
      fqn: this.fqn,
      displayName: this.name,
      id: this.source.fqn,
      packageName: this.source.assembly.name,
      packageVersion: this.source.assembly.version,
      submodule: this.submodulePath,
    });
  }
}

/**
 * Options for how to render a string representation of a type reference.
 */
export interface TranspiledTypeReferenceToStringOptions {
  /**
   * Type formatter.
   */
  typeFormatter?: (type: TranspiledType) => string;
  /**
   * String formatter.
   */
  stringFormatter?: (typeName: string) => string;
}

/**
 * Outcome of transpiling a jsii type reference.
 */
export class TranspiledTypeReference {
  /**
   * Create a type reference that reprensents a primitive.
   */
  public static primitive(
    transpile: Transpile,
    ref: reflect.TypeReference,
    primitive: string
  ): TranspiledTypeReference {
    return new TranspiledTypeReference(transpile, ref, primitive);
  }
  /**
   * Create a type reference that represents any type.
   */
  public static any(
    transpile: Transpile,
    ref: reflect.TypeReference
  ): TranspiledTypeReference {
    return new TranspiledTypeReference(transpile, ref, undefined, true);
  }
  /**
   * Create a type reference that represents the void (return) type.
   */
  public static void(
    transpile: Transpile,
    ref: reflect.TypeReference
  ): TranspiledTypeReference {
    return new TranspiledTypeReference(
      transpile,
      ref,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    );
  }
  /**
   * Create a type reference that reprenets a concrete type.
   */
  public static type(
    transpile: Transpile,
    ref: reflect.TypeReference,
    type: TranspiledType
  ): TranspiledTypeReference {
    return new TranspiledTypeReference(
      transpile,
      ref,
      undefined,
      undefined,
      type
    );
  }
  /**
   * Create a type reference that reprenets an array of a type reference.
   */
  public static arrayOfType(
    transpile: Transpile,
    ref: reflect.TypeReference,
    tf: TranspiledTypeReference
  ): TranspiledTypeReference {
    return new TranspiledTypeReference(
      transpile,
      ref,
      undefined,
      undefined,
      undefined,
      tf
    );
  }
  /**
   * Create a type reference that represents a map of a type reference.
   */
  public static mapOfType(
    transpile: Transpile,
    ref: reflect.TypeReference,
    tf: TranspiledTypeReference
  ): TranspiledTypeReference {
    return new TranspiledTypeReference(
      transpile,
      ref,
      undefined,
      undefined,
      undefined,
      undefined,
      tf
    );
  }
  /**
   * Create a type reference that represents a union of a type references.
   */
  public static unionOfTypes(
    transpile: Transpile,
    ref: reflect.TypeReference,
    tfs: TranspiledTypeReference[]
  ): TranspiledTypeReference {
    return new TranspiledTypeReference(
      transpile,
      ref,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      tfs
    );
  }

  private constructor(
    /**
     * A transpiler
     */
    private readonly transpile: Transpile,
    /**
     * The original type reference.
     */
    private readonly ref: reflect.TypeReference,
    /**
     * Primitive type ref.
     */
    private readonly primitive?: string,
    /**
     * 'Any' type ref
     */
    private readonly isAny?: boolean,
    /**
     * Concrete type.
     */
    private readonly type?: TranspiledType,
    /**
     * Array of ref.
     */
    private readonly arrayOfType?: TranspiledTypeReference,
    /**
     * Map of ref.
     */
    private readonly mapOfType?: TranspiledTypeReference,
    /**
     * Union of ref.
     */
    private readonly unionOfTypes?: TranspiledTypeReference[],
    /**
     * 'Void' type ref.
     */
    private readonly isVoid?: boolean
  ) {}

  public toString(options?: TranspiledTypeReferenceToStringOptions): string {
    const tFormatter = options?.typeFormatter ?? ((t) => t.fqn);
    const sFormatter = options?.stringFormatter ?? ((s) => s);
    if (this.primitive) {
      return sFormatter(this.primitive);
    }
    if (this.type) {
      return tFormatter(this.type);
    }
    if (this.isAny) {
      return sFormatter(this.transpile.any());
    }
    if (this.arrayOfType) {
      const ref = this.arrayOfType.toString(options);
      return this.transpile.listOf(ref);
    }
    if (this.mapOfType) {
      const ref = this.mapOfType.toString(options);
      return this.transpile.mapOf(ref);
    }
    if (this.unionOfTypes) {
      const refs = this.unionOfTypes.map((t) => t.toString(options));
      return this.transpile.unionOf(refs);
    }
    if (this.isVoid) {
      return sFormatter(this.transpile.void());
    }
    throw new Error(`Invalid type reference: ${this.ref.toString()}`);
  }

  public toJson(): TypeSchema {
    if (this.primitive) {
      return {
        formattingPattern: this.primitive,
      };
    }

    if (this.type) {
      if (!this.ref.fqn) {
        throw new Error(
          `Original type reference for ${this.type.fqn} does not have a fqn.`
        );
      }

      // If we are running in a test, report a fake stable version since types
      // may belong to dependency packages, which could be specified with caret
      // dependencies - this means the packageVersion of a type like
      // `construct.Construct` will be set to whichever version is installed.
      // This is okay in practice, but makes snapshot tests inconsistent.
      const IS_TEST_RUN = process.env.NODE_ENV === "test";
      const packageVersion = IS_TEST_RUN
        ? "99.99.99"
        : this.type.source.assembly.version;

      return {
        formattingPattern: "%",
        types: [
          filterUndefined({
            id: this.ref.fqn,
            displayName: this.type.name,
            fqn: this.type.fqn,
            packageName: this.type.source.assembly.name,
            packageVersion,
            submodule: this.type.submodulePath,
          }),
        ],
      };
    }

    if (this.isAny) {
      return {
        formattingPattern: this.transpile.any(),
      };
    }

    if (this.arrayOfType) {
      return {
        formattingPattern: this.transpile.listOf("%"),
        types: [this.arrayOfType.toJson()],
      };
    }
    if (this.mapOfType) {
      return {
        formattingPattern: this.transpile.mapOf("%"),
        types: [this.mapOfType.toJson()],
      };
    }
    if (this.unionOfTypes) {
      const inner = Array(this.unionOfTypes.length).fill("%");
      return {
        formattingPattern: this.transpile.unionOf(inner),
        types: this.unionOfTypes.map((t) => t.toJson()),
      };
    }

    throw new Error(`Invalid type reference: ${this.ref.toString()}`);
  }
}

/**
 * Outcome of transpiling a jsii property.
 */
export type TranspiledProperty = TranspiledParameter;

/**
 * Outcome of transpiling a jsii enum.
 */
export interface TranspiledEnum {
  /**
   * The language specific fqn.
   */
  readonly fqn: string;
  /**
   * The name.
   */
  readonly name: string;
}

/**
 * Outcome of transpiling a specific enum member.
 */
export interface TranspiledEnumMember {
  /**
   * The language specific fqn.
   */
  readonly fqn: string;
  /**
   * The name.
   */
  readonly name: string;
}

/**
 * Outcome of transpiling a module like object. (Assembly | Submodule)
 */
export interface TranspiledModuleLike {
  /**
   * The language specific module name.
   *
   * In case the module like object is a submodule, this should contain
   * only the root module name.
   *
   * In case the module like object is the root module, this should contain
   * the module fqn.
   *
   * Examples:
   *
   *   `aws-cdk-lib` -> `aws_cdk`
   *   `aws-cdk-lib.aws_eks` -> `aws_cdk`
   *   `@aws-cdk/aws-eks` -> `aws_cdk.aws_eks`
   */
  readonly name: string;
  /**
   * The language specific submodule name.
   *
   * In case the module like object is a submodule, this should contain
   * only the submodule name.
   *
   * In case the module like object is the root module, this should be undefined
   *
   * Examples:
   *
   *   `aws-cdk-lib` -> undefined
   *   `aws-cdk-lib.aws_eks` -> `aws_eks`
   *   `@aws-cdk/aws-eks` -> undefined
   */
  readonly submodule?: string;
}

/**
 * Language transpiling for jsii types.
 */
export interface Transpile {
  /**
   * The language of the transpiler.
   */
  readonly language: Language;

  /**
   * How links to types should be formatted.
   *
   * @default '#{fqn}'
   */
  readonly linkFormatter?: (type: TranspiledType) => string;

  /**
   * Transpile a module like object (Assembly | Submodule)
   */
  moduleLike(moduleLike: reflect.ModuleLike): TranspiledModuleLike;

  /**
   * Transpile a callable (method, static function, initializer).
   * In some languages such as Java, a single callable may generate multiple
   * overloaded methods to support optional parameters.
   */
  callable(callable: reflect.Callable): TranspiledCallable;

  /**
   * Transpile a class.
   */
  class(klass: reflect.ClassType): TranspiledClass;

  /**
   * Transpile a struct (data type interface).
   */
  struct(struct: reflect.InterfaceType): TranspiledStruct;

  /**
   * Transpile an interface (non data type).
   */
  interface(iface: reflect.InterfaceType): TranspiledInterface;

  /**
   * Transpile a parameter.
   */
  parameter(parameter: reflect.Parameter): TranspiledParameter;

  /**
   * Transpile a property.
   */
  property(property: reflect.Property): TranspiledProperty;

  /**
   * Transpile an enum.
   */
  enum(enu: reflect.EnumType): TranspiledEnum;

  /**
   * Transpile an enum member.
   */
  enumMember(em: reflect.EnumMember): TranspiledEnumMember;

  /**
   * Transpile a type.
   */
  type(type: reflect.Type): TranspiledType;

  /**
   * Transpile (recursively) a type reference.
   */
  typeReference(typeReference: reflect.TypeReference): TranspiledTypeReference;

  /**
   * How a union looks like in the target language.
   */
  unionOf(types: string[]): string;

  /**
   * How a list looks like in the target language.
   */
  listOf(type: string): string;

  /**
   * How a map looks like in the target language.
   */
  mapOf(type: string): string;

  /**
   * How the 'any' type is represented in the target language.
   */
  any(): string;

  /**
   * How the 'void' (return) type is represented in the target language.
   */
  void(): string;

  /**
   * How the 'string' type is represented in the target language.
   */
  str(): string;

  /**
   * How the 'number' type is represented in the target language.
   */
  number(): string;

  /**
   * How the 'boolean' type is represented in the target language.
   */
  boolean(): string;

  /**
   * How the 'json' type is represented in the target language.
   */
  json(): string;

  /**
   * How the 'date' type is represented in the target language.
   */
  date(): string;

  /**
   * How a readme is displayed in the target language.
   */
  readme(readme: string): string;
}

// interface merging so we don't have to implement these methods
// in the abstract class.
export interface TranspileBase extends Transpile {}

/**
 * Common functionality between different transpilers.
 */
export abstract class TranspileBase implements Transpile {
  private readonly parentModulesCache = new Map<string, reflect.Assembly>();
  private readonly submodulesCache = new Map<
    string,
    reflect.Submodule | undefined
  >();

  constructor(public readonly language: Language) {}

  public typeReference(ref: reflect.TypeReference): TranspiledTypeReference {
    if (ref.type) {
      const transpiled = this.type(ref.type);
      return TranspiledTypeReference.type(this, ref, transpiled);
    }

    if (ref.unionOfTypes) {
      const transpiled = ref.unionOfTypes.map((t) => this.typeReference(t));
      return TranspiledTypeReference.unionOfTypes(this, ref, transpiled);
    }

    if (ref.arrayOfType) {
      const transpiled = this.typeReference(ref.arrayOfType);
      return TranspiledTypeReference.arrayOfType(this, ref, transpiled);
    }

    if (ref.mapOfType) {
      const transpiled = this.typeReference(ref.mapOfType);
      return TranspiledTypeReference.mapOfType(this, ref, transpiled);
    }

    if (ref.isAny) {
      return TranspiledTypeReference.any(this, ref);
    }

    if (ref.primitive) {
      let transpiled;
      switch (ref.primitive) {
        case "string":
          transpiled = this.str();
          break;
        case "boolean":
          transpiled = this.boolean();
          break;
        case "number":
          transpiled = this.number();
          break;
        case "date":
          transpiled = this.date();
          break;
        case "json":
          transpiled = this.json();
          break;
        default:
          throw new Error(`Unsupported primitive type '${ref.primitive}'`);
      }
      return TranspiledTypeReference.primitive(this, ref, transpiled);
    }

    if (ref.void) {
      return TranspiledTypeReference.void(this, ref);
    }

    throw new Error(`Unsupported type: ${ref.toString()}`);
  }

  protected findSubmodule(type: reflect.Type): reflect.Submodule | undefined {
    if (this.submodulesCache.has(type.fqn)) {
      return this.submodulesCache.get(type.fqn);
    }

    let submodule = undefined;
    if (type.namespace) {
      // if the type is in a submodule, the submodule name is the first
      // part of the namespace. we construct the full submodule fqn and search for it.
      const submoduleFqn = `${type.assembly.name}.${
        type.namespace.split(".")[0]
      }`;
      const submodules = type.assembly.submodules.filter(
        (s) => s.fqn === submoduleFqn
      );

      if (submodules.length > 1) {
        // can never happen, but the array data structure forces this handling.
        throw new Error(`Found multiple submodulues with fqn ${submoduleFqn}`);
      }

      if (submodules.length === 0) {
        submodule = undefined;
      }

      // type is inside this submodule.
      submodule = submodules[0];
    }

    this.submodulesCache.set(type.fqn, submodule);
    return submodule;
  }

  protected getParentModule(moduleLike: reflect.ModuleLike): reflect.Assembly {
    const cached = this.parentModulesCache.get(moduleLike.fqn);
    if (cached) return cached;

    const types = moduleLike.types;
    if (types.length === 0) {
      throw new Error(
        `unable to determine assembly since module does not have any types: ${moduleLike.fqn}`
      );
    }
    const parent = types[0].assembly;
    this.parentModulesCache.set(moduleLike.fqn, parent);
    return parent;
  }

  protected optionalityCompare(
    p1: reflect.Parameter,
    p2: reflect.Parameter
  ): number {
    if (!p1.optional && p2.optional) {
      return -1;
    }
    if (!p2.optional && p1.optional) {
      return 1;
    }
    return 0;
  }
}
