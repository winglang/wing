import { IgnoreFile } from "projen";
import { NodePackageManager } from "projen/lib/javascript";
import { TypeScriptAppProject } from "projen/lib/typescript";
import { VSCodeExtensionContributions } from "./src/project/vscode_types";
import rootPackageJson from "../../package.json";

const VSCODE_BASE_VERSION = "1.70.0";

const project = new TypeScriptAppProject({
  defaultReleaseBranch: "main",
  name: "vscode-wing",
  authorName: "Monada",
  authorEmail: "ping@monada.co",
  authorOrganization: true,
  authorUrl: "https://monada.co",
  repository: "https://github.com/winglang/wing.git",
  bugsUrl: "https://github.com/winglang/wing/issues",
  homepage: "https://winglang.io",
  description: "Wing language support for VSCode",
  keywords: [
    "cdk",
    "cdktf",
    "cloud",
    "infrastructure",
    "language",
    "terraform",
    "wing",
    "winglang",
  ],
  license: "MIT",

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
    "vscode-languageclient",
    "which",
  ],
  devDeps: ["@types/node", "@types/which", "esbuild", "@vscode/vsce"],
});

project.addGitIgnore("*.vsix");

const vscodeIgnore = new IgnoreFile(project, ".vscodeignore");
vscodeIgnore.addPatterns(
  "**",

  // It's strange, but if these are not included then the build fails
  "../**",
  "../../**",

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
      extensions: [".w", ".wsim"],
      configuration: "./language-configuration.json",
      icon: {
        light: "resources/icon-light.png",
        dark: "resources/icon-dark.png",
      },
    },
  ],
  grammars: [
    {
      language: "wing",
      scopeName: "source.wing",
      path: "syntaxes/wing.tmLanguage.json",
    },
    {
      // https://github.com/mjbvz/vscode-fenced-code-block-grammar-injection-example
      scopeName: "markdown.wing.codeblock",
      path: "syntaxes/codeblock.json",
      injectTo: ["text.html.markdown"],
      embeddedLanguages: {
        "meta.embedded.block.wing": "wing",
      },
    },
  ],
  configuration: [
    {
      title: "Wing",
      properties: {
        "wing.bin": {
          type: "string",
          default: "wing",
          description:
            "Path to the Wing binary. Will be `wing` from PATH by default.\nSet to `npx` to automatically retrieve the version that matches this extension",
        },
      },
    },
  ],
};

project.addFields({
  publisher: "Monada",
  preview: true,
  private: true,
  displayName: "Wing [Alpha]",
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

project.packageTask.reset(
  "npm version ${PROJEN_BUMP_VERSION:-0.0.0} --allow-same-version"
);
project.packageTask.exec("vsce package -o vscode-wing.vsix");

project.addFields({
  volta: rootPackageJson.volta,
});

project.synth();
