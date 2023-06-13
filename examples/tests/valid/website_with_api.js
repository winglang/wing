import internalFetch from "node-fetch";

export async function fetch(url, method, headers, body) {
  const response = await internalFetch(url, {
    method,
    body,
    headers,
  });

  const responseStatus = response.status,
  responseHeaders = [...response.headers.entries()].reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  if (method === "OPTIONS") {
    return {
    status: responseStatus,
    headers: responseHeaders,
    body: null
  }} else {
    return {
      status: responseStatus,
      headers: responseHeaders,
      body: response.json(),
    }
  }
}