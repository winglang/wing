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
    noEmitOnError: true,
    listEmittedFiles: true,
    baseUrl: dirname(options.entrypoint),
    paths: {
      "@winglang/sdk/*": [dirname(require.resolve("@winglang/sdk")) + "/*"],
    },
  });

  let extraErrors: ts.Diagnostic[] = [];

  const emitResult = program.emit(undefined, undefined, undefined, undefined, {
    before: [
      // This transformer finds all usages of `inflight` and does the following with the functions passed to it:
      // 1. Replaces references to top-level imports with inline `require` calls
      // 2. Throws an error if a reference to a non-import variable declared in an outer scope is used
      (context) => {
        const typeChecker = program.getTypeChecker();

        function isInBlock(node: ts.Node, block: ts.Block) {
          while (node) {
            if (node === block) {
              return true;
            }
            node = node.parent;
          }
          return false;
        }

        function getImportSpecifier(node: ts.Declaration): string {
          if (ts.isImportSpecifier(node)) {
            return node.parent.parent.parent.moduleSpecifier.getText();
          } else if (ts.isNamespaceImport(node)) {
            return node.parent.parent.moduleSpecifier.getText();
          } else if (ts.isImportClause(node)) {
            return node.parent.moduleSpecifier.getText();
          }
          return "";
        }

        /**
         * Checks if the given node is a reference to the `inflight` function from this library
         */
        function isInflightSymbol(node: ts.Node) {
          let sym = typeChecker.getSymbolAtLocation(node);
          if (!sym) return false;

          if (sym.name === "inflight") {
            const decl = sym.declarations?.at(0);
            if (!decl) {
              return true;
            } else if (
              decl.getSourceFile().fileName.replaceAll("\\", "/").includes("/@wingcloud/framework/")
            ) {
              return true;
            } else {
              return getImportSpecifier(decl) === '"@wingcloud/framework"';
            }
          }

          return false;
        }

        return (sourceFile) => {
          let inflightClosureScope: ts.ConciseBody | undefined;

          /**
           * Converts `import a from "module"` to `require("module")`
           */
          function requireFromClause(importClause: ts.ImportClause) {
            let moduleSpecifier = importClause.parent.moduleSpecifier;
            if (ts.isStringLiteral(moduleSpecifier)) {
              const text = moduleSpecifier.text;
              if (text.startsWith(".")) {
                const resolved = join(dirname(sourceFile.fileName), text);
                moduleSpecifier = context.factory.createStringLiteral(resolved);
              }
            }

            return context.factory.createCallExpression(
              context.factory.createIdentifier("require"),
              undefined,
              [moduleSpecifier]
            );
          }

          /**
           * Converts `import { a } from "module"` to `require("module").a`
           */
          function requireImportSpec(importSpec: ts.ImportSpecifier) {
            const importName = importSpec.propertyName || importSpec.name;
            return context.factory.createPropertyAccessExpression(
              requireFromClause(importSpec.parent.parent),
              importName
            );
          }

          const visitor = (node: ts.Node): ts.Node => {
            // check if the call is to the special inflight function
            if (
              (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
              ts.isCallExpression(node.parent) &&
              isInflightSymbol(node.parent.expression)
            ) {
              // we are in a node that looks like this;
              // inflight(async () => {})
              // let's get to the scope of the inner ArrowFunction
              inflightClosureScope = node.body;
              const result = ts.visitEachChild(node, visitor, context);
              inflightClosureScope = undefined;
              return result;
            }

            const result = ts.visitEachChild(node, visitor, context);

            if (inflightClosureScope && ts.isIdentifier(node)) {
              const sym = typeChecker.getSymbolAtLocation(node);
              if (!sym) return result;

              // if this symbol was declared from an import statement, we need to recreate that inline
              const mostRecentDecl = sym.declarations?.at(0);
              if (mostRecentDecl?.getSourceFile() === sourceFile) {
                if (ts.isImportClause(mostRecentDecl)) {
                  return requireFromClause(mostRecentDecl);
                } else if (ts.isImportSpecifier(mostRecentDecl)) {
                  return requireImportSpec(mostRecentDecl);
                } else if (ts.isNamespaceImport(mostRecentDecl)) {
                  return requireFromClause(mostRecentDecl.parent);
                } else if (ts.isVariableDeclaration(mostRecentDecl)) {
                  if (!isInBlock(mostRecentDecl, inflightClosureScope as ts.Block)) {
                    extraErrors.push({
                      messageText: `Unable to access "${sym.escapedName}" in inflight closure. Use 'lift( { ${sym.escapedName} } )' before 'inflight' and reference through ctx.`,
                      code: 0,
                      category: ts.DiagnosticCategory.Error,
                      file: sourceFile,
                      start: node.getStart(),
                      length: node.getEnd() - node.getStart(),
                    });
                  }
                }
              }
            }

            return result;
          };

          return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
        };
      },
    ],
  });

  const allDiagnostics = emitResult.diagnostics.concat(extraErrors);

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
