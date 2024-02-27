import { dirname, join } from "path";
import type ts from "typescript";

export interface CompileOptions {
  workDir: string;
  entrypoint: string;
}

const MANAGED_TSCONFIG_OPTIONS = [
  "target",
  "module",
  "moduleResolution",
  "paths",
  "outDir",
];

export async function compile(options: CompileOptions) {
  const entrypointDir = dirname(options.entrypoint);
  const ts = (await import("typescript")).default;
  const outDir = join(options.workDir, "ts");
  const wingsdkDir = dirname(require.resolve("@winglang/sdk"));

  const tsconfigPath = ts.findConfigFile(entrypointDir, ts.sys.fileExists);
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    paths: {
      "@winglang/sdk": [wingsdkDir],
      "@winglang/sdk/*": [wingsdkDir + "/*"],
    },
    outDir,
    alwaysStrict: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    strict: true,
    sourceMap: true,
    declaration: false,
    noEmitOnError: true,
    listEmittedFiles: true,
    allowJs: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    isolatedModules: true,
  };

  if (tsconfigPath) {
    const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    if (error) {
      throw new Error(
        `Failed to read tsconfig at ${tsconfigPath}: ${error.messageText}`
      );
    }

    const { options, errors } = ts.parseJsonConfigFileContent(
      config,
      ts.sys,
      dirname(tsconfigPath),
      {}
    );

    if (errors.length > 0) {
      throw new Error(
        `Failed to parse tsconfig at ${tsconfigPath}: ${errors
          .map((e) => e.messageText)
          .join("\n")}`
      );
    }

    for (const managedOption of MANAGED_TSCONFIG_OPTIONS) {
      if (config?.compilerOptions?.[managedOption] !== undefined) {
        console.warn(
          `'${managedOption}' in tsconfig is managed by wing, value is ${compilerOptions[managedOption]}`
        );
        delete options[managedOption];
      }
    }

    Object.assign(compilerOptions, options);
  }

  const program = ts.createProgram([options.entrypoint], compilerOptions);

  const { InflightTransformer } = await import("./transformer");
  const transformer = new InflightTransformer(program);

  const emitResult = program.emit(undefined, undefined, undefined, undefined, {
    before: [(sourceFile) => transformer.transform(sourceFile)],
  });

  const allDiagnostics = emitResult.diagnostics.concat(transformer.extraErrors);

  if (
    emitResult.emitSkipped ||
    allDiagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error)
      .length > 0
  ) {
    console.error(
      ts.formatDiagnosticsWithColorAndContext(allDiagnostics, {
        getCanonicalFileName: (f) => f,
        getCurrentDirectory: () => process.cwd(),
        getNewLine: () => "\n",
      })
    );

    throw new Error("TS compilation failed");
  }

  // get the last .js file emitted, this should be the entrypoint
  const emittedFiles = emitResult.emittedFiles?.filter((f) =>
    f.endsWith(".js")
  );
  const emittedFile = emittedFiles?.[emittedFiles.length - 1];

  if (!emittedFile) {
    throw new Error(
      `TS compilation failed: Could not find emitted file in ${outDir}`
    );
  }

  return emittedFile;
}
