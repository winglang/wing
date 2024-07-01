const { validate, version } = require('uuid');

exports.validateUUIDv4 = function (data) {
  return validate(data) && version(data) === 4;
}