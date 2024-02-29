import { MarkdownDocument } from "./markdown-doc";
import {
  ApiReferenceSchema,
  AssemblyMetadataSchema,
  ClassSchema,
  ConstructSchema,
  EnumMemberSchema,
  EnumSchema,
  InitializerSchema,
  InterfaceSchema,
  JsiiEntity,
  MethodSchema,
  ParameterSchema,
  PropertySchema,
  Schema,
  CURRENT_SCHEMA_VERSION,
  StructSchema,
  TypeSchema,
} from "../schema";
import { Language } from "../transpile/transpile";
import { HEADLESS_SUBMODULES } from "../view/wing-filters";

export interface MarkdownFormattingOptions {
  /**
   * How jsii entity IDs should be formatted into anchors. This should be
   * customized in conjunction with `linkFormatter`.
   *
   * @param type - the entity we are creating an anchor for
   *
   * @experimental
   * @default - use the full id
   */
  readonly anchorFormatter?: (type: JsiiEntity) => string;

  /**
   * How should links to entities be rendered. For example, if a class or a
   * property is referenced within a description or table.
   *
   * The `metadata` parameter can be optionally used to customize links based
   * on whether or not the type belongs to the package / submodule that is
   * being generated.
   *
   * @param type - the entity we are creating a link for
   * @param metadata - information about the module being docgen-ed
   *
   * @experimental
   * @default - '<a href="#{type.id}">{type.displayName}</a>' if the type
   *   belongs to this package, '{type.fqn}' otherwise
   */
  readonly linkFormatter?: (
    type: JsiiEntity,
    metadata: AssemblyMetadataSchema,
  ) => string;

  /**
   * How type signatures should be formatted, including those made of nested
   * types (like `Map<string, Bucket>`).
   *
   * The `metadata` and `linkFormatter` parameters are provided so that links
   * can be included in the formatted types if desired.
   *
   * @param type - the type being formatted
   * @param metadata - information about the module being docgen-ed
   * @param linkFormatter - the type link formatter
   *
   * @experimental
   * @default - HTML code block with type references linked
   * according to `linkFormatter`
   */
  readonly typeFormatter?: (
    type: TypeSchema,
    metadata: AssemblyMetadataSchema,
    linkFormatter: (
      type: JsiiEntity,
      metadata: AssemblyMetadataSchema,
    ) => string,
  ) => string;
}

export interface MarkdownRendererOptions
  extends MarkdownFormattingOptions,
    AssemblyMetadataSchema {
  /**
   * Language the documentation is rendered for.
   */
  readonly language: Language;
}

/**
 * Generates `MarkdownDocument` instances from `API.json` or its parts.
 *
 * This class can be used in two ways:
 *
 * 1. Instantiate it via the constructor with `options`, which requires
 * passing in some global context about the module and language you are
 * generated for. (This context can be found in the top-level `metadata`
 * field of API.json.) Then, call a `visitXxx` method to generate a
 * `MarkdownDocument` for the appropriate part of the schema.
 *
 * 2. Generate a `MarkdownDocument` from the complete `API.json` using the
 * `fromSchema` static method (no instantiation needed). Global context is
 * automatically inferred from the API.json.
 *
 * Both choices allow customizing the output via `MarkdownFormattingOptions`.
 */
export class MarkdownRenderer {
  public static fromSchema(
    schema: Schema,
    options: MarkdownFormattingOptions,
  ): MarkdownDocument {
    const documentation = new MarkdownDocument();

    if (schema.version !== CURRENT_SCHEMA_VERSION) {
      throw new Error(`Unexpected schema version: ${schema.version}`);
    }

    if (schema.readme) {
      const md = new MarkdownDocument();
      md.lines(schema.readme);
      documentation.section(md);
    }

    if (schema.apiReference) {
      const renderer = new MarkdownRenderer({
        anchorFormatter: options.anchorFormatter,
        linkFormatter: options.linkFormatter,
        typeFormatter: options.typeFormatter,
        language: Language.fromString(schema.language),
        ...schema.metadata,
      });

      documentation.section(
        renderer.visitApiReference(
          schema.apiReference,
          !!schema.metadata.submodule &&
            HEADLESS_SUBMODULES.includes(schema.metadata.submodule),
        ),
      );
    }

    return documentation;
  }

