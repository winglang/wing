bring cloud;
bring http;
bring util;
bring expect;


let api = new cloud.Api();

let bucket = new cloud.Bucket(public: true);

bucket.addCorsConfiguration(
  allowedMethods: [http.HttpMethod.GET],
  allowedOrigins:[api.url]
);

bucket.addObject("hello", "hello");


api.get("/test-bucket-cors", inflight (req) => {
  let request = util.shell("curl -v --request OPTIONS '{bucket.signedUrl("hello")}' -H 'Origin: {api.url}' -H 'Access-Control-Request-Method: GET'");
  return {
    body: request
  };
});


if util.tryEnv("WING_TARGET") == "tf-aws" {
  test "bucket CORS configuration works" {
    let requestFromTest = util.shell("curl -v --request OPTIONS '{bucket.signedUrl("hello")}' -H 'Origin: not-my.origin.com ' -H 'Access-Control-Request-Method: GET'");
    expect.match(requestFromTest, "AccessForbidden");

    let requestFromApi = http.get(api.url + "/test-bucket-cors").body;
    expect.equal(requestFromApi, "");

  }
}

 