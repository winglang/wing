bring http;
bring expect;
bring cloud;

let api = new cloud.Api();
let bucket = new cloud.Bucket();

bucket.addObject("url.txt", api.url);

api.get("/redirect", inflight () => {
  let url = bucket.get("url.txt");
  return {
    status: 301,
    headers: {
      Location: "{url}/target"
    }
  };
});

api.get("/target", inflight () => {
  return {
    status: 200,
    body: "I am the target"
  };
});

test "redirect is 'follow' by default" {
  let res = http.get("{api.url}/redirect");
  log(res.body);
  expect.equal(res.status, 200);
  expect.equal(res.body, "I am the target");
}

test "redirect 'manual'" {
  let res = http.get("{api.url}/redirect", redirect: http.RequestRedirect.MANUAL);
  expect.equal(res.headers.get("location"), "{api.url}/target");
  expect.equal(res.status, 301);
}