  private readonly anchorFormatter: NonNullable<
    MarkdownFormattingOptions["anchorFormatter"]
  >;
  private readonly linkFormatter: NonNullable<
    MarkdownFormattingOptions["linkFormatter"]
  >;
  private readonly typeFormatter: NonNullable<
    MarkdownFormattingOptions["typeFormatter"]
  >;
  private readonly metadata: AssemblyMetadataSchema;
  private readonly language: Language;

  constructor(options: MarkdownRendererOptions) {
    this.anchorFormatter = options.anchorFormatter ?? defaultAnchorFormatter;
    this.linkFormatter = options.linkFormatter ?? defaultLinkFormatter;
    this.typeFormatter = options.typeFormatter ?? defaultTypeFormatter;
    this.language = options.language;
    this.metadata = {
      packageName: options.packageName,
      packageVersion: options.packageVersion,
      submodule: options.submodule,
    };
  }

  public visitApiReference(
    apiRef: ApiReferenceSchema,
    headless: boolean,
  ): MarkdownDocument {
    const md = new MarkdownDocument({
      ...(!headless && { header: { title: "API Reference" } }),
      id: "api-reference",
    });
    md.section(this.visitConstructs(apiRef.constructs, headless));
    md.section(this.visitClasses(apiRef.classes));
    md.section(this.visitStructs(apiRef.structs));
    md.section(this.visitInterfaces(apiRef.interfaces));
    md.section(this.visitEnums(apiRef.enums));
    return md;
  }

  public visitConstructs(
    constructs: ConstructSchema[],
    headless: boolean,
  ): MarkdownDocument {
    if (constructs.length === 0) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({
      header: { title: headless ? "API Reference" : "Resources" },
    });
    for (const construct of constructs) {
      md.section(this.visitConstruct(construct));
    }
    return md;
  }

  public visitStructs(structs: StructSchema[]): MarkdownDocument {
    if (structs.length === 0) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({ header: { title: "Structs" } });
    for (const struct of structs) {
      md.section(this.visitStruct(struct));
    }
    return md;
  }

  public visitClasses(classes: ClassSchema[]): MarkdownDocument {
    if (classes.length === 0) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({ header: { title: "Classes" } });
    for (const klass of classes) {
      md.section(this.visitClass(klass));
    }
    return md;
  }

  public visitInterfaces(ifaces: InterfaceSchema[]): MarkdownDocument {
    if (ifaces.length === 0) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({ header: { title: "Protocols" } });
    for (const iface of ifaces) {
      md.section(this.visitInterface(iface));
    }
    return md;
  }

  public visitEnums(enums: EnumSchema[]): MarkdownDocument {
    if (enums.length === 0) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({ header: { title: "Enums" } });
    for (const enu of enums) {
      md.section(this.visitEnum(enu));
    }
    return md;
  }

  public visitConstruct(construct: ConstructSchema): MarkdownDocument {
    return this.visitClass(construct);
  }

