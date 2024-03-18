import { IgnoreFile, DependencyType } from "projen";
import { NodePackageManager } from "projen/lib/javascript";
import { TypeScriptAppProject } from "projen/lib/typescript";
import { VSCodeExtensionContributions } from "./src/project/vscode_types";

const VSCODE_BASE_VERSION = "1.70.0";

const project = new TypeScriptAppProject({
  defaultReleaseBranch: "main",
  name: "vscode-wing",
  authorName: "Wing Cloud",
  authorEmail: "ping@wing.cloud",
  authorOrganization: true,
  authorUrl: "https://winglang.io",
  repository: "https://github.com/winglang/wing.git",
  bugsUrl: "https://github.com/winglang/wing/issues",
  homepage: "https://winglang.io",
  description: "Wing language support for VSCode",
  projenCommand: "pnpm exec projen",
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

  packageManager: NodePackageManager.PNPM,
  projenrcTs: true,
  package: false,
  buildWorkflow: false,
  jest: false,
  github: false,
  depsUpgrade: false,
  npmignoreEnabled: false,
  entrypoint: "lib/extension.js",
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
      lib: ["es2021"],
    },
  },

  deps: [],
  devDeps: [
    `@types/vscode@^${VSCODE_BASE_VERSION}`,
    "vscode-languageclient",
    "which",
    "@trpc/client",
    "ws",
    "open",
    "tsx",
    "node-fetch@^2.6.7",
    "@types/which",
    "@vscode/vsce",
    "@types/node-fetch",
    "@types/ws",
    "@wingconsole/app@workspace:^",
    "@wingconsole/server@workspace:^",
    "winglang@workspace:^",
  ],
});

project.defaultTask!.reset("tsx --tsconfig tsconfig.dev.json .projenrc.ts");
project.deps.removeDependency("ts-node");

// because we're bundling, allow dev deps in src
project.eslint?.allowDevDeps("src/**");

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
  breakpoints: [{ language: "wing" }],
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
  commands: [
    {
      command: "wing.openConsole",
      title: "Open in Wing Console",
      icon: {
        light: "resources/icon-light.svg",
        dark: "resources/icon-dark.svg",
      },
    },
    {
      command: "wing.openFile",
      title: "Open source file",
      icon: {
        light: "resources/icon-light.svg",
        dark: "resources/icon-dark.svg",
      },
    },
    {
      command: "wingConsole.openResource",
      title: "Open resource",
    },
    {
      command: "wingConsole.runTest",
      title: "Run test",
      icon: {
        light: "resources/play-light.svg",
        dark: "resources/play-dark.svg",
      },
    },
    {
      command: "wingConsole.runAllTests",
      title: "Run all tests",
      icon: {
        light: "resources/play-all-light.svg",
        dark: "resources/play-all-dark.svg",
      },
    },
  ],
  menus: {
    "editor/title": [
      {
        when: "resourceLangId == wing && activeWebviewPanelId != 'wing.console'",
        command: "wing.openConsole",
        group: "navigation",
      },
      {
        when: "resourceLangId != wing && activeWebviewPanelId == 'wing.console'",
        command: "wing.openFile",
        group: "navigation",
      },
    ],
    "view/item/context": [
      {
        command: "wingConsole.runTest",
        when: "view == consoleTestsExplorer",
        group: "inline",
      },
    ],
    "explorer/context": [
      {
        command: "wingConsole.runAllTests",
        when: "view == consoleTestsExplorer",
        group: "inline",
      },
    ],
  },
  configuration: [
    {
      title: "Wing",
      properties: {
        "wing.bin": {
          type: "string",
          description:
            "Path to the Wing binary. Will be `wing` from PATH by default.",
        },
      },
    },
  ],
  views: {
    explorer: [
      {
        id: "consoleExplorer",
        name: "Wing Resources",
      },
      {
        id: "consoleTestsExplorer",
        name: "Wing Tests",
      },
      {
        id: "consoleEndpointsExplorer",
        name: "Wing Endpoints",
      },
    ],
  },
};

project.addFields({
  publisher: "Monada",
  preview: true,
  private: true,
  displayName: "Wing",
  icon: "resources/logo.png",
  engines: {
    vscode: `^${VSCODE_BASE_VERSION}`,
  },
  categories: ["Programming Languages"],
  activationEvents: ["onLanguage:wing"],
  contributes,
});

project.addDevDeps("tsup");

project.compileTask.reset();
project.compileTask.exec("tsup");
project.watchTask.reset("tsup --watch");

project.packageTask.reset(
  "pnpm version ${PROJEN_BUMP_VERSION:-0.0.0} --allow-same-version"
);
project.packageTask.exec(
  "vsce package --no-dependencies -o ../../dist/vscode-wing.vsix"
);

project.addFields({
  volta: {
    extends: "../../package.json",
  },
});

project.package.file.addDeletionOverride("pnpm");
project.tryRemoveFile(".npmrc");

project.addTask("dev").exec("node scripts/dev.mjs");

project.deps.addDependency("@types/node@^20.11.0", DependencyType.DEVENV);

project.synth();
