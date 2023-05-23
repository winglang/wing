import { JsonFile, cdk, javascript } from "projen";
import rootPackageJson from "../../package.json";

const JSII_DEPS = ["constructs@~10.1.228"];
const CDKTF_VERSION = "0.15.2";

const CDKTF_PROVIDERS = [
  "aws@~>4.65.0",
  "random@~>3.5.1",
  "azurerm@~>3.54.0",
  "google@~>4.63.1",
];

// defines the list of dependencies required for each compilation target that is not built into the
// compiler (like Terraform targets).
const TARGET_DEPS = {
  awscdk: ["aws-cdk-lib@^2.64.0"],
};

// we treat all the non-builtin dependencies as "side loaded". this means that we will remove them
// from the "package.json" just before we bundle the package and the Wing CLI will require the user
// to install them at runtime
const sideLoad = Object.values(TARGET_DEPS).flat();

const project = new cdk.JsiiProject({
  name: "@winglang/sdk",
  author: "Monada, Inc.",
  authorOrganization: true,
  authorAddress: "ping@monada.co",
  repositoryUrl: "https://github.com/winglang/wing.git",
  repositoryDirectory: "libs/wingsdk",
  license: "MIT",
  stability: "experimental",
  defaultReleaseBranch: "main",
  peerDeps: [...JSII_DEPS],
  deps: [...JSII_DEPS],
  bundledDeps: [
    `cdktf@${CDKTF_VERSION}`,
    ...sideLoad,
    // preflight dependencies
    "esbuild-wasm",
    "safe-stable-stringify",
    // aws client dependencies
    // (note: these should always be updated together, otherwise they will
    // conflict with each other)
    "@aws-sdk/client-cloudwatch-logs@3.256.0",
    "@aws-sdk/client-dynamodb@3.256.0",
    "@aws-sdk/client-elasticache@3.256.0",
    "@aws-sdk/util-dynamodb@3.256.0",
    "@aws-sdk/client-lambda@3.256.0",
    "@aws-sdk/client-s3@3.256.0",
    "@aws-sdk/client-secrets-manager@3.256.0",
    "@aws-sdk/client-sqs@3.256.0",
    "@aws-sdk/client-sns@3.256.0",
    "@aws-sdk/types@3.254.0",
    "@aws-sdk/util-stream-node@3.254.0",
    "@aws-sdk/util-utf8-node@3.208.0",
    "mime-types",
    // azure client dependencies
    "@azure/storage-blob@12.14.0",
    "@azure/identity@3.1.3",
    "@azure/core-paging",
    // simulator dependencies
    "tar",
    "express",
    "uuid",
    "cron-parser",
    // shared client dependencies
    "ioredis",
    "vm2",
  ],
  devDeps: [
    `@cdktf/provider-aws@^12.0.1`, // only for testing Wing plugins
    "@winglang/wing-api-checker@file:../../apps/wing-api-checker",
    "@types/aws-lambda",
    "@types/fs-extra",
    "@types/mime-types",
    "@types/tar",
    "@types/express",
    "aws-sdk-client-mock",
    "aws-sdk-client-mock-jest",
    `cdktf-cli@${CDKTF_VERSION}`,
    "eslint-plugin-sort-exports",
    "fs-extra",
    "patch-package",
    "vitest",
    "@types/uuid",
    "@vitest/coverage-c8",
  ],
  jest: false,
  prettier: true,
  npmignoreEnabled: false,
  minNodeVersion: "16.16.0",
  packageManager: javascript.NodePackageManager.NPM,
  codeCov: true,
  codeCovTokenSecret: "CODECOV_TOKEN",
  github: false,
  projenrcTs: true,
  jsiiVersion: "~5.0.0",
});

project.eslint?.addPlugins("sort-exports");
project.eslint?.addOverride({
  files: ["src/**/index.ts"],
  rules: {
    "sort-exports/sort-exports": ["error", { sortDir: "asc" }],
  },
});

// use fork of jsii-docgen with wing-ish support
project.deps.removeDependency("jsii-docgen");
project.addDevDeps("@winglang/jsii-docgen@file:../../apps/jsii-docgen");

enum Zone {
  PREFLIGHT = "preflight",
  INFLIGHT = "inflight",
  TEST = "test",
}

