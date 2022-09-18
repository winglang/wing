const { cdk, github, javascript, JsonFile } = require("projen");

const project = new cdk.JsiiProject({
  name: "@monadahq/wingsdk",
  author: "Monada, Inc.",
  authorOrganization: true,
  authorAddress: "ping@monada.co",
  repository: "https://github.com/monadahq/wingsdk.git",
  stability: "experimental",
  defaultReleaseBranch: "main",
  peerDeps: [
    "constructs@^10.0.25",
    "@monadahq/polycons@^0.0.36",
    "cdktf",
    "@cdktf/provider-aws",
  ],
  bundledDeps: [
    // preflight dependencies
    "esbuild-wasm",
    // aws client dependencies
    "@aws-sdk/client-s3",
    "@aws-sdk/client-lambda",
    "@aws-sdk/util-utf8-node",
    // simulator client dependencies
    "node-fetch@^2.6.7",
    "@trpc/client",
    // simulator implementation dependencies
    "piscina",
    "filenamify",
  ],
  devDeps: ["replace-in-file", "@types/node-fetch@^2.6.2"],
  prettier: true,
  jestOptions: {
    jestVersion: "^27.0.0", // 28 requires a later typescript version
  },
  minNodeVersion: "16.16.0",
  workflowNodeVersion: "16.x",
  npmRegistryUrl: "https://npm.pkg.github.com",
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["monada-bot[bot]"],
    secret: "PROJEN_GITHUB_TOKEN",
  },
  packageManager: javascript.NodePackageManager.NPM,
  gitignore: [".DS_Store"],
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
  },
  codeCov: true,
  codeCovTokenSecret: "CODECOV_TOKEN",
  workflowBootstrapSteps: [
    {
      name: "Login to private npm registry",
      run: "npm config set @monadahq:registry https://npm.pkg.github.com && npm set //npm.pkg.github.com/:_authToken $PROJEN_GITHUB_TOKEN",
      env: {
        PROJEN_GITHUB_TOKEN: "${{ secrets.PROJEN_GITHUB_TOKEN }}",
      },
    },
  ],
});

// use a more recent version of jest-resolve so that tests will not error
// when using require("@scope/package/path")
// https://github.com/facebook/jest/pull/11961
project.package.addPackageResolutions("jest-resolve@^28");

// allow referencing DOM types (used by esbuild)
project.preCompileTask.exec(
  `replace-in-file "lib: ['lib.es2020.d.ts']" "lib: ['lib.es2020.d.ts','lib.dom.d.ts']" node_modules/jsii/lib/compiler.js`
);

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

// fix publishing steps so they can also install private dependencies
// so so hacky :/
const releaseWorkflow = project.tryFindObjectFile(
  ".github/workflows/release.yml"
);
releaseWorkflow.addOverride(
  "jobs.release_npm.steps.2.run",
  "mv dist .repo && npm config set @monadahq:registry https://npm.pkg.github.com && npm set //npm.pkg.github.com/:_authToken $PROJEN_GITHUB_TOKEN"
);
releaseWorkflow.addOverride("jobs.release_npm.steps.2.env", {
  PROJEN_GITHUB_TOKEN: "${{ secrets.PROJEN_GITHUB_TOKEN }}",
});

const buildWorkflow = project.tryFindObjectFile(".github/workflows/build.yml");
buildWorkflow.addOverride(
  "jobs.package-js.steps.2.run",
  "mv dist .repo && npm config set @monadahq:registry https://npm.pkg.github.com && npm set //npm.pkg.github.com/:_authToken $PROJEN_GITHUB_TOKEN"
);
buildWorkflow.addOverride("jobs.package-js.steps.2.env", {
  PROJEN_GITHUB_TOKEN: "${{ secrets.PROJEN_GITHUB_TOKEN }}",
});

// Set up the project so that:
// 1. Preflight code is compiled with JSII
// 2. Inflight and simulator code is compiled with TypeScript
//
// Note: inflight and preflight code are not automatically exported from
// the root of the package, so accessing them requires barrel imports:
// const { BucketClient } = require("wingsdk/lib/aws/bucket.inflight");
const pkgJson = project.tryFindObjectFile("package.json");
pkgJson.addOverride("jsii.excludeTypescript", [
  "src/**/*.inflight.ts",
  "src/**/*.sim.ts",
]);
const tsconfigNonJsii = new JsonFile(project, "tsconfig.nonjsii.json", {
  obj: {
    extends: "./tsconfig.json",
    compilerOptions: {
      esModuleInterop: true,
    },
    include: ["src/**/*.inflight.ts", "src/**/*.sim.ts"],
    exclude: ["node_modules"],
  },
});
project.compileTask.exec(`tsc -p ${tsconfigNonJsii.path}`);

// Prevent unsafe imports between preflight and inflight and simulator code
project.eslint.addRules({
  "import/no-restricted-paths": [
    "error",
    {
      zones: [
        {
          target: "**/!(*.inflight.ts|*.sim.ts)",
          from: "**/*.inflight.ts",
          message: "Preflight code should not import from inflight code.",
        },
        {
          target: "**/!(*.inflight.ts|*.sim.ts)",
          from: "**/*.sim.ts",
          message: "Preflight code should not import from simulation code.",
        },
        {
          target: "**/*.sim.ts",
          from: "**/*.inflight.ts",
          message: "Simulation code should not import from inflight code.",
        },
        {
          target: "**/*.inflight.ts",
          from: "**/*.sim.ts",
          message: "Inflight code should not import from simulation code.",
        },
      ],
    },
  ],
});

project.synth();
