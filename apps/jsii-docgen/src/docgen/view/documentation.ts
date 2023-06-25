import * as os from "os";
import * as path from "path";
import { SPEC_FILE_NAME } from "@jsii/spec";
import * as fs from "fs-extra";
import * as glob from "glob-promise";
import * as reflect from "jsii-reflect";
import { TargetLanguage } from "jsii-rosetta";
import { CorruptedAssemblyError, LanguageNotSupportedError } from "../..";
import { Json } from "../render/json";
import { MarkdownDocument } from "../render/markdown-doc";
import {
  MarkdownFormattingOptions,
  MarkdownRenderer,
} from "../render/markdown-render";
import { Schema, CURRENT_SCHEMA_VERSION, submodulePath } from "../schema";
import { CSharpTranspile } from "../transpile/csharp";
import { GoTranspile } from "../transpile/go";
import { JavaTranspile } from "../transpile/java";
import { PythonTranspile } from "../transpile/python";
import { Transpile, Language } from "../transpile/transpile";
import { TypeScriptTranspile } from "../transpile/typescript";
import { WingTranspile } from "../transpile/wing";
import { Npm } from "./_npm";
import { ApiReference } from "./api-reference";
import { Readme } from "./readme";

// https://github.com/aws/jsii/blob/main/packages/jsii-reflect/lib/assembly.ts#L175
const NOT_FOUND_IN_ASSEMBLY_REGEX =
  /Type '(.*)\..*' not found in assembly (.*)$/;

/**
 * Options for rendering a `Documentation` object.
 */
export interface RenderOptions extends TransliterationOptions {
  /**
   * Which language to generate docs for.
   */
  readonly language: Language;

  /**
   * Include a generated api reference in the documentation.
   *
   * @default true
   */
  readonly apiReference?: boolean;

  /**
   * Include the user defined README.md in the documentation.
   *
   * @default true
   */
  readonly readme?: boolean;

  /**
   * Generate documentation only for a specific submodule.
   *
   * @default - Documentation is generated for the root module only.
   */
  readonly submodule?: string;

  /**
   * Generate a single document with APIs from all assembly submodules
   * (including the root).
   *
   * Note: only the root-level README is included.
   *
   * @default false
   */
  readonly allSubmodules?: boolean;
}

export interface TransliterationOptions {
  /**
   * Whether to ignore missing fixture files that will prevent transliterating
   * some code snippet examples.
   *
   * @default true
   */
  readonly loose?: boolean;

  /**
   * Whether to validate jsii assemblies against the jsii schema before
   * using them.
   *
   * @default false
   */
  readonly validate?: boolean;
}

export interface MarkdownRenderOptions
  extends RenderOptions,
    MarkdownFormattingOptions {}

/**
 * Options for creating a `Documentation` object using the `fromLocalPackage` function.
 */
export interface ForLocalPackageDocumentationOptions {
  /**
   * A local directory containing jsii assembly files that will
   * comprise the type-system.
   *
   * @default - the root package directory will be used.
   */
  readonly assembliesDir?: string;
}

export interface ForPackageDocumentationOptions {
  /**
   * The name of the package to be installed.
   *
   * If the target you supply points to a local file, this is required.
   * Otherwise, it will be derived from the target.
   */
  readonly name?: string;
}

/**
 * Render documentation pages for a jsii library.
 */
export class Documentation {
  /**
   * Create a `Documentation` object from a package installable by npm.
   *
   * Note that this method installs the target package to the local file-system. Make sure
   * to call `Documentation.cleanup` once you are done rendering.
   *
   * @param target - The target to install. This can either be a local path or a registry identifier (e.g <name>@<version>)
   * @param options - Additional options.
   *
   * @throws NoSpaceLeftOnDevice if the installation fails due to running out of disk space
   * @throws NpmError if some `npm` command fails when preparing the working set
   */
  public static async forPackage(
    target: string,
    options: ForPackageDocumentationOptions = {}
  ): Promise<Documentation> {
    const workdir = await fs.mkdtemp(path.join(os.tmpdir(), path.sep));

    if ((await fs.pathExists(target)) && !options.name) {
      throw new Error(
        "'options.name' must be provided when installing local packages."
      );
    }

    const name = options?.name ?? extractPackageName(target);

    const npm = new Npm(workdir);

    console.log(`Installing package ${target}`);
    await npm.install(target);

    const docs = await Documentation.forProject(
      path.join(workdir, "node_modules", name),
      { ...options, assembliesDir: workdir }
    );

    // we cannot delete this directory immediately since it is used during `render` calls.
    // instead we register it so that callers can clean it up by calling the `cleanup` method.
    docs.addCleanupDirectory(workdir);

    return docs;
  }

