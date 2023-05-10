exports.getGreeting = function(name) {
  return `Hello, ${name}!`;
};

exports.regexInflight = async function(pattern, text) {
  const regex = new RegExp(pattern);
  return regex.test(text);
};

exports.getUuid = async function() {
  let uuid = require("uuid");
  return uuid.v4();
};

exports.getData = async function() {
  return require("./exported_data.js");
};

exports.print = function(msg) {
  console.log(`printing ${msg}`);
};
