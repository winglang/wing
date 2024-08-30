const { configs } = require("./index.cjs");

module.exports = {
  root: true,
  ...configs["node-cjs"],
};
