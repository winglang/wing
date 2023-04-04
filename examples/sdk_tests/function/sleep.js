exports.sleep = async function (timeMs) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, timeMs);
  });
};
