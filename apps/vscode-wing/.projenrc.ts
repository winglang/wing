import { IgnoreFile } from "projen";
import { NodePackageManager } from "projen/lib/javascript";
import { TypeScriptAppProject } from "projen/lib/typescript";
import { VSCodeExtensionContributions } from "./src/project/vscode_types";

const VSCODE_BASE_VERSION = "1.70.0";

const project = new TypeScriptAppProject({
  defaultReleaseBranch: "main",
  name: "wing",
  authorName: "Monada",
  authorEmail: "ping@monada.co",
  authorOrganization: true,
  authorUrl: "https://monada.co",
  repository: "https://github.com/monadahq/winglang.git",
  packageManager: NodePackageManager.NPM,
  projenrcTs: true,
  package: false,
  buildWorkflow: false,
  jest: false,
  github: false,
  npmignoreEnabled: false,
  entrypoint: "lib/index.js",
  eslintOptions: {
    dirs: ["src"],
    prettier: true,
  },

  // Enabling [compilerOptions.noUncheckedIndexedAccess] will prevent
  // accessing undefined properties from untyped objects by mistake.
  // See https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess
  tsconfig: {
    compilerOptions: {
      noUncheckedIndexedAccess: true,
    },
  },

  deps: [
    `@types/vscode@^${VSCODE_BASE_VERSION}`,
    "octokit",
    "node-fetch",
    "vscode-languageclient",
  ],
  devDeps: ["@types/node", "esbuild", "vsce"],
});

project.addGitIgnore("*.vsix");

const vscodeIgnore = new IgnoreFile(project, ".vscodeignore");
vscodeIgnore.addPatterns(
  "**",
  "!lib/",
  "!resources/",
  "!syntaxes/",
  "!language-configuration.json",
  "!LICENSE"
);

const contributes: VSCodeExtensionContributions = {
  languages: [
    {
      id: "wing",
      aliases: ["Wing", "wing"],
      extensions: [".w"],
      configuration: "./language-configuration.json",
      icon: {
        light: "resources/logo.png",
        dark: "resources/logo.png",
      },
    },
  ],
  grammars: [
    {
      language: "wing",
      scopeName: "source.wing",
      path: "syntaxes/wing.tmLanguage.json",
    },
  ],
  configuration: {
    title: "Wing",
    properties: {
      "wing.updates.githubToken": {
        type: "string",
        default: "",
        description:
          "PAT to check for and download new versions of this extension from the winglang repo. Leave empty to disable automatic updates.\nNOTE: PAT must have private repo permission.",
      },
      "wing.updates.sourceTag": {
        type: "string",
        default: "development",
        description: "Release tag to retrieve updates from.",
      },
    },
  },
};

project.addFields({
  publisher: "Monada",
  preview: true,
  private: true,
  displayName: "Wing [Alpha]",
  description: "Wing Language Support",
  icon: "resources/logo.png",
  engines: {
    vscode: `^${VSCODE_BASE_VERSION}`,
  },
  categories: ["Programming Languages"],
  activationEvents: ["onLanguage:wing"],
  contributes,
});

const esbuildComment =
  "esbuild src/extension.ts --outfile=lib/index.js --external:node-gyp --external:vscode --format=cjs --platform=node --bundle";
project.compileTask.reset();
project.compileTask.exec(esbuildComment);
project.watchTask.reset(`${esbuildComment} --watch`);

project.packageTask.reset("vsce package -o vscode-wing.vsix");

project.synth();