function zonePattern(zone: Zone): string {
  switch (zone) {
    case Zone.PREFLIGHT:
      return srcPathsNotEndingIn(["*.inflight.ts", "*.test.ts"]);
    case Zone.TEST:
      return "src/**/*.test.ts";
    case Zone.INFLIGHT:
      return "src/**/*.inflight.ts";
  }
}

function srcPathsNotEndingIn(patterns: string[]) {
  return `src/**/!(${patterns.join("|")})`;
}

interface DisallowImportsRule {
  target: string;
  from: string;
  message: string;
}

/**
 * Disallow imports from a specific zone to another zone.
 *
 * @param target The file that should not import from the `from` file
 * @param from The file that should not be imported into the `target` file
 * @returns
 */
function disallowImportsRule(target: Zone, from: Zone): DisallowImportsRule {
  return {
    target: zonePattern(target),
    from: zonePattern(from),
    message: `Importing ${from} code in a ${target} module is not allowed. Add "// eslint-disable-next-line import/no-restricted-paths" to disable.`,
  };
}

// Prevent unsafe imports between preflight and inflight and simulator code
project.eslint!.addRules({
  "import/no-restricted-paths": [
    "error",
    {
      zones: [
        // avoid importing inflight or simulator code into preflight code since
        // preflight code gets compiled with JSII
        disallowImportsRule(Zone.PREFLIGHT, Zone.INFLIGHT),
      ],
    },
  ],
});

project.npmignore?.addPatterns(".prettierignore", ".prettierrc.json", "*.tgz");

const apiCheck = project.addTask("api-check", {
  exec: "wing-api-check",
});
project.addTask("api-check:watch", {
  exec: "wing-api-check --watch",
});
project.postCompileTask.prependSpawn(apiCheck);

project.tasks
  .tryFind("bump")!
  .reset("npm version ${PROJEN_BUMP_VERSION:-0.0.0} --allow-same-version");

project.tasks
  .tryFind("unbump")!
  .reset("npm version 0.0.0 --allow-same-version");

project.preCompileTask.exec("patch-package");

const docsFrontMatter = `---
title: API Reference
id: sdk
description: Wing SDK API Reference
keywords: [Wing sdk, sdk, Wing API Reference]
---
`;

const docsPath = "../../docs/04-reference/wingsdk-api.md";
const docgen = project.tasks.tryFind("docgen")!;
docgen.reset();
docgen.exec(`jsii-docgen -o API.md -l wing`);
docgen.exec(`echo '${docsFrontMatter}' > ${docsPath}`);
docgen.exec(`cat API.md >> ${docsPath}`);

// set up vitest related config
project.addGitIgnore("/coverage/");
project.testTask.reset("vitest run --coverage --update --passWithNoTests");
const testWatch = project.addTask("test:watch");
testWatch.exec("vitest"); // Watch is default mode for vitest
testWatch.description = "Run vitest in watch mode";
project.testTask.spawn(project.eslint?.eslintTask!);

project.addFields({
  volta: rootPackageJson.volta,
});

project.addFields({
  files: ["lib", ".jsii", "API.md", "patches"],
});

project.gitignore.addPatterns("src/**/*.js", "src/**/*.d.ts");

// generate CDKTF bindings
new JsonFile(project, "cdktf.json", {
  obj: {
    language: "typescript",
    app: "echo noop",
    terraformProviders: CDKTF_PROVIDERS,
    codeMakerOutput: "src/.gen",
    projectId: "93afdbfa-23ed-40cf-9ce4-495b3289c519",
  },
});
project.gitignore.addPatterns("src/.gen/providers");

project.preCompileTask.exec("cdktf get");

const packageJsonBack = "package.json.bak";
const removeBundledDeps = project.addTask("remove-bundled-deps");
removeBundledDeps.exec(`cp package.json ${packageJsonBack}`);
for (const dep of sideLoad) {
  removeBundledDeps.exec(
    `./scripts/remove-bundled-dep.js ${dep.split("@")[0]}`
  );
}

const restoreBundleDeps = project.addTask("restore-bundled-deps");
restoreBundleDeps.exec(`mv ${packageJsonBack} package.json`);

project.tasks.tryFind("bump")?.spawn(removeBundledDeps);
project.tasks.tryFind("unbump")?.spawn(restoreBundleDeps);

// We use symlinks between several projects but we do not use workspaces
project.npmrc.addConfig("install-links", "false");

project.synth();
