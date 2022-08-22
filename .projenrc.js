const { cdk, github, javascript } = require("projen");

const project = new cdk.JsiiProject({
  name: "@monadahq/wingsdk",
  author: "Monada, Inc.",
  authorOrganization: true,
  authorAddress: "ping@monada.co",
  repository: "https://github.com/monadahq/wingsdk.git",
  defaultReleaseBranch: "main",
  peerDeps: ["constructs@^10.0.25", "@monadahq/polycons@^0.0.11"],
  deps: ["cdktf", "@cdktf/provider-aws"],
  bundledDeps: ["esbuild@0.14.31"],
  devDeps: [],
  prettier: true,
  jestOptions: {
    jestVersion: "^27.0.0", // 28 requires a later typescript version
  },
  npmRegistryUrl: "https://npm.pkg.github.com",
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["monada-bot[bot]"],
    secret: "PROJEN_GITHUB_TOKEN",
  },
  packageManager: javascript.NodePackageManager.NPM,
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

// use types from wing-local to ensure that the local CDK
// generates the correct types for the simulator
project.addDevDeps("@monadahq/wing-local");

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

project.synth();
