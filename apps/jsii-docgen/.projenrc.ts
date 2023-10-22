import { typescript, javascript } from "projen";

const project = new typescript.TypeScriptProject({
  name: "@winglang/jsii-docgen",
  description: "Generates API docs for Wing libraries",
  repository: "https://github.com/winglang/wing",
  authorName: "Wing Cloud",
  authorEmail: "ping@wing.cloud",
  authorOrganization: true,
  authorUrl: "https://wing.cloud",
  defaultReleaseBranch: "main",
  projenCommand: "pnpm exec projen",

  bin: {
    "jsii-docgen": "bin/jsii-docgen",
  },
  devDeps: [
    "jsii@~5.0.0",
    "@types/fs-extra",
    "@types/semver",
    "@types/yargs@^16",
    "@types/node",
    "constructs",
  ],
  deps: [
    "@jsii/spec",
    "case",
    "fs-extra",
    "glob-promise",
    "glob",
    "jsii-reflect",
    "jsii-rosetta",
    "semver",
    "yargs@^16",
  ],
  packageManager: javascript.NodePackageManager.PNPM,
  github: false,
  projenrcTs: true,
  prettier: true,
  release: false,
  package: false,
});

const libraryFixtures = ["construct-library"];

// compile the test fixtures with jsii
for (const library of libraryFixtures) {
  project.compileTask.exec("pnpm compile", {
    cwd: `./test/__fixtures__/libraries/${library}`,
  });
}

// artifacts created by transpilation in tests
project.gitignore.exclude("test/**/.jsii.*");

// local vscode configuration
project.gitignore.exclude(".vscode/");

project.tasks.addEnvironment("NODE_OPTIONS", "--max-old-space-size=7168");
// Avoid a non JSII compatible package (see https://github.com/projen/projen/issues/2264)
// project.package.addPackageResolutions("@types/babel__traverse@7.18.2");

// override default test timeout from 5s to 30s
project.testTask.reset(
  "jest --passWithNoTests --all --updateSnapshot --coverageProvider=v8 --testTimeout=30000"
);

project.addFields({
  volta: {
    extends: "../../package.json",
  },
});

project.package.file.addDeletionOverride("pnpm");
project.tryRemoveFile(".npmrc");

project.synth();
