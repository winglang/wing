"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var internal_exports = {};
__export(internal_exports, {
  compile: () => compile
});
module.exports = __toCommonJS(internal_exports);
var import_path = require("path");
async function compile(options) {
  const ts = (await import("typescript")).default;
  const outDir = (0, import_path.join)(options.workDir, "ts");
  const program = ts.createProgram([options.entrypoint], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    alwaysStrict: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    strict: true,
    sourceMap: true,
    outDir,
    noEmitOnError: true,
    listEmittedFiles: true
  });
  const results = program.emit();
  for (const diagnostic of results.diagnostics) {
    console.error(diagnostic.messageText);
  }
  if (results.emitSkipped) {
    throw new Error("TS compilation failed");
  }
  const emittedFiles = results.emittedFiles?.filter((f) => f.endsWith(".js"));
  const emittedFile = emittedFiles?.[emittedFiles.length - 1];
  if (!emittedFile) {
    throw new Error(`TS compilation failed: Could not find emitted file in ${outDir}`);
  }
  return emittedFile;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compile
});
//# sourceMappingURL=internal.js.map