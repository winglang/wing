import { javascript, typescript, DependencyType } from "projen";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "wing-api-checker",
  entrypoint: "lib/index.js",
  bin: {
    "wing-api-check": "bin/wing-api-check",
  },
  license: "MIT",
  authorName: "Wing Cloud",
  authorEmail: "ping@wing.cloud",
  authorOrganization: true,
  authorUrl: "https://wing.cloud",
  repository: "https://github.com/winglang/wing.git",
  projenCommand: "pnpm exec projen",
  packageManager: javascript.NodePackageManager.PNPM,
  github: false,
  projenrcTs: true,
  prettier: true,
  package: false,
  deps: ["chalk", "chokidar", "glob-promise", "jsii-reflect", "yargs"],
  devDeps: ["@types/yargs"],
});

const bumpTask = project.tasks.tryFind("bump")!;
bumpTask.reset(
  "pnpm version ${PROJEN_BUMP_VERSION:-0.0.0} --allow-same-version"
);

project.addFields({
  volta: {
    extends: "../../package.json",
  },
});

project.package.file.addDeletionOverride("pnpm");
project.tryRemoveFile(".npmrc");

project.deps.addDependency("@types/node@^20.11.0", DependencyType.DEVENV);

project.synth();
