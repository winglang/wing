const fetch = require("node-fetch");

exports.get = async function (url) {
  const res = await fetch(url.toString());
  return {
    status: res.status,
    headers: [...res.headers.entries()].map(([key, value]) => ({
      key,
      value,
    })),
    body: await res.json(),
  };
};
