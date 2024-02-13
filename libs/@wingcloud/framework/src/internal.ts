import { dirname, join } from "path";
import type ts from "typescript";

export interface CompileOptions {
  workDir: string;
  entrypoint: string;
}

export async function compile(options: CompileOptions) {
  const ts = (await import("typescript")).default;
  const outDir = join(options.workDir, "ts");

  const program = ts.createProgram([options.entrypoint], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    alwaysStrict: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    strict: true,
    sourceMap: true,
    outDir,
    declaration: false,
    noEmitOnError: true,
    listEmittedFiles: true,
    baseUrl: dirname(options.entrypoint),
    paths: {
      "@winglang/sdk/*": [dirname(require.resolve("@winglang/sdk")) + "/*"],
    },
  });

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
