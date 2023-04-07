import { join } from "path";
import { JsonFile, cdk, javascript } from "projen";
import rootPackageJson from "../../package.json";

const JSII_DEPS = [
  "constructs@~10.1.228",
  "cdktf@0.15.2",
  "@cdktf/provider-random@^5.0.0",
  "@cdktf/provider-aws@^12.0.1",
  "@cdktf/provider-azurerm@^5.0.1",
  "@cdktf/provider-google@^5.0.2",
  "aws-cdk-lib@^2.64.0",
];

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
    // preflight dependencies
    "debug",
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
    "@aws-sdk/client-sqs@3.256.0",
    "@aws-sdk/client-sns@3.256.0",
    "@aws-sdk/types@3.254.0",
    "@aws-sdk/util-stream-node@3.254.0",
    "@aws-sdk/util-utf8-node@3.208.0",
    // azure client dependencies
    "@azure/storage-blob@12.12.0",
    "@azure/identity@3.1.3",
    "@azure/core-paging",
    // simulator dependencies
    "tar",
    "express",
    "uuid",
    // shared client dependencies
    "ioredis",
  ],
  devDeps: [
    "@winglang/wing-api-checker@file:../../apps/wing-api-checker",
    "@types/aws-lambda",
    "@types/debug",
    "@types/fs-extra",
    "@types/tar",
    // use older versions of these types to avoid conflicts with jsii
    "@types/express@4.17.13",
    "@types/express-serve-static-core@4.17.28",
    "aws-sdk-client-mock",
    "aws-sdk-client-mock-jest",
    "eslint-plugin-sort-exports",
    "patch-package",
    "vitest",
    "@types/uuid",
    "@vitest/coverage-c8",
  ],
  prettier: true,
  npmignoreEnabled: false,
  minNodeVersion: "16.16.0",
  packageManager: javascript.NodePackageManager.NPM,
  codeCov: true,
  codeCovTokenSecret: "CODECOV_TOKEN",
  github: false,
  projenrcTs: true,
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

// tasks for locally testing the SDK without needing wing compiler
project.addDevDeps("tsx");
const sandboxDir = join("test", "sandbox");

const sandboxSynth = project.addTask("sandbox:synth", {
  exec: "tsx main.ts --tsconfig ../../tsconfig.dev.json",
  cwd: sandboxDir,
});

const sandboxDeploy = project.addTask("sandbox:deploy", {
  cwd: join("test", "sandbox", "target"),
});
sandboxDeploy.spawn(sandboxSynth);
sandboxDeploy.exec("terraform init");
sandboxDeploy.exec("terraform apply");

const sandboxDestroy = project.addTask("sandbox:destroy", {
  cwd: sandboxDir,
});
sandboxDestroy.exec("terraform destroy");

// Set up the project so that:
// 1. Preflight code is compiled with JSII
// 2. Inflight and simulator code is compiled with TypeScript
//
// Note: inflight and preflight code are not automatically exported from
// the root of the package, so accessing them requires barrel imports:
// const { BucketClient } = require("wingsdk/lib/aws/bucket.inflight");
const pkgJson = project.tryFindObjectFile("package.json");
pkgJson!.addOverride("jsii.excludeTypescript", ["src/**/*.inflight.ts"]);

// By default, the TypeScript compiler will include all types from @types, even
// if the package is not used anywhere in our source code (`/src`). This is
// problematic because JSII is stuck on an older TypeScript version, and we only
// want it to compile the types exported by index.ts.
//
// Let's ignore these types by default, and then explicitly include the ones we
// need for JSII compilation to work. This is OK since we are compiling things
// twice (once with JSII, and once with the latest version of TypeScript), and
// any other type errors can be caught by the second compilation.
//
// See https://github.com/aws/jsii/issues/3741
//
// @example ["./node_modules/@types/some-dep"]
pkgJson!.addOverride("jsii.tsc.types", []);

const tsconfigNonJsii = new JsonFile(project, "tsconfig.nonjsii.json", {
  obj: {
    extends: "./tsconfig.json",
    compilerOptions: {
      esModuleInterop: true,
    },
    include: ["src/**/*.inflight.ts"],
    exclude: ["node_modules"],
  },
});
project.compileTask.exec(`tsc -p ${tsconfigNonJsii.path}`);

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

project.npmignore?.addPatterns(
  "tsconfig.nonjsii.json",
  ".prettierignore",
  ".prettierrc.json",
  "*.tgz"
);

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

// override default test timeout from 5s to 30s
project.testTask.reset("vitest run --coverage --update --passWithNoTests");
const testWatch = project.tasks.tryFind("test:watch")!;
testWatch.reset();
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

project.synth();
