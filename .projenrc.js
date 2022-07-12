const { cdk } = require("projen");
const project = new cdk.JsiiProject({
  name: "@monadahq/wingsdk",
  author: "Monada, Inc.",
  authorOrganization: true,
  authorAddress: "ping@monada.co",
  repository: "https://github.com/monadahq/wingsdk.git",
  defaultReleaseBranch: "main",
  peerDeps: ["constructs@^10"],
  prettier: true,
  jestOptions: {
    jestVersion: "^27.0.0", // 28 requires a later typescript version
  },
  npmRegistryUrl: "https://npm.pkg.github.com",
});

project.synth();
