exports.get_greeting = function(name) {
  return `Hello, ${name}!`;
};

exports.regex_inflight = async function(pattern, text) {
  const regex = new RegExp(pattern);
  return regex.test(text);
};

exports.get_uuid = async function() {
  let uuid = require("uuid");
  return uuid.v4();
};

exports.get_data = async function() {
  return require("./exported_data.js");
};

exports.print = function(msg) {
  console.log(`printing ${msg}`);
};
