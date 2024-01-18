import { dirname, join } from "path";

export interface CompileOptions {
  workDir: string;
  entrypoint: string;
}

export async function compile(options: CompileOptions) {
  const ts = (await import("typescript")).default;
  const outDir = join(options.workDir, "ts");

  const program = ts.createProgram([options.entrypoint], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.Node16,
    moduleResolution: ts.ModuleResolutionKind.Node16,
    alwaysStrict: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    strict: true,
    sourceMap: true,
    outDir,
    noEmitOnError: true,
    listEmittedFiles: true,
    baseUrl: dirname(options.entrypoint),
    paths: {
      "@winglang/sdk/*": [dirname(require.resolve("@winglang/sdk")) + "/*"],
    },
  });
  const results = program.emit();

  for (const diagnostic of results.diagnostics) {
    console.error(diagnostic.messageText);
  }
  if (results.emitSkipped) {
    throw new Error("TS compilation failed");
  }

  // get the last .js file emitted, this should be the entrypoint
  const emittedFiles = results.emittedFiles?.filter((f) => f.endsWith(".js"));
  const emittedFile = emittedFiles?.[emittedFiles.length - 1];

  if (!emittedFile) {
    throw new Error(
      `TS compilation failed: Could not find emitted file in ${outDir}`
    );
  }

  return emittedFile;
}
