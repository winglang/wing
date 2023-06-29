const designSystem = require("@wingconsole/design-system/tailwind-plugin.cjs");

module.exports.plugins = [...designSystem.plugins];
module.exports.content = [
  ...designSystem.content,
  `${__dirname}/src/**/*.{ts,tsx,js,jsx}`,
  `${__dirname}/dist/index.js`,
];
module.exports.theme = designSystem.theme;
