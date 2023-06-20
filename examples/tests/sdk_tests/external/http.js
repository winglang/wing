exports.http = async function (url, options = {}) {
  const res = await fetch(url.toString(), options);
  return {
    status: res.status,
    headers: [...res.headers.entries()].map(([key, value]) => ({
      key,
      value,
    })),
    body: await res.text(),
  };
};