  public visitStruct(struct: StructSchema): MarkdownDocument {
    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: struct.id,
        displayName: struct.displayName,
        fqn: struct.fqn,
        ...this.metadata,
      }),
      header: { title: struct.displayName },
    });

    if (struct.docs) {
      md.docs(struct.docs, this.language);
    }

    const initializer = new MarkdownDocument({
      id: this.anchorFormatter({
        id: `${struct.id}.Initializer`,
        displayName: "Initializer",
        fqn: `${struct.fqn}.Initializer`,
        ...this.metadata,
      }),
      header: { title: "Initializer" },
    });

    if (struct.usage) {
      initializer.code(this.language.toString(), struct.usage);
    }

    md.section(initializer);
    md.section(this.visitProperties(struct.properties));
    return md;
  }

  public visitClass(klass: ClassSchema): MarkdownDocument {
    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: klass.id,
        displayName: klass.displayName,
        fqn: klass.fqn,
        ...this.metadata,
      }),
      header: { title: klass.displayName },
    });

    if (klass.interfaces.length > 0) {
      const ifaces = [];
      for (const iface of klass.interfaces) {
        ifaces.push(this.linkFormatter(iface, this.metadata));
      }
      md.bullet(
        `${MarkdownDocument.italic("Implements:")} ${ifaces.join(", ")}`,
      );
      md.lines("");
    }

    if (klass.docs) {
      md.docs(
        {
          ...klass.docs,
          // removes the inflight client link when inflight interface is united with preflight's
          inflight: klass.inflight ? undefined : klass.docs.inflight,
        },
        this.language,
      );
    }

    if (klass.initializer) {
      md.section(this.visitInitializer(klass.initializer));
    }

    md.section(
      this.visitInstanceMethods(
        klass.instanceMethods,
        klass.inflight?.instanceMethods,
      ),
    );
    md.section(this.visitStaticFunctions(klass.staticMethods));
    md.section(this.visitProperties(klass.properties));
    md.section(this.visitConstants(klass.constants));
    return md;
  }

  public visitInterface(iface: InterfaceSchema): MarkdownDocument {
    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: iface.id,
        displayName: iface.displayName,
        fqn: iface.fqn,
        ...this.metadata,
      }),
      header: { title: iface.displayName },
    });

    if (iface.interfaces.length > 0) {
      const bases = [];
      for (const base of iface.interfaces) {
        bases.push(this.linkFormatter(base, this.metadata));
      }
      md.bullet(`${MarkdownDocument.italic("Extends:")} ${bases.join(", ")}`);
      md.lines("");
    }

    if (iface.implementations.length > 0) {
      const impls = [];
      for (const impl of iface.implementations) {
        impls.push(this.linkFormatter(impl, this.metadata));
      }
      md.bullet(
        `${MarkdownDocument.italic("Implemented By:")} ${impls.join(", ")}`,
      );
      md.lines("");
    }

    if (iface.docs) {
      md.docs(iface.docs, this.language);
    }

    md.section(this.visitInstanceMethods(iface.instanceMethods));
    md.section(this.visitProperties(iface.properties));
    return md;
  }

  public visitEnum(enu: EnumSchema): MarkdownDocument {
    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: enu.id,
        displayName: enu.displayName,
        fqn: enu.fqn,
        ...this.metadata,
      }),
      header: { title: enu.displayName },
    });

    if (enu.docs) {
      md.docs(enu.docs, this.language);
    }

    md.section(this.visitEnumMembers(enu.members));

    return md;
  }

  public visitEnumMembers(enus: EnumMemberSchema[]): MarkdownDocument {
    if (enus.length === 0) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({ header: { title: "Members" } });

    md.table(this.createTable(enus));
    md.split();

    for (const enu of enus) {
      md.section(this.visitEnumMember(enu));
    }
    return md;
  }

  public visitProperties(properties: PropertySchema[]): MarkdownDocument {
    if (properties.length === 0) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({ header: { title: "Properties" } });

    md.table(this.createTableWithTypes(properties));
    md.split();

    for (const prop of properties) {
      md.section(this.visitProperty(prop));
    }

    return md;
  }

  public visitInitializer(init: InitializerSchema): MarkdownDocument {
    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: init.id,
        displayName: init.displayName,
        fqn: init.fqn,
        ...this.metadata,
      }),
      header: {
        title: "Initializers",
      },
    });

    if (init.usage) {
      md.code(this.language.toString(), init.usage);
    }

    md.table(this.createTableWithTypes(init.parameters));
    md.split();

    for (const param of init.parameters) {
      md.section(this.visitParameter(param));
    }

    return md;
  }

  public visitInstanceMethods(
    methods: MethodSchema[],
    inflightMethods?: MethodSchema[],
  ): MarkdownDocument {
    if (!methods.length && !inflightMethods?.length) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({
      header: { title: "Methods" },
    });

    if (methods.length) {
      if (inflightMethods) {
        md.title("Preflight Methods", 5);
      }
      md.table(this.createTable(methods));
    }

    if (inflightMethods?.length) {
      md.title("Inflight Methods", 5);
      md.table(this.createTable(inflightMethods));
    }
    md.split();

    for (const method of [...methods, ...(inflightMethods ?? [])]) {
      md.section(this.visitInstanceMethod(method));
    }
    return md;
  }

  public visitStaticFunctions(methods: MethodSchema[]) {
    if (methods.length === 0) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({ header: { title: "Static Functions" } });

    md.table(this.createTable(methods));
    md.split();

    for (const method of methods) {
      md.section(this.visitStaticFunction(method));
    }
    return md;
  }

  public visitConstants(constants: PropertySchema[]): MarkdownDocument {
    if (constants.length === 0) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument({ header: { title: "Constants" } });

    md.table(this.createTableWithTypes(constants));
    md.split();

    for (const con of constants) {
      md.section(this.visitConstant(con));
    }

    return md;
  }

  public visitEnumMember(em: EnumMemberSchema): MarkdownDocument {
    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: em.id,
        displayName: em.displayName,
        fqn: em.fqn,
        ...this.metadata,
      }),
      header: {
        title: em.displayName,
        pre: true,
        strike: em.docs.deprecated,
      },
    });

    if (em.docs.deprecated) {
      md.bullet(
        `${MarkdownDocument.italic("Deprecated:")} ${em.docs.deprecationReason}`,
      );
      md.lines("");
    }

    if (em.docs) {
      md.docs(em.docs, this.language);
    }

    md.split();
    md.lines("");

    return md;
  }

  public visitProperty(prop: PropertySchema): MarkdownDocument {
    const optionality = prop.optional ? "Optional" : "Required";

    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: prop.id,
        displayName: prop.displayName,
        fqn: prop.fqn,
        ...this.metadata,
      }),
      header: {
        title: prop.displayName,
        sup: optionality,
        pre: true,
        strike: prop.docs.deprecated,
      },
    });

    if (prop.docs.deprecated) {
      md.bullet(
        `${MarkdownDocument.italic("Deprecated:")} ${
          prop.docs.deprecationReason
        }`,
      );
      md.lines("");
    }

    if (prop.usage) {
      md.code(this.language.toString(), prop.usage);
    }

    const metadata: Record<string, string> = {
      Type: this.typeFormatter(prop.type, this.metadata, this.linkFormatter),
    };

    if (prop.default) {
      const sanitized = MarkdownDocument.sanitize(prop.default);
      metadata.Default = MarkdownDocument.removeNewlines(sanitized);
    }

    for (const [key, value] of Object.entries(metadata)) {
      md.bullet(`${MarkdownDocument.italic(`${key}:`)} ${value}`);
    }
    md.lines("");

    if (prop.docs) {
      md.docs(prop.docs, this.language);
    }

    md.split();

    return md;
  }

  public visitParameter(parameter: ParameterSchema): MarkdownDocument {
    const optionality = parameter.optional ? "Optional" : "Required";

    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: parameter.id,
        displayName: parameter.displayName,
        fqn: parameter.fqn,
        ...this.metadata,
      }),
      header: {
        title: parameter.displayName,
        sup: optionality,
        pre: true,
        strike: parameter.docs.deprecated,
      },
    });

    if (parameter.docs.deprecated) {
      md.bullet(
        `${MarkdownDocument.italic("Deprecated:")} ${
          parameter.docs.deprecationReason
        }`,
      );
      md.lines("");
    }

    const metadata: any = {
      Type: this.typeFormatter(
        parameter.type,
        this.metadata,
        this.linkFormatter,
      ),
    };

    if (parameter.default) {
      const sanitized = MarkdownDocument.sanitize(parameter.default);
      metadata.Default = MarkdownDocument.removeNewlines(sanitized);
    }

    for (const [key, value] of Object.entries(metadata)) {
      md.bullet(`${MarkdownDocument.italic(`${key}:`)} ${value}`);
    }
    md.lines("");

    if (parameter.docs) {
      md.docs(parameter.docs, this.language);
    }

    md.split();

    return md;
  }

  public visitInstanceMethod(method: MethodSchema): MarkdownDocument {
    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: method.id,
        displayName: method.displayName,
        fqn: method.fqn,
        ...this.metadata,
      }),
      header: {
        title: method.displayName,
        pre: true,
        strike: method.docs.deprecated,
      },
    });

    if (method.usage) {
      md.code(this.language.toString(), method.usage);
    }

    if (method.docs) {
      md.docs(method.docs, this.language);
    }

    for (const param of method.parameters) {
      md.section(this.visitParameter(param));
    }

    return md;
  }

  public visitStaticFunction(method: MethodSchema) {
    const md = new MarkdownDocument({
      id: this.anchorFormatter({
        id: method.id,
        displayName: method.displayName,
        fqn: method.fqn,
        ...this.metadata,
      }),
      header: {
        title: method.displayName,
        pre: true,
        strike: method.docs.deprecated,
      },
    });

    if (method.usage) {
      md.code(this.language.toString(), method.usage);
    }

    if (method.docs) {
      md.docs(method.docs, this.language);
    }

    for (const param of method.parameters) {
      md.section(this.visitParameter(param));
    }

    return md;
  }

  public visitConstant(constant: PropertySchema): MarkdownDocument {
    return this.visitProperty(constant);
  }

  private createTable(items: SimpleTableItem[]): string[][] {
    const tableRows: string[][] = [];
    tableRows.push(["Name", "Description"].map(MarkdownDocument.bold));

    for (const item of items) {
      const link = MarkdownDocument.pre(
        this.linkFormatter(
          {
            fqn: item.fqn,
            displayName: item.displayName,
            id: item.id,
            ...this.metadata,
          },
          this.metadata,
        ),
      );
      const description =
        item.docs?.summary && item.docs?.summary.length > 0
          ? item.docs?.summary
          : MarkdownDocument.italic("No description.");
      tableRows.push([link, description]);
    }

    return tableRows;
  }

  private createTableWithTypes(items: TypeTableItem[]): string[][] {
    const tableRows: string[][] = [];
    tableRows.push(["Name", "Type", "Description"].map(MarkdownDocument.bold));

    for (const item of items) {
      const link = MarkdownDocument.pre(
        this.linkFormatter(
          {
            fqn: item.fqn,
            displayName: item.displayName,
            id: item.id,
            ...this.metadata,
          },
          this.metadata,
        ),
      );
      const type = MarkdownDocument.pre(
        this.typeFormatter(item.type, this.metadata, this.linkFormatter),
      );
      const description =
        item.docs?.summary && item.docs?.summary.length > 0
          ? item.docs?.summary
          : MarkdownDocument.italic("No description.");
      tableRows.push([link, type, description]);
    }

    return tableRows;
  }
}

