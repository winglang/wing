bring cloud;
bring http;
bring util;
bring expect;


let api = new cloud.Api();

let bucket = new cloud.Bucket(public: true, cors: false);

bucket.addCorsRule(
  allowedMethods: [http.HttpMethod.GET],
  allowedOrigins: [api.url]
);

bucket.addObject("hello", "hello");


api.get("/test-bucket-cors", inflight (req) => {
  let response = http.fetch(
    bucket.signedUrl("hello"),
    method: http.HttpMethod.OPTIONS,
    headers: {
      Origin: api.url,
      "Access-Control-Request-Method": "GET",
    },
  );
  return {
    body: response.body
  };
});

if util.tryEnv("WING_TARGET") == "tf-aws" {
  test "bucket CORS configuration works" {
    let requestFromTest = http.fetch(
      bucket.signedUrl("hello"),
      method: http.HttpMethod.OPTIONS,
      headers: {
        Origin:  "not-api-url.com",
        "Access-Control-Request-Method": "GET",
      },
    );
    expect.match(requestFromTest.body, "AccessForbidden");

    let requestFromApi = http.get(api.url + "/test-bucket-cors").body;
    expect.equal(requestFromApi, "");
  }
}

 