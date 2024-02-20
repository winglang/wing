import { readdirSync } from "fs";
import { join } from "path";
import { JsonFile, cdk, javascript, DependencyType } from "projen";
import * as cloud from "./src";

const JSII_DEPS = ["constructs@^10.3"];
const CDKTF_VERSION = "0.20.3";
const AWS_SDK_VERSION = "3.490.0";

const CDKTF_PROVIDERS = [
  "aws@~>5.31.0",
  "random@~>3.5.1",
  "azurerm@~>3.54.0",
  "google@~>5.10.0",
];

// those will be skipped out of the docs
const SKIPPED_MODULES = [
  "cloud",
  "ex",
  "std",
  "simulator",
  "core",
  "platform",
  "helpers",
];
const publicModules = Object.keys(cloud).filter(
  (item) => !SKIPPED_MODULES.includes(item)
);

const CLOUD_DOCS_PREFIX = "../../docs/docs/04-standard-library/cloud/";
const EX_DOCS_PREFIX = "../../docs/docs/04-standard-library/ex/";
const STD_DOCS_PREFIX = "../../docs/docs/04-standard-library/std/";

// defines the list of dependencies required for each compilation target that is not built into the
// compiler (like Terraform targets).
const TARGET_DEPS: { [key: string]: string[] } = {};

// we treat all the non-builtin dependencies as "side loaded". this means that we will remove them
// from the "package.json" just before we bundle the package and the Wing CLI will require the user
// to install them at runtime
const sideLoad = Object.values(TARGET_DEPS).flat();

const project = new cdk.JsiiProject({
  name: "@winglang/sdk",
  author: "Wing Cloud",
  authorOrganization: true,
  authorAddress: "ping@wing.cloud",
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
    "safe-stable-stringify",
    // aws sdk client dependencies
    // update `AWS_SDK_VERSION` to change all at once
    "@aws-sdk/client-cloudwatch-logs",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/client-elasticache",
    "@aws-sdk/client-lambda",
    "@aws-sdk/client-s3",
    "@aws-sdk/client-secrets-manager",
    "@aws-sdk/client-sns",
    "@aws-sdk/client-sqs",
    "@aws-sdk/s3-request-presigner",
    "@aws-sdk/util-dynamodb",
    // aws other client dependencies
    "@smithy/util-stream@2.0.17",
    "@smithy/util-utf8@2.0.0",
    "@types/aws-lambda",
    "@aws-sdk/types",
    "mime-types",
    "mime@^3.0.0",
    // azure client dependencies
    "@azure/storage-blob@12.14.0",
    "@azure/data-tables@13.2.2",
    "@azure/identity@4.0.1",
    "@azure/core-paging",
    // gcp client dependencies
    "@google-cloud/storage@6.9.5",
    "@google-cloud/datastore@8.4.0",
    "google-auth-library",
    "protobufjs@7.2.5",
    // simulator dependencies
    "express",
    "uuid",
    "undici",
    // using version 3 because starting from version 4, it no longer works with CommonJS.
    "nanoid@^3.3.6",
    "cron-parser",
    // shared client dependencies
    "ioredis",
    "jsonschema",
    "ajv",
    // fs module dependency
    "yaml",
    "toml",
    // enhanced diagnostics
    "stacktracey",
    "ulid",
  ],
  devDeps: [
    `@cdktf/provider-aws@^19`, // only for testing Wing plugins
    "wing-api-checker",
    "bump-pack",
    "@types/aws-lambda",
    "@types/fs-extra",
    "@types/mime-types",
    "mock-gcs@^1.2.0",
    "@types/express",
    "aws-sdk-client-mock@3.0.0",
    "aws-sdk-client-mock-jest@3.0.0",
    `cdktf-cli@${CDKTF_VERSION}`,
    "eslint-plugin-sort-exports",
    "fs-extra",
    "vitest",
    "@types/uuid",
    "@vitest/coverage-v8",
    "nanoid", // for ESM import test in target-sim/function.test.ts
    "chalk",
    ...JSII_DEPS,
  ],
  jest: false,
  prettier: true,
  npmignoreEnabled: false,
  minNodeVersion: "20.0.0",
  projenCommand: "pnpm exec projen",
  packageManager: javascript.NodePackageManager.PNPM,
  codeCov: true,
  codeCovTokenSecret: "CODECOV_TOKEN",
  github: false,
  projenrcTs: true,
  jsiiVersion: "~5.3.11",
});

/**
 * Pin AWS SDK version and keep deps in sync
 *
 * `@aws-sdk/types` is excluded since it gets updated independently
 * and its version may not match that of the AWS SDK clients
 */
