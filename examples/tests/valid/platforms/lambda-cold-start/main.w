bring cloud;
bring http;
bring expect;

let api = new cloud.Api();
let url = api.url;
let counter = new cloud.Counter();

api.get("/", inflight (req) => {
  return {
    status: 200,
    body: "OK"
  };
});

api.get("/url", inflight (req) => {
  return {
    status: 200,
    body: url
  };
});

api.get("/inc", inflight (req) => {
  counter.inc();
  return {
    status: 200,
    body: "{counter.peek()}"
  };
});

test "api test" {
  expect.equal(http.get("{url}/inc").body, "1");
  expect.equal(http.get("{url}/inc").body, "2");
  expect.equal(http.get("{url}/url").body, url);
  expect.equal(http.get("{url}/not-here").status, 404);
}
