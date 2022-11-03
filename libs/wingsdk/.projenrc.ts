import { JsonFile, cdk, javascript } from "projen";

const project = new cdk.JsiiProject({
  name: "@winglang/wingsdk",
  author: "Monada, Inc.",
  authorOrganization: true,
  authorAddress: "ping@monada.co",
  repositoryUrl: "https://github.com/winglang/wingsdk.git",
  stability: "experimental",
  defaultReleaseBranch: "main",
  peerDeps: [
    "constructs@~10.0.25",
    "@winglang/polycons",
    "cdktf",
    "@cdktf/provider-aws",
  ],
  bundledDeps: [
    "safe-stable-stringify",
    // preflight dependencies
    "esbuild-wasm",
    // aws client dependencies
    "@aws-sdk/client-s3",
    "@aws-sdk/client-lambda",
    "@aws-sdk/client-sqs",
    "@aws-sdk/client-cloudwatch-logs",
    "@aws-sdk/util-utf8-node",
    // simulator dependencies
    "tar",
  ],
  devDeps: [
    "@winglang/wing-api-checker@file:../../apps/wing-api-checker",
    "@types/aws-lambda",
    "@types/fs-extra",
    "@types/tar",
    "aws-sdk-client-mock",
    "patch-package",
  ],
  prettier: true,
  minNodeVersion: "16.16.0",
  npmRegistryUrl: "https://npm.pkg.github.com",
  packageManager: javascript.NodePackageManager.NPM,
  codeCov: true,
  codeCovTokenSecret: "CODECOV_TOKEN",
  github: false,
  projenrcTs: true,
});

// fix typing issues with "tar" dependency
project.package.addDevDeps("minipass@3.1.6", "@types/minipass@3.1.2");
project.package.addPackageResolutions("minipass@3.1.6");

// tasks for locally testing the SDK without needing wing compiler
project.addDevDeps("tsx");
project.addDevDeps("cdktf-cli");
const sandboxDir = "test/sandbox";
project.addTask("sandbox:synth", {
  exec: "tsx main.ts --tsconfig ../../tsconfig.dev.json",
  cwd: sandboxDir,
});
project.addTask("sandbox:deploy", {
  exec: "cdktf deploy",
  cwd: sandboxDir,
});
project.addTask("sandbox:destroy", {
  exec: "cdktf destroy",
  cwd: sandboxDir,
});

// Set up the project so that:
// 1. Preflight code is compiled with JSII
// 2. Inflight and simulator code is compiled with TypeScript
//
// Note: inflight and preflight code are not automatically exported from
// the root of the package, so accessing them requires barrel imports:
// const { BucketClient } = require("wingsdk/lib/aws/bucket.inflight");
const pkgJson = project.tryFindObjectFile("package.json");
pkgJson!.addOverride("jsii.excludeTypescript", [
  "src/**/*.inflight.ts",
  "src/**/*.sim.ts",
  "src/**/exports.ts",
]);

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
    include: ["src/**/*.inflight.ts", "src/**/*.sim.ts", "src/**/exports.ts"],
    exclude: ["node_modules"],
  },
});
project.compileTask.exec(`tsc -p ${tsconfigNonJsii.path}`);

enum Zone {
  PREFLIGHT = "preflight",
  INFLIGHT = "inflight",
  SIMULATOR = "simulator",
  TEST = "test",
}

function zonePattern(zone: Zone): string {
  switch (zone) {
    case Zone.PREFLIGHT:
      return srcPathsNotEndingIn([
        "*.inflight.ts",
        "*.sim.ts",
        "*.test.ts",
        "exports.ts",
      ]);
    case Zone.TEST:
      return "src/**/*.test.ts";
    case Zone.INFLIGHT:
      return "src/**/*.inflight.ts";
    case Zone.SIMULATOR:
      return "src/**/*.sim.ts";
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
        disallowImportsRule(Zone.PREFLIGHT, Zone.SIMULATOR),
        // implementation details of simulator should not be leaked to inflight code
        disallowImportsRule(Zone.INFLIGHT, Zone.SIMULATOR),
      ],
    },
  ],
});

project.npmignore?.addPatterns(
  "tsconfig.nonjsii.json",
  ".prettierignore",
  ".prettierrc.json"
);

const apiCheck = project.addTask("api-check", {
  exec: "wing-api-check",
});
project.addTask("api-check:watch", {
  exec: "wing-api-check --watch",
});
project.postCompileTask.prependSpawn(apiCheck);

const bumpTask = project.tasks.tryFind("bump")!;
bumpTask.reset(
  "npm version ${PROJEN_BUMP_VERSION:-0.0.0} --allow-same-version"
);

// Add custom export declarations that supersede the default export structure of
// `index.ts` files. This allows us to export APIs that aren't compiled
// with JSII without the JSII compiler noticing.
project.package.addField("exports", {
  ".": "./lib/exports.js",
  "./cloud": "./lib/cloud/exports.js",
  "./fs": "./lib/fs/exports.js",
  "./sim": "./lib/sim/exports.js",
  "./testing": "./lib/testing/exports.js",
  "./tf-aws": "./lib/tf-aws/exports.js",
});

project.preCompileTask.exec("patch-package");

project.tasks.tryFind("docgen")!.exec("cp API.md ../../docs/wingsdk-api.md");

project.synth();
