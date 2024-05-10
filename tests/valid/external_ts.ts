import assert from "assert";
import extern from "./external_ts.extern";

export const getGreeting: extern["getGreeting"] = function (name) {
  return `Hello, ${name}!`;
};

export const regexInflight: extern["regexInflight"] = async function (
  pattern,
  text
) {
  const regex = new RegExp(pattern);
  return regex.test(text);
};

export const getUuid: extern["getUuid"] = async function () {
  let uuid = require("uuid");
  return uuid.v4();
};

export const getData: extern["getData"] = async function () {
  return require("./exported_data.js");
};

export const print: extern["print"] = async function (msg) {
  console.log(`printing ${msg}`);
};

export const preflightBucket: extern["preflightBucket"] = (bucket, id) => {
  assert.strictEqual(bucket.node.id, id);
};
