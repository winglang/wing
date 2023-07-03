const { typescript, javascript } = require("projen");
const rootPackageJson = require("../../package.json");

const project = new typescript.TypeScriptProject({
  name: "@winglang/jsii-docgen",
  description: "Generates API docs for Wing libraries",
  repository: "https://github.com/winglang/wing",
  authorName: "Monada",
  authorEmail: "ping@monada.co",
  authorOrganization: true,
  authorUrl: "https://monada.co",
  defaultReleaseBranch: "main",

  bin: {
    "jsii-docgen": "bin/jsii-docgen",
  },
  devDeps: ["@types/fs-extra", "@types/semver"],
  deps: [
    "@jsii/spec",
    "case",
    "fs-extra",
    "glob-promise",
    "glob",
    "jsii-reflect",
    "jsii-rosetta",
    "semver",
    "yargs",
  ],
  compileBeforeTest: true, // we need this for the CLI test
  releaseToNpm: true,
  packageManager: javascript.NodePackageManager.NPM,
  github: false,
  projenrcTs: true,
  prettier: true,
});

const libraryFixtures = ["construct-library"];

// compile the test fixtures with jsii
for (const library of libraryFixtures) {
  project.compileTask.exec("npm ci", {
    cwd: `./test/__fixtures__/libraries/${library}`,
  });
  project.compileTask.exec("npm run compile", {
    cwd: `./test/__fixtures__/libraries/${library}`,
  });
}

// artifacts created by transpilation in tests
project.gitignore.exclude("test/**/.jsii.*");

// local vscode configuration
project.gitignore.exclude(".vscode/");

project.tasks.addEnvironment("NODE_OPTIONS", "--max-old-space-size=7168");
// Avoid a non JSII compatible package (see https://github.com/projen/projen/issues/2264)
project.package.addPackageResolutions("@types/babel__traverse@7.18.2");

// override default test timeout from 5s to 30s
project.testTask.reset(
  "jest --passWithNoTests --all --updateSnapshot --coverageProvider=v8 --testTimeout=30000"
);

project.addFields({
  volta: rootPackageJson.volta,
});

// We use of symlinks between several projects but we do not use workspaces
project.npmrc.addConfig("install-links", "false");
project.npmrc.addConfig("fund", "false");

project.synth();
