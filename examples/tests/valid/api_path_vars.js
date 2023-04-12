exports.get = async function (url) {
  const {default: fetch} = await import("node-fetch");
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
