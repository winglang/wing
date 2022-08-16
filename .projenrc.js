const { cdk, javascript, github } = require("projen");

const project = new cdk.JsiiProject({
  name: "@monadahq/wingsdk",
  author: "Monada, Inc.",
  authorOrganization: true,
  authorAddress: "ping@monada.co",
  repository: "https://github.com/monadahq/wingsdk.git",
  defaultReleaseBranch: "main",
  peerDeps: ["constructs@^10.0.25"],
  deps: ["cdktf", "@cdktf/provider-aws"],
  bundledDeps: ["esbuild@0.14.31"],
  devDeps: ["aws-sdk"],
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
});

project.synth();
