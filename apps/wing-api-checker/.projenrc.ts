import { javascript, typescript } from "projen";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "wing-api-checker",
  entrypoint: "lib/index.js",
  bin: {
    "wing-api-check": "bin/wing-api-check",
  },
  authorName: "Monada",
  authorEmail: "ping@monada.co",
  authorOrganization: true,
  authorUrl: "https://monada.co",
  repository: "https://github.com/monadahq/winglang.git",
  packageManager: javascript.NodePackageManager.NPM,
  github: false,
  projenrcTs: true,
  prettier: true,
  deps: ["chalk", "chokidar", "glob-promise", "jsii-reflect", "yargs"],
  devDeps: ["@types/node@^18"],
});

project.synth();
