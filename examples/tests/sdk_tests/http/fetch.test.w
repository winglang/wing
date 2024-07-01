bring http;
bring expect;
bring cloud;
bring util;

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

api.get("/delayed", inflight () => {
  util.sleep(2s);
  return {
    status: 200,
    body: "I am the target"
  };
});

test "fetch" {
  // "redirect is 'follow' by default"
  let redirectDefault = http.get("{api.url}/redirect");
  log(redirectDefault.body);
  expect.equal(redirectDefault.status, 200);
  expect.equal(redirectDefault.body, "I am the target");

 // "redirect 'manual'" 
  let redirectManual = http.get("{api.url}/redirect", redirect: http.RequestRedirect.MANUAL);
  expect.equal(redirectManual.headers.get("location"), "{api.url}/target");
  expect.equal(redirectManual.status, 301);

  // timeout property - 
  // timeout shorter than the request
  let var error = "";
  try {
    let timeout = http.get("{api.url}/delayed", timeout: 1s);
  } catch e {
    error = e;
  }
  expect.equal(error, "This operation was aborted");

    // timeout longer than the request
  try {
    let timeout = http.get("{api.url}/delayed", timeout: 3s);
  } catch e {
    assert(false);
  }

  
}