  /**
   * Create a `Documentation` object from a local directory containing a node project.
   *
   * @param root - The local directory path. Must contain a package.json file.
   * @param options - Additional options.
   */
  public static async forProject(
    root: string,
    options: ForLocalPackageDocumentationOptions = {}
  ): Promise<Documentation> {
    const manifestPath = path.join(root, "package.json");
    if (!(await fs.pathExists(manifestPath))) {
      throw new Error(`Unable to locate ${manifestPath}`);
    }

    // normally the assemblies are located in subdirectories
    // of the root package dir (i.e ./node_modules)
    const assembliesDir = options?.assembliesDir ?? root;

    const { name } = JSON.parse(await fs.readFile(manifestPath, "utf-8"));
    return Documentation.forAssembly(name, assembliesDir);
  }

  /**
   * Create a `Documentation` object for a specific assembly from a directory of assemblies.
   *
   * @param assemblyName - The assembly name.
   * @param assembliesDir - The directory containing the assemblies that comprise the type-system.
   */
  public static async forAssembly(
    assemblyName: string,
    assembliesDir: string
  ): Promise<Documentation> {
    return new Documentation(assemblyName, assembliesDir);
  }

  private readonly cleanupDirectories: Set<string> = new Set<string>();
  private readonly assembliesCache: Map<string, reflect.Assembly> = new Map<
    string,
    reflect.Assembly
  >();
  private assemblyFqn: string | undefined;

  private constructor(
    private readonly assemblyName: string,
    private readonly assembliesDir: string
  ) {}

  /**
   * Generate markdown.
   */
  public async toJson(options: RenderOptions): Promise<Json<Schema>> {
    const language = options.language ?? Language.TYPESCRIPT;
    const loose = options.loose ?? true;
    const validate = options.validate ?? false;
    const allSubmodules = options.allSubmodules ?? false;

    // Get the TS assembly first to check what languages are supported before calling rosetta
    const tsAssembly = await this.createAssembly(undefined, {
      loose,
      validate,
    });
    const isSupported =
      language === Language.TYPESCRIPT ||
      language.isValidConfiguration(tsAssembly?.targets?.[language.targetName]);
    this.assemblyFqn = `${tsAssembly.name}@${tsAssembly.version}`;

    if (!isSupported) {
      throw new LanguageNotSupportedError(
        `Laguage ${language} is not supported for package ${this.assemblyFqn}`
      );
    }

    if (allSubmodules && options?.submodule) {
      throw new Error(
        "Cannot call toJson with allSubmodules and a specific submodule both selected."
      );
    }

    const { assembly, transpile } = await this.languageSpecific(language, {
      loose,
      validate,
    });
    const targets = assembly.targets;

    if (!targets) {
      throw new Error(
        `Assembly ${this.assemblyFqn} does not have any targets defined`
      );
    }

    const submodule = options?.submodule
      ? this.findSubmodule(assembly, options.submodule)
      : undefined;

    let readme: MarkdownDocument | undefined;
    if (options?.readme ?? true) {
      readme = new Readme(transpile, assembly, submodule).render();
    }

    let apiReference: ApiReference | undefined;
    if (options?.apiReference ?? true) {
      try {
        apiReference = new ApiReference(
          transpile,
          assembly,
          submodule,
          allSubmodules
        );
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        throw maybeCorruptedAssemblyError(error) ?? error;
      }
    }

    const contents: Schema = {
      version: CURRENT_SCHEMA_VERSION,
      language: language.toString(),
      metadata: {
        packageName: assembly.name,
        packageVersion: assembly.version,
        submodule: submodulePath(submodule),
      },
      readme: readme?.render(),
      apiReference: apiReference?.toJson(),
    };

    return new Json(contents);
  }

  public async toMarkdown(
    options: MarkdownRenderOptions
  ): Promise<MarkdownDocument> {
    const json = (await this.toJson(options)).content;
    return MarkdownRenderer.fromSchema(json, {
      anchorFormatter: options.anchorFormatter,
      linkFormatter: options.linkFormatter,
      typeFormatter: options.typeFormatter,
    });
  }

  private addCleanupDirectory(directory: string) {
    this.cleanupDirectories.add(directory);
  }