project.deps.all
  .filter(
    (dep) => dep.name.startsWith("@aws-sdk/") && dep.name !== "@aws-sdk/types"
  )
  .map((dep) => project.addBundledDeps(`${dep.name}@${AWS_SDK_VERSION}`));

project.eslint?.addPlugins("sort-exports");
project.eslint?.addOverride({
  files: ["src/**/index.ts"],
  rules: {
    "sort-exports/sort-exports": ["error", { sortDir: "asc" }],
  },
});

project.package.addField("optionalDependencies", {
  esbuild: "^0.19.12",
});

// use fork of jsii-docgen with wing-ish support
project.deps.removeDependency("jsii-docgen");
project.addDevDeps("@winglang/jsii-docgen");
project.deps.removeDependency("jsii-rosetta");

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
  "@typescript-eslint/no-misused-promises": "error",
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

const docsPrefix = (name: string) => {
  return `../../docs/docs/04-standard-library/${name}`;
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

// generate api reference for each submodule
for (const mod of publicModules) {
  const prefix = docsPrefix(mod);
  const docsPath = prefix + "/api-reference.md";
  docgen.exec(`jsii-docgen -o API.md -l wing --submodule ${mod}`);
  docgen.exec(`mkdir -p ${prefix}`);
  docgen.exec(`echo '${docsFrontMatter(mod)}' > ${docsPath}`);
  docgen.exec(`cat API.md >> ${docsPath}`);
}

const UNDOCUMENTED_CLOUD_FILES = ["index", "test-runner"];
const UNDOCUMENTED_EX_FILES = ["index", "dynamodb-table"];

const toCamelCase = (str: string) =>
  str.replace(/_(.)/g, (_, chr) => chr.toUpperCase());

function generateResourceApiDocs(
  module: string,
  pathToFolder: string,
  options: {
    docsPath: string;
    excludedFiles?: string[];
    allowUndocumented?: boolean;
  }
) {
  const { docsPath, excludedFiles = [], allowUndocumented = false } = options;

  // copy readme docs
  docgen.exec(`cp -r ${pathToFolder}/*.md ${docsPath}`);

  const cloudFiles = readdirSync(pathToFolder);

  const cloudResources: Set<string> = new Set(
    cloudFiles.map((filename: string) => filename.split(".")[0])
  );

  excludedFiles.forEach((file) => cloudResources.delete(file));

  const undocumentedResources = Array.from(cloudResources).filter(
    (file) => !cloudFiles.includes(`${file}.md`)
  );

  if (undocumentedResources.length && !allowUndocumented) {
    throw new Error(
      `Detected undocumented resources: ${undocumentedResources.join(
        ", "
      )}. Please add the corresponding .md files in ${pathToFolder} folder.`
    );
  }

  // generate api reference for each cloud/submodule and append it to the doc file
  for (const mod of cloudResources) {
    if (undocumentedResources.includes(mod)) {
      // adding a title
      docgen.exec(
        `echo "---\ntitle: ${toCamelCase(mod)}\nid: ${toCamelCase(
          mod
        )}\n---\n\n" > ${docsPath}${mod}.md`
      );
    }
    docgen.exec(`jsii-docgen -o API.md -l wing --submodule ${module}/${mod}`);
    docgen.exec(`cat API.md >> ${docsPath}${mod}.md`);
  }
}

generateResourceApiDocs("cloud", "./src/cloud", {
  docsPath: CLOUD_DOCS_PREFIX,
  excludedFiles: UNDOCUMENTED_CLOUD_FILES,
});
generateResourceApiDocs("ex", "./src/ex", {
  docsPath: EX_DOCS_PREFIX,
  excludedFiles: UNDOCUMENTED_EX_FILES,
});

generateResourceApiDocs("ex/dynamodb-table", "./src/ex/dynamodb-table", {
  docsPath: join(EX_DOCS_PREFIX, "/dynamodb-table/"),
  excludedFiles: ["index"],
});

generateResourceApiDocs("std", "./src/std", {
  docsPath: STD_DOCS_PREFIX,
  excludedFiles: [
    "README",
    "index",
    "test-runner",
    "resource",
    "test",
    "range",
    "generics",
  ],
  allowUndocumented: true,
});

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

project.preCompileTask.exec("cdktf get");

project.package.file.addDeletionOverride("pnpm");

project.tryRemoveFile(".npmrc");

project.packageTask.reset("bump-pack -b");

project.deps.addDependency("@types/node@^20.11.0", DependencyType.DEVENV);

project.synth();
