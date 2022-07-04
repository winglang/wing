const { cdk } = require('projen');

new cdk.JsiiProject({
  name: 'wing-sdk',
  author: 'Monada, Inc.',
  authorOrganization: true,
  authorAddress: 'ping@monada.co',
  repository: 'https://github.com/monadahq/winglang.git',
  defaultReleaseBranch: 'main',
  // bundledDeps: ['esbuild'],
  minNodeVersion: '18.4.0',
  peerDeps: ['constructs@^10'],
  jestOptions: {
    jestVersion: '^27.0.0', // 28 requires a later typescript version
  },
});
