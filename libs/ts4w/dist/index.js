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
var src_exports = {};
__export(src_exports, {
  internal: () => internal,
  main: () => main
});
module.exports = __toCommonJS(src_exports);
var import_sdk = require("@winglang/sdk");
var internal = __toESM(require("./internal"));
function main(fn, props = {}) {
  const requiredEnvVars = [
    "WING_PLATFORMS",
    "WING_SYNTH_DIR",
    "WING_SOURCE_DIR",
    "WING_IS_TEST"
  ];
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar] === void 0) {
      throw new Error(`Missing environment variable: ${envVar}
This is a Wing app and must be run through the Wing CLI (npm install -f winglang).`);
    }
  }
  class $Root extends import_sdk.std.Resource {
    constructor(scope, id) {
      super(scope, id);
      fn(this);
    }
  }
  const platformPaths = ((s) => !s ? [] : s.split(";"))(
    process.env.WING_PLATFORMS
  );
  const outdir = process.env.WING_SYNTH_DIR;
  const name = props.name ?? "main";
  const rootConstruct = $Root;
  const isTestEnvironment = process.env.WING_IS_TEST === "true";
  const entrypointDir = process.env.WING_SOURCE_DIR;
  const rootId = process.env.WING_ROOT_ID;
  const $PlatformManager = new import_sdk.platform.PlatformManager({ platformPaths });
  const app = $PlatformManager.createApp({
    outdir,
    name,
    rootConstruct,
    isTestEnvironment,
    entrypointDir,
    rootId
  });
  app.synth();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  internal,
  main
});
//# sourceMappingURL=index.js.map