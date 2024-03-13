import { JsonFile, cdk, javascript, DependencyType } from "projen";

const JSII_DEPS = ["constructs@^10.3"];
const CDKTF_VERSION = "0.20.3";
const AWS_SDK_VERSION = "3.490.0";

const CDKTF_PROVIDERS = [
  "aws@~>5.31.0",
  "random@~>3.5.1",
  "azurerm@~>3.54.0",
  "google@~>5.10.0",
];

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
    include: ["src/**/*.ts", "test/**/*.ts", "*.ts", "*.mts", "scripts/*.mts"],
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
    // change `AWS_SDK_VERSION` to update all deps at once
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
    // tunnels
    "@winglang/wingtunnels@workspace:^",
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
    "nanoid", // for ESM import test in target-sim/function.test.ts
    "chalk",
    "tsx",
    ...JSII_DEPS,
  ],
  eslintOptions: {
    dirs: ["src"],
    devdirs: ["test", "scripts"],
    ignorePatterns: ["src/.gen/", "**/*.d.ts"],
  },
  jest: false,
  depsUpgrade: false,
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
project.defaultTask!.reset("tsx --tsconfig tsconfig.dev.json .projenrc.ts");
project.deps.removeDependency("ts-node");

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

project.deps.addDependency("eslint@^8.56.0", DependencyType.BUILD);
project.deps.addDependency(
  "@typescript-eslint/eslint-plugin@^7",
  DependencyType.BUILD
);
project.deps.addDependency(
  "@typescript-eslint/parser@^7",
  DependencyType.BUILD
);
project.eslint!.addPlugins("sort-exports");
project.eslint!.addOverride({
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

const docgen = project.tasks.tryFind("docgen")!;
docgen.reset();
docgen.exec("tsx scripts/docgen.mts");

// --------------- end of docs -----------------

// set up vitest related config
project.addGitIgnore("/coverage/");
project.testTask.reset("vitest run --update");
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