  /**
   * Removes any internal working directories.
   */
  public async cleanup() {
    for (const dir of [...this.cleanupDirectories]) {
      await fs.remove(dir);
      this.cleanupDirectories.delete(dir);
    }
  }

  private async languageSpecific(
    lang: Language,
    options: Required<TransliterationOptions>
  ): Promise<{ assembly: reflect.Assembly; transpile: Transpile }> {
    const { rosettaTarget, transpile } = LANGUAGE_SPECIFIC[lang.toString()];
    return {
      assembly: await this.createAssembly(rosettaTarget, options),
      transpile,
    };
  }

  /**
   * Lookup a submodule by a submodule name.
   */
  private findSubmodule(
    assembly: reflect.Assembly,
    submodule: string
  ): reflect.Submodule {
    const submodules = assembly.submodules.filter((s) => s.name === submodule);

    if (submodules.length === 0) {
      throw new Error(
        `Submodule ${submodule} not found in assembly ${assembly.name}@${assembly.version}`
      );
    }

    if (submodules.length > 1) {
      throw new Error(
        `Found multiple submodules with name: ${submodule} in assembly ${assembly.name}@${assembly.version}`
      );
    }

    return submodules[0];
  }

  private async createAssembly(
    language: TargetLanguage | undefined,
    options: Required<TransliterationOptions>
  ): Promise<reflect.Assembly> {
    const cacheKey = `lang:${language ?? "ts"}.loose:${
      options.loose
    }.validate:${options.validate}`;
    const cached = this.assembliesCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const ts = new reflect.TypeSystem();
    for (let dotJsii of await glob.promise(
      `${this.assembliesDir}/**/${SPEC_FILE_NAME}`
    )) {
      await ts.load(dotJsii, { validate: options.validate });
    }
    const created = ts.findAssembly(this.assemblyName);

    this.assembliesCache.set(cacheKey, created);
    return created;
  }
}

export const LANGUAGE_SPECIFIC = {
  [Language.PYTHON.toString()]: {
    transpile: new PythonTranspile(),
    rosettaTarget: TargetLanguage.PYTHON,
  },
  [Language.TYPESCRIPT.toString()]: {
    transpile: new TypeScriptTranspile(),
    rosettaTarget: undefined, // no transpilation needed
  },
  [Language.JAVA.toString()]: {
    transpile: new JavaTranspile(),
    rosettaTarget: TargetLanguage.JAVA,
  },
  [Language.CSHARP.toString()]: {
    transpile: new CSharpTranspile(),
    rosettaTarget: TargetLanguage.CSHARP,
  },
  [Language.GO.toString()]: {
    transpile: new GoTranspile(),
    rosettaTarget: TargetLanguage.GO,
  },
  [Language.WING.toString()]: {
    transpile: new WingTranspile(),
    // TODO WING HACK
    rosettaTarget: "wing" as TargetLanguage,
  },
};

export function extractPackageName(spec: string) {
  const firstAt = spec.indexOf("@");

  if (firstAt === 0) {
    const lastAt = spec.indexOf("@", firstAt + 1);
    if (lastAt === -1) {
      // @aws-cdk/aws-ecr
      return spec;
    } else {
      // @aws-cdk/aws-ecr@2.0.0
      return spec.substring(0, lastAt);
    }
  }

  if (firstAt > 0) {
    // aws-cdk-lib@2.0.0
    return spec.substring(0, firstAt);
  }

  // aws-cdk-lib
  return spec;
}

/**
 * Return a `CorruptedAssemblyError` if the error matches, undefined otherwise.
 *
 * Note that an 'not found in assembly` can be thrown in two cases:
 *
 * 1. Direct usage of `assembly.findType(fqn)`
 *
 *    In this case the error could be caused by a wrong FQN being passed to the function. This is not considered
 *    a corrupted assembly since the caller might be passing an FQN from a different assembly.
 *
 * 2. Implicit usage of `assembly.findType(fqn)` by calling `.type` (e.g `parameter.type`)
 *
 *    In this case the assembly we look in is always the same assembly the type itself comes from, and if it doesn't exist,
 *    then the assembly is considered corrupt.
 */
function maybeCorruptedAssemblyError(
  error: Error
): CorruptedAssemblyError | undefined {
  const match = error.message.match(NOT_FOUND_IN_ASSEMBLY_REGEX);
  if (!match) {
    return;
  }
  const searchedAssembly = match[2];
  const typeAssembly = match[1];

  if (searchedAssembly === typeAssembly) {
    return new CorruptedAssemblyError(error.message);
  }
  return;
}
