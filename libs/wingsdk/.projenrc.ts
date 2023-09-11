import { readdirSync } from "fs";
import { JsonFile, cdk, javascript } from "projen";

const UNDOCUMENTED_CLOUD_FILES = ["index", "test-runner"];

const cloudFiles = readdirSync("./src/cloud");

const cloudResources: Set<string> = new Set(
  cloudFiles.map((filename) => filename.split(".")[0])
);

UNDOCUMENTED_CLOUD_FILES.forEach((file) => cloudResources.delete(file));

const undocumentedResources = Array.from(cloudResources).filter(
  (file) => !cloudFiles.includes(`${file}.md`)
);

if (undocumentedResources.length) {
  throw new Error(
    `Detected undocumented resources: ${undocumentedResources.join(
      ", "
    )}. Please add the corresponding .md files in ./src/cloud folder.`
  );
}

const JSII_DEPS = ["constructs@~10.2.69"];
const CDKTF_VERSION = "0.17.0";

const CDKTF_PROVIDERS = [
  "aws@~>4.65.0",
  "random@~>3.5.1",
  "azurerm@~>3.54.0",
  "google@~>4.63.1",
];

const PUBLIC_MODULES = ["std", "http", "util", "aws", "ex"];

const CLOUD_DOCS_PREFIX = "../../docs/docs/04-standard-library/01-cloud/";

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
  author: "Wing Cloud",
  authorOrganization: true,
  authorAddress: "ping@monada.co",
  repositoryUrl: "https://github.com/winglang/wing.git",
  repositoryDirectory: "libs/wingsdk",
  license: "MIT",
  stability: "experimental",
  defaultReleaseBranch: "main",
  peerDeps: [...JSII_DEPS],
  deps: [...JSII_DEPS],
  tsconfig: {
    compilerOptions: {
      lib: ["es2020", "dom", "dom.iterable"],
    },
  },
  bundledDeps: [
    `cdktf@${CDKTF_VERSION}`,
    ...sideLoad,
    // preflight dependencies
    "esbuild-wasm",
    "safe-stable-stringify",
    // aws client dependencies
    // (note: these should always be updated together, otherwise they will
    // conflict with each other)
    "@aws-sdk/client-cloudwatch-logs@3.405.0",
    "@aws-sdk/client-dynamodb@3.405.0",
    "@aws-sdk/client-elasticache@3.405.0",
    "@aws-sdk/util-dynamodb@3.405.0",
    "@aws-sdk/client-lambda@3.405.0",
    "@aws-sdk/client-s3@3.405.0",
    "@aws-sdk/client-secrets-manager@3.405.0",
    "@aws-sdk/client-sqs@3.405.0",
    "@aws-sdk/client-sns@3.405.0",
    "@aws-sdk/types@3.398.0",
    "@aws-sdk/util-stream-node@3.350.0",
    "@aws-sdk/util-utf8-node@3.259.0",
    "@types/aws-lambda",
    // the following 2 deps are required by @aws-sdk/util-utf8-node
    "@aws-sdk/util-buffer-from@3.208.0",
    "@aws-sdk/is-array-buffer@3.201.0",
    "mime-types",
    // azure client dependencies
    "@azure/storage-blob@12.14.0",
    "@azure/identity@3.1.3",
    "@azure/core-paging",
    // simulator dependencies
    "express",
    "uuid",
    // using version 3 because starting from version 4, it no longer works with CommonJS.
    "nanoid@^3.3.6",
    "cron-parser",
    // shared client dependencies
    "ioredis",
    "jsonschema",
  ],
  devDeps: [
    `@cdktf/provider-aws@^15.0.0`, // only for testing Wing plugins
    "wing-api-checker",
    "bump-pack",
    "@types/aws-lambda",
    "@types/fs-extra",
    "@types/mime-types",
    "@types/express",
    "aws-sdk-client-mock",
    "aws-sdk-client-mock-jest",
    `cdktf-cli@${CDKTF_VERSION}`,
    "eslint-plugin-sort-exports",
    "fs-extra",
    "vitest",
    "@types/uuid",
    "@vitest/coverage-v8",
    "nanoid", // for ESM import test in target-sim/function.test.ts
    ...JSII_DEPS,
  ],
  jest: false,
  prettier: true,
  npmignoreEnabled: false,
  minNodeVersion: "18.13.0",
  projenCommand: "pnpm exec projen",
  packageManager: javascript.NodePackageManager.PNPM,
  codeCov: true,
  codeCovTokenSecret: "CODECOV_TOKEN",
  github: false,
  projenrcTs: true,
  jsiiVersion: "5.0.11",
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
project.addDevDeps("@winglang/jsii-docgen");

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
  // Makes sure that all methods and properties are marked with the right member accessibility- public, protected or private
  "@typescript-eslint/explicit-member-accessibility": [
    "error",
    {
      accessibility: "explicit",
      overrides: {
        accessors: "off",
        constructors: "off",
        methods: "explicit",
        properties: "explicit",
        parameterProperties: "explicit",
      },
    },
  ],
  // Makes sure comments and doc strings are capitalized
  "capitalized-comments": [
    "error",
    "always",
    {
      line: {
        // ignore everything
        ignorePattern: ".*",
      },
      block: {
        ignoreConsecutiveComments: true,
        ignorePattern: "pragma|ignored",
        ignoreInlineComments: true,
      },
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
  .reset("pnpm version ${PROJEN_BUMP_VERSION:-0.0.0} --allow-same-version");

project.tasks
  .tryFind("unbump")!
  .reset("pnpm version 0.0.0 --allow-same-version");

// --------------- docs -----------------

const docsPrefix = (idx: number, name: string) => {
  const prefix = idx.toString().padStart(2, "0");
  return `../../docs/docs/04-standard-library/${prefix}-${name}`;
};
const docsFrontMatter = (name: string) => `---
title: API reference
id: api-reference
description: Wing standard library API reference for the ${name} module
keywords: [Wing sdk, sdk, Wing API Reference]
hide_title: true
sidebar_position: 100
---

<!-- This file is automatically generated. Do not edit manually. -->
`;

const docgen = project.tasks.tryFind("docgen")!;
docgen.reset();

// copy readme docs
docgen.exec(`cp -r src/cloud/*.md ${CLOUD_DOCS_PREFIX}`);

// generate api reference for each submodule
for (const mod of PUBLIC_MODULES) {
  const prefix = docsPrefix(PUBLIC_MODULES.indexOf(mod) + 2, mod);
  const docsPath = prefix + "/api-reference.md";
  docgen.exec(`jsii-docgen -o API.md -l wing --submodule ${mod}`);
  docgen.exec(`mkdir -p ${prefix}`);
  docgen.exec(`echo '${docsFrontMatter(mod)}' > ${docsPath}`);
  docgen.exec(`cat API.md >> ${docsPath}`);
}

// generate api reference for each cloud/submodule and append it to the doc file
for (const mod of cloudResources) {
  const docsPath = `${CLOUD_DOCS_PREFIX}${mod}.md`;
  docgen.exec(`jsii-docgen -o API.md -l wing --submodule cloud/${mod}`);
  docgen.exec(`cat API.md >> ${docsPath}`);
}

docgen.exec("rm API.md");

// --------------- end of docs -----------------

// set up vitest related config
project.addGitIgnore("/coverage/");
project.testTask.reset("vitest run --coverage --update --passWithNoTests");
const testWatch = project.addTask("test:watch");
testWatch.exec("vitest"); // Watch is default mode for vitest
testWatch.description = "Run vitest in watch mode";
project.testTask.spawn(project.eslint?.eslintTask!);

project.addFields({
  volta: {
    extends: "../../package.json",
  },
});
project.addFields({
  "bump-pack": {
    removeBundledDependencies: sideLoad.map((sideDep) => sideDep.split("@")[0]),
  },
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
project.gitignore.addPatterns("src/.gen");

project.preCompileTask.exec("cdktf get --force");

project.package.file.addDeletionOverride("pnpm");
project.tryRemoveFile(".npmrc");

project.packageTask.reset("bump-pack -b");

project.synth();