interface SimpleTableItem {
  readonly fqn: string;
  readonly displayName: string;
  readonly id: string;
  readonly docs?: { summary?: string };
}

interface TypeTableItem extends SimpleTableItem {
  readonly type: TypeSchema;
}

function sanitize(str: string) {
  return str.replace(/ /g, "-");
}

export const defaultAnchorFormatter = (type: JsiiEntity) => {
  // HTML5 allows any character in IDs /except/ whitespace
  return sanitize(type.id);
};

export const defaultLinkFormatter = (
  type: JsiiEntity,
  metadata: AssemblyMetadataSchema,
) => {
  if (type.packageName === metadata.packageName) {
    return `<a href="#${sanitize(type.id)}">${type.displayName}</a>`;
  } else {
    // do not display a link if the type isn't in this document
    return type.fqn;
  }
};

function isJsiiType(value: any): value is JsiiEntity {
  return (
    value !== null &&
    typeof value === "object" &&
    value?.fqn &&
    value?.id &&
    value?.displayName
  );
}

export const defaultTypeFormatter = (
  type: TypeSchema,
  metadata: AssemblyMetadataSchema,
  linkFormatter: (type: JsiiEntity, metadata: AssemblyMetadataSchema) => string,
): string => {
  let result = type.formattingPattern;
  const typeRefs = [];
  for (const typeRef of type.types ?? []) {
    if (isJsiiType(typeRef)) {
      typeRefs.push(linkFormatter(typeRef, metadata));
    } else {
      typeRefs.push(defaultTypeFormatter(typeRef, metadata, linkFormatter));
    }
  }

  // substitute referred types into the original string
  const placeholderMatcher = /\%/g;
  for (const typeRef of typeRefs) {
    const matches = placeholderMatcher.exec(result);
    if (!matches) {
      // it's possible the number of %'s doesn't match the number of types provided
      // e.g. csharp unions are currently rendered to `{ name: 'object', types: [type1, type2] }`
      continue;
    }
    const insertionIdx: number = matches.index;
    result =
      result.substring(0, insertionIdx) +
      typeRef +
      result.substring(insertionIdx + 1);
  }

  return result;
};
