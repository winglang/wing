const assert = require("node:assert");

/** @type {import("./external_js.extern").default} */
module.exports = {
  getGreeting(name) {
    return `Hello, ${name}!`;
  },
  preflightBucket(bucket, id) {
    assert.strictEqual(bucket.node.id, id);
  },
  async regexInflight(pattern, text) {
    const regex = new RegExp(pattern);
    return regex.test(text);
  },
  async getUuid() {
    let uuid = require("uuid");
    return uuid.v4();
  },
  async getData() {
    return require("./exported_data.js");
  },
  async print(msg) {
    console.log(`printing ${msg}`);
  },
};
